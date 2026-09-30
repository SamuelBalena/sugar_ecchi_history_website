import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedCatalog } from "@/data/seed";
import { api, clearToken, getToken } from "./api";
import type { Anime, Catalog, Character, Collection, Pack, Tag } from "./types";

export function slugify(input: string): string { return input.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-"); }
export function newId(prefix: string): string { return `${prefix}-${crypto.randomUUID().slice(0, 8)}`; }

interface CatalogContextValue extends Catalog {
  publishedPacks: Pack[]; wishlist: string[]; isAdmin: boolean;
  toggleWishlist: (packId: string) => Promise<void>; isWished: (packId: string) => boolean;
  login: (credentials: { email?: string; password: string } | string, password?: string) => Promise<void>; logout: () => void;
  savePack: (pack: Pack) => Promise<void>; deletePack: (id: string) => Promise<void>;
  duplicatePack: (id: string) => Promise<Pack | undefined>; addCharacter: (character: Character) => Promise<Character>; addTag: (tag: Tag) => Promise<Tag>; addCollection: (collection: Collection) => Promise<Collection>;
  animeById: (id: string) => Anime | undefined; characterById: (id: string) => Character | undefined; collectionById: (id: string) => Collection | undefined; tagById: (id: string) => Tag | undefined; packBySlug: (slug: string) => Pack | undefined;
}
const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog>(seedCatalog);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const refreshCatalog = useCallback(async () => { const next = await api.catalog(); if (getToken()) next.packs = await api.adminPacks(); setCatalog(next); }, []);
  useEffect(() => { setIsAdmin(Boolean(getToken())); void refreshCatalog().catch(() => undefined); void api.wishlist().then(setWishlist).catch(() => undefined); }, [refreshCatalog]);
  const toggleWishlist = useCallback(async (packId: string) => { setWishlist(await api.toggleWishlist(packId)); }, []);
  const login = useCallback(async (credentials: { email?: string; password: string } | string, password?: string) => { await api.login(credentials, password); setIsAdmin(true); await refreshCatalog(); }, [refreshCatalog]);
  const logout = useCallback(() => { clearToken(); setIsAdmin(false); void refreshCatalog().catch(() => undefined); }, [refreshCatalog]);
  const savePack = useCallback(async (pack: Pack) => {
    const exists = catalog.packs.some((item) => item.id === pack.id); const saved = exists ? await api.updatePack(pack) : await api.createPack(pack);
    setCatalog((current) => ({ ...current, packs: exists ? current.packs.map((item) => item.id === saved.id ? saved : item) : [saved, ...current.packs] }));
  }, [catalog.packs]);
  const deletePack = useCallback(async (id: string) => { await api.deletePack(id); setCatalog((current) => ({ ...current, packs: current.packs.filter((item) => item.id !== id) })); }, []);
  const duplicatePack = useCallback(async (id: string) => {
    const source = catalog.packs.find((item) => item.id === id); if (!source) return undefined;
    const saved = await api.createPack({ ...source, id: newId("pk"), slug: `${source.slug}-copy`, title: { ...source.title, en: `${source.title.en} (Copy)` }, isPublished: false, salesCount: 0, createdAt: new Date().toISOString().slice(0, 10) });
    setCatalog((current) => ({ ...current, packs: [saved, ...current.packs] })); return saved;
  }, [catalog.packs]);
  const addCharacter = useCallback(async (character: Character) => { const saved = await api.createCharacter(character); setCatalog((current) => ({ ...current, characters: [...current.characters, saved] })); return saved; }, []);
  const addTag = useCallback(async (tag: Tag) => { const saved = await api.createTag(tag); setCatalog((current) => ({ ...current, tags: [...current.tags, saved] })); return saved; }, []);
  const addCollection = useCallback(async (collection: Collection) => { const saved = await api.createCollection(collection); setCatalog((current) => ({ ...current, collections: [...current.collections, saved] })); return saved; }, []);
  const value = useMemo<CatalogContextValue>(() => {
    const byId = <T extends { id: string }>(items: T[], id: string) => items.find((item) => item.id === id);
    return { ...catalog, publishedPacks: catalog.packs.filter((pack) => pack.isPublished), wishlist, isAdmin, toggleWishlist, isWished: (id) => wishlist.includes(id), login, logout, savePack, deletePack, duplicatePack, addCharacter, addTag, addCollection, animeById: (id) => byId(catalog.animes, id), characterById: (id) => byId(catalog.characters, id), collectionById: (id) => byId(catalog.collections, id), tagById: (id) => byId(catalog.tags, id), packBySlug: (slug) => catalog.packs.find((pack) => pack.slug === slug) };
  }, [catalog, wishlist, isAdmin, toggleWishlist, login, logout, savePack, deletePack, duplicatePack, addCharacter, addTag, addCollection]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}
export function useCatalog(): CatalogContextValue { const context = useContext(CatalogContext); if (!context) throw new Error("useCatalog must be used inside CatalogProvider"); return context; }
