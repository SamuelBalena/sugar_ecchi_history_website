import { useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { searchPacks } from "@/lib/selectors";
import { cn } from "@/lib/utils";
import type { Pack } from "@/lib/types";

export type SortKey = "newest" | "bestselling" | "priceAsc" | "priceDesc";

interface ShopSearch {
  q?: string | undefined;
  anime?: string | undefined;
  character?: string | undefined;
  collection?: string | undefined;
  tag?: string | undefined;
  sale?: boolean | undefined;
  sort?: SortKey | undefined;
  page?: number | undefined;
}

const PAGE_SIZE = 8;

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search["q"] === "string" && search["q"] ? search["q"] : undefined,
    anime: typeof search["anime"] === "string" ? search["anime"] : undefined,
    character: typeof search["character"] === "string" ? search["character"] : undefined,
    collection: typeof search["collection"] === "string" ? search["collection"] : undefined,
    tag: typeof search["tag"] === "string" ? search["tag"] : undefined,
    sale: search["sale"] === true || search["sale"] === "true" ? true : undefined,
    sort: ["newest", "bestselling", "priceAsc", "priceDesc"].includes(String(search["sort"]))
      ? (search["sort"] as SortKey)
      : undefined,
    page: Number(search["page"]) > 1 ? Number(search["page"]) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop all anime art packs — SugarEcchi" },
      {
        name: "description",
        content:
          "Every SugarEcchi pack in one grid. Filter by anime, character, collection and tag, sort by new or bestselling.",
      },
      { property: "og:title", content: "Shop all anime art packs — SugarEcchi" },
      {
        property: "og:description",
        content: "Filter adult anime art packs by anime, character, collection and tag.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function sortPacks(packs: Pack[], sort: SortKey): Pack[] {
  const list = [...packs];
  switch (sort) {
    case "bestselling":
      return list.sort((a, b) => b.salesCount - a.salesCount);
    case "priceAsc":
      return list.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return list.sort((a, b) => b.price - a.price);
    default:
      return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const { t, tx } = useLang();
  const { publishedPacks, characters, animes, collections, tags } = useCatalog();

  const setSearch = (next: Partial<ShopSearch>) => {
    void navigate({ search: (prev) => ({ ...prev, ...next, page: undefined }) });
  };

  const filtered = useMemo(() => {
    let list = publishedPacks;
    if (search["anime"]) {
      const anime = animes.find((a) => a.slug === search["anime"]);
      const ids = new Set(characters.filter((c) => c.animeId === anime?.id).map((c) => c.id));
      list = list.filter((p) => p.characterIds.some((cid) => ids.has(cid)));
    }
    if (search["character"]) {
      const character = characters.find((c) => c.slug === search["character"]);
      list = list.filter((p) => (character ? p.characterIds.includes(character.id) : false));
    }
    if (search["collection"]) {
      const collection = collections.find((c) => c.slug === search["collection"]);
      list = list.filter((p) => (collection ? p.collectionIds.includes(collection.id) : false));
    }
    if (search["tag"]) {
      const tag = tags.find((c) => c.slug === search["tag"]);
      list = list.filter((p) => (tag ? p.tagIds.includes(tag.id) : false));
    }
    if (search["sale"]) list = list.filter((p) => Boolean(p.compareAtPrice));
    if (search["q"]) list = searchPacks(list, search["q"], characters);
    return search["q"] ? list : sortPacks(list, search.sort ?? "newest");
  }, [publishedPacks, characters, animes, collections, tags, search]);

  const page = search.page ?? 1;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = Boolean(
    search["q"] || search["anime"] || search["character"] || search["collection"] || search["tag"] || search["sale"],
  );

  const chip = (active: boolean) =>
    cn(
      "border px-3 py-1.5 text-xs transition-colors",
      active
        ? "border-accent bg-accent/10 text-accent"
        : "border-border/70 text-muted-foreground hover:border-accent/60 hover:text-foreground",
    );

  return (
    <SiteLayout faq="compact">
      <PageHeader
        eyebrow="Catalog"
        title={search["q"] ? `“${search["q"]}”` : t("shop.title")}
        subtitle={`${filtered.length} ${t("shop.results")}`}
      />

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-14 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow">{t("shop.filters")}</p>
            {hasFilters ? (
              <button
                type="button"
                onClick={() => void navigate({ search: {} })}
                className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-accent"
              >
                {t("shop.clear")}
              </button>
            ) : null}
          </div>

          <FilterGroup title={t("nav.anime")}>
            {animes.map((anime) => (
              <button
                key={anime.id}
                type="button"
                className={chip(search["anime"] === anime.slug)}
                onClick={() =>
                  setSearch({ anime: search["anime"] === anime.slug ? undefined : anime.slug })
                }
              >
                {tx(anime.name)}
              </button>
            ))}
          </FilterGroup>

          <FilterGroup title={t("nav.characters")}>
            {characters.map((character) => (
              <button
                key={character.id}
                type="button"
                className={chip(search["character"] === character.slug)}
                onClick={() =>
                  setSearch({
                    character: search["character"] === character.slug ? undefined : character.slug,
                  })
                }
              >
                {tx(character.name)}
              </button>
            ))}
          </FilterGroup>

          <FilterGroup title={t("nav.collections")}>
            {collections.map((collection) => (
              <button
                key={collection.id}
                type="button"
                className={chip(search["collection"] === collection.slug)}
                onClick={() =>
                  setSearch({
                    collection: search["collection"] === collection.slug ? undefined : collection.slug,
                  })
                }
              >
                {tx(collection.title)}
              </button>
            ))}
          </FilterGroup>

          <FilterGroup title={t("nav.tags")}>
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className={chip(search["tag"] === tag.slug)}
                onClick={() => setSearch({ tag: search["tag"] === tag.slug ? undefined : tag.slug })}
              >
                {tx(tag.label)}
              </button>
            ))}
          </FilterGroup>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-border/50 pb-4">
            <span className="mr-1 text-[11px] uppercase tracking-widest text-muted-foreground">
              {t("shop.sort")}
            </span>
            {(["newest", "bestselling", "priceAsc", "priceDesc"] as SortKey[]).map((key) => (
              <button
                key={key}
                type="button"
                className={chip((search.sort ?? "newest") === key)}
                onClick={() => setSearch({ sort: key })}
              >
                {t(`sort.${key}` as const)}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">{t("shop.empty")}</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((pack) => (
                <ProductCard key={pack.id} pack={pack} />
              ))}
            </div>
          )}

          {pageCount > 1 ? (
            <div className="mt-10 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => void navigate({ search: (prev) => ({ ...prev, page: page - 1 }) })}
              >
                {t("common.prev")}
              </Button>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  to="/shop"
                  search={(prev) => ({ ...prev, page: n > 1 ? n : undefined })}
                  className={chip(n === page)}
                >
                  {n}
                </Link>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pageCount}
                onClick={() => void navigate({ search: (prev) => ({ ...prev, page: page + 1 }) })}
              >
                {t("common.next")}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </SiteLayout>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
