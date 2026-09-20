import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { packsForAnime } from "@/lib/selectors";

export const Route = createFileRoute("/anime/$slug")({
  head: ({ params }) => {
    const title = `${params.slug.replace(/-/g, " ")} art packs — SugarEcchi`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: "Every SugarEcchi art pack from this anime series, with its characters.",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: "Art packs and characters from this anime series." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AnimeDetail,
});

function AnimeDetail() {
  const { slug } = Route.useParams();
  const { t, tx } = useLang();
  const { animes, characters, publishedPacks } = useCatalog();
  const anime = animes.find((a) => a.slug === slug);
  if (!anime) throw notFound();

  const cast = characters.filter((c) => c.animeId === anime.id);
  const packs = packsForAnime(publishedPacks, characters, anime.id);

  return (
    <SiteLayout faq="compact">
      <PageHeader eyebrow={t("pdp.anime")} title={tx(anime.name)} subtitle={tx(anime.description)} />
      <div className="mx-auto w-full max-w-7xl px-4 pb-16">
        <div className="mb-8 flex flex-wrap gap-2">
          {cast.map((character) => (
            <Link
              key={character.id}
              to="/characters/$slug"
              params={{ slug: character.slug }}
              className="border border-border/70 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent hover:text-accent"
            >
              {tx(character.name)}
            </Link>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packs.map((pack) => (
            <ProductCard key={pack.id} pack={pack} />
          ))}
        </div>
        {packs.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">{t("shop.empty")}</p>
        ) : null}
      </div>
    </SiteLayout>
  );
}
