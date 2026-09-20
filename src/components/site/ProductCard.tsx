import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Pack } from "@/lib/types";

export function ProductCard({ pack, className }: { pack: Pack; className?: string }) {
  const { tx, t } = useLang();
  const { characterById, animeById, toggleWishlist, isWished } = useCatalog();
  const firstCharacterId = pack.characterIds[0];
  const character = firstCharacterId ? characterById(firstCharacterId) : undefined;
  const anime = character ? animeById(character.animeId) : undefined;
  const wished = isWished(pack.id);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden border border-border/70 bg-card/80 shadow-luxe transition-all duration-300 hover:-translate-y-1 hover:border-primary/70",
        className,
      )}
    >
      <Link
        to="/product/$slug"
        params={{ slug: pack.slug }}
        className="relative block overflow-hidden"
      >
        <img
          src={pack.galleryUrls[0]}
          alt={tx(pack.title)}
          loading="lazy"
          width={800}
          height={1000}
          className="aspect-4/5 w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:saturate-125"
        />
        <div className="absolute left-0 top-0 flex flex-col gap-1 p-2">
          {pack.isBestseller ? (
            <span className="bg-accent px-2 py-1 text-[10px] font-bold uppercase text-accent-foreground">
              {t("home.bestsellers")}
            </span>
          ) : null}
          {pack.compareAtPrice ? (
            <span className="bg-primary px-2 py-1 text-[10px] font-bold uppercase text-primary-foreground">
              Sale
            </span>
          ) : null}
        </div>
      </Link>

      <button
        type="button"
        aria-label={t("nav.wishlist")}
        onClick={() => toggleWishlist(pack.id)}
        className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/70 backdrop-blur transition-colors hover:border-primary hover:text-primary"
      >
        <Heart className={cn("size-4", wished ? "fill-primary text-primary" : "text-muted-foreground")} />
      </button>

      <div className="flex flex-1 flex-col gap-1 p-4">
        {anime ? (
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {tx(anime.name)}
          </p>
        ) : null}
        <Link
          to="/product/$slug"
          params={{ slug: pack.slug }}
          className="font-display text-base font-bold leading-snug hover:text-primary"
        >
          {tx(pack.title)}
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-bold text-primary">${pack.price}</span>
          {pack.compareAtPrice ? (
            <span className="text-xs text-muted-foreground line-through">${pack.compareAtPrice}</span>
          ) : null}
        </div>
        <a
          href={pack.patreonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center bg-primary px-3 py-2.5 text-xs font-bold uppercase text-primary-foreground transition-all hover:bg-primary/85"
        >
          {t("card.buy")}
        </a>
      </div>
    </article>
  );
}
