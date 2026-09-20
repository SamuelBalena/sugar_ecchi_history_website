import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { packsForCharacter } from "@/lib/selectors";

export const Route = createFileRoute("/characters/$slug")({
  head: ({ params }) => {
    const title = `${params.slug.replace(/-/g, " ")} art packs — SugarEcchi`;
    return {
      meta: [
        { title },
        { name: "description", content: "Every SugarEcchi art pack featuring this character." },
        { property: "og:title", content: title },
        { property: "og:description", content: "Art packs featuring this anime character." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CharacterDetail,
});

function CharacterDetail() {
  const { slug } = Route.useParams();
  const { t, tx } = useLang();
  const { characters, animeById, publishedPacks } = useCatalog();
  const character = characters.find((c) => c.slug === slug);
  if (!character) throw notFound();

  const anime = animeById(character.animeId);
  const packs = packsForCharacter(publishedPacks, character.id);

  return (
    <SiteLayout faq="compact">
      <PageHeader
        eyebrow={anime ? tx(anime.name) : t("pdp.characters")}
        title={tx(character.name)}
        subtitle={tx(character.description)}
      />
      <div className="mx-auto w-full max-w-7xl px-4 pb-16">
        {anime ? (
          <Link
            to="/anime/$slug"
            params={{ slug: anime.slug }}
            className="mb-8 inline-block border border-border/70 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent hover:text-accent"
          >
            {tx(anime.name)}
          </Link>
        ) : null}
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
