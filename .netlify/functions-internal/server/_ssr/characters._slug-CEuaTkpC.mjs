import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { h as Link, j as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SiteLayout, i as PageHeader } from "./SiteLayout-C-HU6hZr.mjs";
import { t as ProductCard } from "./ProductCard-Da5SuLQ3.mjs";
import { n as packsForCharacter } from "./selectors-Dephc5YT.mjs";
import { t as Route } from "./characters._slug-D49UVxkT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/characters._slug-CEuaTkpC.js
var import_jsx_runtime = require_jsx_runtime();
function CharacterDetail() {
	const { slug } = Route.useParams();
	const { t, tx } = useLang();
	const { characters, animeById, publishedPacks } = useCatalog();
	const character = characters.find((c) => c.slug === slug);
	if (!character) throw notFound();
	const anime = animeById(character.animeId);
	const packs = packsForCharacter(publishedPacks, character.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		faq: "compact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: anime ? tx(anime.name) : t("pdp.characters"),
			title: tx(character.name),
			subtitle: tx(character.description)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-4 pb-16",
			children: [
				anime ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/anime/$slug",
					params: { slug: anime.slug },
					className: "mb-8 inline-block border border-border/70 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent hover:text-accent",
					children: tx(anime.name)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: packs.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { pack }, pack.id))
				}),
				packs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-16 text-center text-sm text-muted-foreground",
					children: t("shop.empty")
				}) : null
			]
		})]
	});
}
//#endregion
export { CharacterDetail as component };
