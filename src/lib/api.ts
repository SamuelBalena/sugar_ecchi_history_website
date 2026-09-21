import type { Catalog, Character, Pack, Tag } from "./types";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1").replace(/\/$/, "");
const VISITOR_KEY = "sugarecchi.visitor-id.v1";
const TOKEN_KEY = "sugarecchi.admin-token.v1";

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) { super(message); }
}

function visitorId() {
  const saved = window.localStorage.getItem(VISITOR_KEY);
  if (saved) return saved;
  const id = crypto.randomUUID();
  window.localStorage.setItem(VISITOR_KEY, id);
  return id;
}
export function getToken() { return typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY); }
export function clearToken() { window.localStorage.removeItem(TOKEN_KEY); }

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers: { "content-type": "application/json", ...init.headers } });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new ApiError(body?.error ?? "Não foi possível concluir a solicitação.", response.status);
  }
  return response.status === 204 ? (undefined as T) : (response.json() as Promise<T>);
}
function adminHeaders() {
  const token = getToken();
  if (!token) throw new ApiError("Sua sessão administrativa expirou.", 401);
  return { authorization: `Bearer ${token}` };
}

export const api = {
  catalog: () => request<Catalog>("/catalog"),
  wishlist: () => request<string[]>("/wishlist", { headers: { "x-visitor-id": visitorId() } }),
  toggleWishlist: (packId: string) => request<string[]>("/wishlist", { method: "POST", headers: { "x-visitor-id": visitorId() }, body: JSON.stringify({ packId }) }),
  async login(password: string) {
    const result = await request<{ token: string }>("/auth/login", { method: "POST", body: JSON.stringify({ password }) });
    window.localStorage.setItem(TOKEN_KEY, result.token);
  },
  adminPacks: () => request<Pack[]>("/admin/packs", { headers: adminHeaders() }),
  createPack: ({ id: _id, ...pack }: Pack) => request<Pack>("/admin/packs", { method: "POST", headers: adminHeaders(), body: JSON.stringify(pack) }),
  updatePack: (pack: Pack) => request<Pack>(`/admin/packs/${pack.id}`, { method: "PATCH", headers: adminHeaders(), body: JSON.stringify(pack) }),
  deletePack: (id: string) => request<void>(`/admin/packs/${id}`, { method: "DELETE", headers: adminHeaders() }),
  createCharacter: ({ id: _id, ...character }: Character) => request<Character>("/admin/characters", { method: "POST", headers: adminHeaders(), body: JSON.stringify(character) }),
  createTag: ({ id: _id, ...tag }: Tag) => request<Tag>("/admin/tags", { method: "POST", headers: adminHeaders(), body: JSON.stringify(tag) }),
};
