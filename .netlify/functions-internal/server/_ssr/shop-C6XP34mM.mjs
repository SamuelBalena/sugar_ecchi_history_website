import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-C6XP34mM.js
var $$splitComponentImporter = () => import("./shop-CZCfg5TP.mjs");
var Route = createFileRoute("/shop")({
	validateSearch: (search) => ({
		q: typeof search["q"] === "string" && search["q"] ? search["q"] : void 0,
		anime: typeof search["anime"] === "string" ? search["anime"] : void 0,
		character: typeof search["character"] === "string" ? search["character"] : void 0,
		collection: typeof search["collection"] === "string" ? search["collection"] : void 0,
		tag: typeof search["tag"] === "string" ? search["tag"] : void 0,
		sale: search["sale"] === true || search["sale"] === "true" ? true : void 0,
		sort: [
			"newest",
			"bestselling",
			"priceAsc",
			"priceDesc"
		].includes(String(search["sort"])) ? search["sort"] : void 0,
		page: Number(search["page"]) > 1 ? Number(search["page"]) : void 0
	}),
	head: () => ({ meta: [
		{ title: "Shop all anime art packs — SugarEcchi" },
		{
			name: "description",
			content: "Every SugarEcchi pack in one grid. Filter by anime, character, collection and tag, sort by new or bestselling."
		},
		{
			property: "og:title",
			content: "Shop all anime art packs — SugarEcchi"
		},
		{
			property: "og:description",
			content: "Filter adult anime art packs by anime, character, collection and tag."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
