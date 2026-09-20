import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductRail } from "@/components/site/ProductRail";
import { Heart } from "lucide-react";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const title = `${params.slug.replace(/-/g, " ")} — SugarEcchi pack`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            "Adult anime character art pack by SugarEcchi. High resolution files, bilingual details, payment completed on Patreon.",
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: "High resolution anime art pack. 18+ only. Buy on Patreon.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold">Pack not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-sm text-accent">
          Back to shop
        </Link>
      </div>
    </SiteLayout>
  ),
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { t, tx } = useLang();
  const {
    packBySlug,
    publishedPacks,
    characterById,
    animeById,
    tagById,
    toggleWishlist,
    isWished,
  } = useCatalog();
  const pack = packBySlug(slug);
  const [active, setActive] = useState(0);

  if (!pack || !pack.isPublished) throw notFound();

  const characters = pack.characterIds.map((id) => characterById(id)).filter(Boolean);
  const firstCharacter = characters[0];
  const anime = firstCharacter ? animeById(firstCharacter.animeId) : undefined;
  const related = publishedPacks
    .filter((p) => p.id !== pack.id && p.characterIds.some((c) => pack.characterIds.includes(c)))
    .concat(
      publishedPacks.filter(
        (p) => p.id !== pack.id && p.collectionIds.some((c) => pack.collectionIds.includes(c)),
      ),
    )
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, 8);

  return (
    <SiteLayout faq="compact">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-20 pt-10 lg:grid-cols-2">
        <div>
          <img
            src={pack.galleryUrls[active]}
            alt={tx(pack.title)}
            width={1000}
            height={1250}
            className="aspect-4/5 w-full border border-border/60 object-cover"
          />
          {pack.galleryUrls.length > 1 ? (
            <div className="mt-3 flex gap-3">
              {pack.galleryUrls.map((url, index) => (
                <button
                  key={url + index}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "size-20 border",
                    index === active ? "border-accent" : "border-border/60 opacity-70",
                  )}
                >
                  <img src={url} alt="" loading="lazy" className="size-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          {anime ? (
            <Link
              to="/anime/$slug"
              params={{ slug: anime.slug }}
              className="eyebrow hover:text-accent"
            >
              {tx(anime.name)}
            </Link>
          ) : null}
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">{tx(pack.title)}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl text-accent">${pack.price}</span>
            {pack.compareAtPrice ? (
              <span className="text-sm text-muted-foreground line-through">
                ${pack.compareAtPrice}
              </span>
            ) : null}
          </div>
          <div className="gold-rule my-6 w-full max-w-40" />
          <p className="text-sm leading-relaxed text-muted-foreground">{tx(pack.description)}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={pack.patreonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("card.buy")}
            </a>
            <button
              type="button"
              onClick={() => toggleWishlist(pack.id)}
              aria-label={t("nav.wishlist")}
              className="inline-flex items-center justify-center border border-border px-4 py-3 transition-colors hover:border-accent"
            >
              <Heart
                className={cn(
                  "size-4",
                  isWished(pack.id) ? "fill-primary text-primary" : "text-muted-foreground",
                )}
              />
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t("pdp.checkoutNote")}</p>

          <section className="mt-10 border-t border-border/60 pt-6">
            <h2 className="eyebrow">{t("pdp.contents")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{tx(pack.contents)}</p>
          </section>

          <section className="mt-8 border-t border-border/60 pt-6">
            <h2 className="eyebrow">{t("pdp.specs")}</h2>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">{t("pdp.files")}</dt>
                <dd>{pack.fileCount}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t("pdp.format")}</dt>
                <dd>{pack.format}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-8 border-t border-border/60 pt-6">
            <h2 className="eyebrow">{t("pdp.characters")}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {characters.map((character) =>
                character ? (
                  <Link
                    key={character.id}
                    to="/characters/$slug"
                    params={{ slug: character.slug }}
                    className="border border-border/70 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent hover:text-accent"
                  >
                    {tx(character.name)}
                  </Link>
                ) : null,
              )}
              {pack.tagIds.map((id) => {
                const tag = tagById(id);
                return tag ? (
                  <Link
                    key={tag.id}
                    to="/tags/$slug"
                    params={{ slug: tag.slug }}
                    className="border border-border/70 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent hover:text-accent"
                  >
                    {tx(tag.label)}
                  </Link>
                ) : null;
              })}
            </div>
          </section>
        </div>
      </div>

      <ProductRail title={t("pdp.related")} packs={related} viewAllTo="/shop" viewAllLabel={t("home.bannerCta")} />

      <div className="sticky bottom-0 z-40 flex items-center gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <span className="text-sm text-accent">${pack.price}</span>
        <a
          href={pack.patreonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex flex-1 items-center justify-center bg-primary px-4 py-2.5 text-xs uppercase tracking-widest text-primary-foreground"
        >
          {t("card.buy")}
        </a>
      </div>
    </SiteLayout>
  );
}
