import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { packsForAnime } from "@/lib/selectors";

export const Route = createFileRoute("/anime/")({
  head: () => ({
    meta: [
      { title: "Browse anime series — SugarEcchi" },
      {
        name: "description",
        content: "All anime series in the SugarEcchi catalog. Pick a series to see its art packs.",
      },
      { property: "og:title", content: "Browse anime series — SugarEcchi" },
      { property: "og:description", content: "Pick an anime series to see its adult art packs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnimeIndex,
});

function AnimeIndex() {
  const { t, tx } = useLang();
  const { animes, characters, publishedPacks } = useCatalog();

  return (
    <SiteLayout faq="compact">
      <PageHeader eyebrow="Catalog" title={t("page.animes")} />
      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {animes.map((anime) => {
          const packs = packsForAnime(publishedPacks, characters, anime.id);
          return (
            <Link
              key={anime.id}
              to="/anime/$slug"
              params={{ slug: anime.slug }}
              className="group border border-border/60 bg-card p-6 transition-colors hover:border-accent/60"
            >
              {packs[0] ? (
                <img
                  src={packs[0].galleryUrls[0]}
                  alt={tx(anime.name)}
                  loading="lazy"
                  className="mb-4 aspect-16/9 w-full object-cover"
                />
              ) : null}
              <h2 className="font-display text-2xl group-hover:text-accent">{tx(anime.name)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{tx(anime.description)}</p>
              <p className="mt-4 text-[11px] uppercase tracking-widest text-accent">
                {packs.length} {t("common.packs")}
              </p>
            </Link>
          );
        })}
      </div>
    </SiteLayout>
  );
}
