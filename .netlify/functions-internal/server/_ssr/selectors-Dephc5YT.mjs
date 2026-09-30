import { o as bestScore } from "./SiteLayout-C-HU6hZr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/selectors-Dephc5YT.js
function packsForAnime(packs, characters, animeId) {
	const ids = new Set(characters.filter((c) => c.animeId === animeId).map((c) => c.id));
	return packs.filter((p) => p.characterIds.some((cid) => ids.has(cid)));
}
function packsForCharacter(packs, characterId) {
	return packs.filter((p) => p.characterIds.includes(characterId));
}
function packsForCollection(packs, collectionId) {
	return packs.filter((p) => p.collectionIds.includes(collectionId));
}
function packsForTag(packs, tagId) {
	return packs.filter((p) => p.tagIds.includes(tagId));
}
function searchPacks(packs, query, characters) {
	const q = query.trim();
	if (!q) return packs;
	return packs.map((pack) => {
		const names = pack.characterIds.map((id) => characters.find((c) => c.id === id)).filter((c) => Boolean(c)).flatMap((c) => [c.name.en, c.name.ja]);
		return {
			pack,
			score: bestScore([
				pack.title.en,
				pack.title.ja,
				pack.description.en,
				pack.description.ja,
				pack.slug,
				...names
			], q)
		};
	}).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).map((entry) => entry.pack);
}
//#endregion
export { searchPacks as a, packsForTag as i, packsForCharacter as n, packsForCollection as r, packsForAnime as t };
