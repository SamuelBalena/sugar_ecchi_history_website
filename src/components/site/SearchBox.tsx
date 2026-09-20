import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { bestScore } from "@/lib/search";

interface Suggestion {
  key: string;
  label: string;
  kind: "Pack" | "Character" | "Anime";
  slug: string;
  score: number;
}

export function SearchBox({ onNavigate }: { onNavigate?: () => void }) {
  const { t, tx } = useLang();
  const { publishedPacks, animes, characters } = useCatalog();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions = useMemo<Suggestion[]>(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    const out: Suggestion[] = [];

    for (const pack of publishedPacks) {
      const score = bestScore([pack.title.en, pack.title.ja, pack.slug], q);
      if (score > 0)
        out.push({
          key: `p-${pack.id}`,
          label: tx(pack.title),
          kind: "Pack",
          slug: pack.slug,
          score: score + 5,
        });
    }
    for (const character of characters) {
      const score = bestScore([character.name.en, character.name.ja, character.slug], q);
      if (score > 0)
        out.push({
          key: `c-${character.id}`,
          label: tx(character.name),
          kind: "Character",
          slug: character.slug,
          score,
        });
    }
    for (const anime of animes) {
      const score = bestScore([anime.name.en, anime.name.ja, anime.slug], q);
      if (score > 0)
        out.push({
          key: `a-${anime.id}`,
          label: tx(anime.name),
          kind: "Anime",
          slug: anime.slug,
          score,
        });
    }
    return out.sort((a, b) => b.score - a.score).slice(0, 6);
  }, [query, publishedPacks, characters, animes, tx]);

  const close = () => {
    if (blurTimer.current) clearTimeout(blurTimer.current);
    blurTimer.current = setTimeout(() => setFocused(false), 120);
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setFocused(false);
          onNavigate?.();
          void navigate({ to: "/shop", search: { q: query.trim() || undefined } });
        }}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={close}
          placeholder={t("search.ph")}
          aria-label={t("search.ph")}
          className="h-10 border-border/70 bg-input/40 text-sm placeholder:text-muted-foreground/70 focus-visible:border-accent"
          style={{ paddingLeft: "2.5rem" }}
        />
      </form>

      {focused && query.trim().length >= 2 ? (
        <div className="absolute left-0 right-0 top-12 z-50 border border-border bg-popover shadow-luxe">
          {suggestions.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted-foreground">{t("search.none")}</p>
          ) : (
            suggestions.map((item) => (
              <Link
                key={item.key}
                to={
                  item.kind === "Pack"
                    ? "/product/$slug"
                    : item.kind === "Character"
                      ? "/characters/$slug"
                      : "/anime/$slug"
                }
                params={{ slug: item.slug }}
                onClick={() => {
                  setFocused(false);
                  setQuery("");
                  onNavigate?.();
                }}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-secondary"
              >
                <span className="truncate">{item.label}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-widest text-accent">
                  {item.kind}
                </span>
              </Link>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
