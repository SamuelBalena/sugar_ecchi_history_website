import type { Character, Pack } from "./types";
import { bestScore } from "./search";

export function packsForAnime(
  packs: Pack[],
  characters: Character[],
  animeId: string,
): Pack[] {
  const ids = new Set(characters.filter((c) => c.animeId === animeId).map((c) => c.id));
  return packs.filter((p) => p.characterIds.some((cid) => ids.has(cid)));
}

export function packsForCharacter(packs: Pack[], characterId: string): Pack[] {
  return packs.filter((p) => p.characterIds.includes(characterId));
}

export function packsForCollection(packs: Pack[], collectionId: string): Pack[] {
  return packs.filter((p) => p.collectionIds.includes(collectionId));
}

export function packsForTag(packs: Pack[], tagId: string): Pack[] {
  return packs.filter((p) => p.tagIds.includes(tagId));
}

export function searchPacks(packs: Pack[], query: string, characters: Character[]): Pack[] {
  const q = query.trim();
  if (!q) return packs;
  return packs
    .map((pack) => {
      const names = pack.characterIds
        .map((id) => characters.find((c) => c.id === id))
        .filter((c): c is Character => Boolean(c))
        .flatMap((c) => [c.name.en, c.name.ja]);
      const score = bestScore(
        [pack.title.en, pack.title.ja, pack.description.en, pack.description.ja, pack.slug, ...names],
        q,
      );
      return { pack, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.pack);
}
