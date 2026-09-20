import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductRail } from "@/components/site/ProductRail";
import { ProductCard } from "@/components/site/ProductCard";
import { useCatalog } from "@/lib/catalog";
import { packsForAnime } from "@/lib/selectors";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SugarEcchi — Adult Anime Character Art Packs" },
      {
        name: "description",
        content:
          "Browse SugarEcchi adult anime art packs by anime, character, collection and tag. EN / 日本語. 18+ only, payments on Patreon.",
      },
      { property: "og:title", content: "SugarEcchi — Adult Anime Character Art Packs" },
      {
        property: "og:description",
        content: "New character packs, bestsellers and collections. 18+ catalog, checkout on Patreon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, tx } = useLang();
  const { publishedPacks, animes, collections, characters } = useCatalog();

  const bestsellers = publishedPacks.filter((p) => p.isBestseller);
  const newest = [...publishedPacks]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 8);
  const featured = publishedPacks.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <SiteLayout faq="full">
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 bg-surface/30" />
        <div className="relative mx-auto grid min-h-[72vh] w-full max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:py-16">
          <div className="relative z-10 flex flex-col items-start">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <span className="text-[10px] font-bold uppercase text-primary">SugarEcchi · 18+</span>
            </div>
            <h1 className="font-display text-6xl font-extrabold leading-[0.88] sm:text-7xl lg:text-8xl">
              SUGAR<br />
              <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">ECCHI</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">{t("home.bannerTitle")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/shop"
              className="bg-primary px-7 py-3.5 text-xs font-bold uppercase text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/85"
            >
              {t("home.bannerCta")}
            </Link>
            <Link
              to="/collections"
              className="border border-border px-7 py-3.5 text-xs font-bold uppercase text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t("home.collections")}
            </Link>
            </div>
          </div>

          {featured[0] ? (
            <Link to="/product/$slug" params={{ slug: featured[0].slug }} className="group relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="relative ml-5 aspect-4/5 overflow-hidden rounded-2xl border border-border bg-card shadow-luxe sm:ml-12">
                <img src={featured[0].galleryUrls[0]} alt={tx(featured[0].title)} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-accent/10" />
                <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-border/80 bg-background/70 p-5 backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7">
                  <p className="text-[10px] font-bold uppercase text-primary">{t("home.featured")}</p>
                  <div className="mt-1 flex items-end justify-between gap-4">
                    <h2 className="text-lg font-bold sm:text-xl">{tx(featured[0].title)}</h2>
                    <span className="shrink-0 font-bold text-primary">${featured[0].price}</span>
                  </div>
                </div>
              </div>
              <span className="absolute -left-1 bottom-12 flex size-20 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-center text-[10px] font-bold uppercase text-accent backdrop-blur sm:size-24">{t("home.collections")}</span>
              <span className="absolute -right-2 top-8 grid size-20 rotate-6 place-items-center bg-accent text-center text-[10px] font-extrabold uppercase text-accent-foreground sm:size-24">{t("home.new")}</span>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16">
        <div className="mb-7 flex items-end justify-between border-b border-border pb-5">
          <div>
            <p className="eyebrow">01 / Browse</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("home.byAnime")}</h2>
          </div>
          <Link to="/anime" className="hidden text-xs font-bold uppercase text-muted-foreground hover:text-primary sm:block">{t("home.bannerCta")} →</Link>
        </div>
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {animes.map((anime) => {
            const count = packsForAnime(publishedPacks, characters, anime.id).length;
            return (
              <Link
                key={anime.id}
                to="/anime/$slug"
                params={{ slug: anime.slug }}
                className="group relative bg-background p-6 transition-colors hover:bg-secondary"
              >
                <span className="mb-8 block text-[10px] font-bold text-primary">0{animes.indexOf(anime) + 1}</span>
                <p className="font-display text-lg font-bold group-hover:text-primary">{tx(anime.name)}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {count} {t("common.packs")}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <ProductRail
        title={t("home.bestsellers")}
        packs={bestsellers}
        viewAllTo="/shop"
        viewAllLabel={t("home.bannerCta")}
      />
      <ProductRail
        title={t("home.new")}
        packs={newest}
        viewAllTo="/shop"
        viewAllLabel={t("home.bannerCta")}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{t("home.featured")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((pack) => (
            <ProductCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16">
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{t("home.collections")}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to="/collections/$slug"
              params={{ slug: collection.slug }}
              className="group border border-border/60 bg-card/70 p-6 transition-all hover:-translate-y-1 hover:border-accent/60"
            >
              <p className="font-display text-xl group-hover:text-accent">{tx(collection.title)}</p>
              <p className="mt-2 text-xs text-muted-foreground">{tx(collection.description)}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function useCatalogCharacter(_id: string): string {
  return "";
}
