import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { seedCatalog } from "@/data/seed";
import type { Anime, Catalog, Character, Collection, Pack, Tag } from "./types";

const CATALOG_KEY = "sugarecchi.catalog.v1";
const WISHLIST_KEY = "sugarecchi.wishlist.v1";
const ADMIN_KEY = "sugarecchi.admin.v1";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

interface CatalogContextValue extends Catalog {
  publishedPacks: Pack[];
  wishlist: string[];
  toggleWishlist: (packId: string) => void;
  isWished: (packId: string) => boolean;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  savePack: (pack: Pack) => void;
  deletePack: (id: string) => void;
  duplicatePack: (id: string) => Pack | undefined;
  addCharacter: (character: Character) => void;
  addTag: (tag: Tag) => void;
  animeById: (id: string) => Anime | undefined;
  characterById: (id: string) => Character | undefined;
  collectionById: (id: string) => Collection | undefined;
  tagById: (id: string) => Tag | undefined;
  packBySlug: (slug: string) => Pack | undefined;
  resetCatalog: () => void;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog>(seedCatalog);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CATALOG_KEY);
      if (raw) setCatalog(JSON.parse(raw) as Catalog);
      const wl = window.localStorage.getItem(WISHLIST_KEY);
      if (wl) setWishlist(JSON.parse(wl) as string[]);
      setIsAdmin(window.localStorage.getItem(ADMIN_KEY) === "1");
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const persist = useCallback((next: Catalog) => {
    setCatalog(next);
    window.localStorage.setItem(CATALOG_KEY, JSON.stringify(next));
  }, []);

  const toggleWishlist = useCallback((packId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(packId)
        ? prev.filter((id) => id !== packId)
        : [...prev, packId];
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo<CatalogContextValue>(() => {
    const byId = <T extends { id: string }>(list: T[], id: string) =>
      list.find((item) => item.id === id);

    return {
      ...catalog,
      publishedPacks: catalog.packs.filter((p) => p.isPublished),
      wishlist,
      toggleWishlist,
      isWished: (id) => wishlist.includes(id),
      isAdmin,
      login: (password) => {
        const ok = password === "sugar";
        if (ok) {
          setIsAdmin(true);
          window.localStorage.setItem(ADMIN_KEY, "1");
        }
        return ok;
      },
      logout: () => {
        setIsAdmin(false);
        window.localStorage.removeItem(ADMIN_KEY);
      },
      savePack: (packToSave) => {
        const exists = catalog.packs.some((p) => p.id === packToSave.id);
        persist({
          ...catalog,
          packs: exists
            ? catalog.packs.map((p) => (p.id === packToSave.id ? packToSave : p))
            : [packToSave, ...catalog.packs],
        });
      },
      deletePack: (id) => {
        persist({ ...catalog, packs: catalog.packs.filter((p) => p.id !== id) });
      },
      duplicatePack: (id) => {
        const source = catalog.packs.find((p) => p.id === id);
        if (!source) return undefined;
        const copy: Pack = {
          ...source,
          id: newId("pk"),
          slug: `${source.slug}-copy`,
          title: { en: `${source.title.en} (Copy)`, ja: `${source.title.ja}（複製）` },
          isPublished: false,
          salesCount: 0,
          createdAt: new Date().toISOString().slice(0, 10),
        };
        persist({ ...catalog, packs: [copy, ...catalog.packs] });
        return copy;
      },
      addCharacter: (character) => {
        persist({ ...catalog, characters: [...catalog.characters, character] });
      },
      addTag: (tag) => {
        persist({ ...catalog, tags: [...catalog.tags, tag] });
      },
      animeById: (id) => byId(catalog.animes, id),
      characterById: (id) => byId(catalog.characters, id),
      collectionById: (id) => byId(catalog.collections, id),
      tagById: (id) => byId(catalog.tags, id),
      packBySlug: (slug) => catalog.packs.find((p) => p.slug === slug),
      resetCatalog: () => persist(seedCatalog),
    };
  }, [catalog, isAdmin, persist, wishlist, toggleWishlist]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used inside CatalogProvider");
  return ctx;
}
