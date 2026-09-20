import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { packsForCharacter } from "@/lib/selectors";

export const Route = createFileRoute("/characters/")({
  head: () => ({
    meta: [
      { title: "Browse characters — SugarEcchi" },
      {
        name: "description",
        content: "All characters featured in SugarEcchi art packs, grouped by anime series.",
      },
      { property: "og:title", content: "Browse characters — SugarEcchi" },
      { property: "og:description", content: "Find art packs by character." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CharactersIndex,
});

function CharactersIndex() {
  const { t, tx } = useLang();
  const { characters, animeById, publishedPacks } = useCatalog();

  return (
    <SiteLayout faq="compact">
      <PageHeader eyebrow="Catalog" title={t("page.characters")} />
      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {characters.map((character) => {
          const packs = packsForCharacter(publishedPacks, character.id);
          const anime = animeById(character.animeId);
          return (
            <Link
              key={character.id}
              to="/characters/$slug"
              params={{ slug: character.slug }}
              className="group border border-border/60 bg-card transition-colors hover:border-accent/60"
            >
              {packs[0] ? (
                <img
                  src={packs[0].galleryUrls[0]}
                  alt={tx(character.name)}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover"
                />
              ) : null}
              <div className="p-4">
                {anime ? <p className="eyebrow">{tx(anime.name)}</p> : null}
                <h2 className="mt-1 font-display text-xl group-hover:text-accent">
                  {tx(character.name)}
                </h2>
                <p className="mt-2 text-[11px] uppercase tracking-widest text-accent">
                  {packs.length} {t("common.packs")}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </SiteLayout>
  );
}
