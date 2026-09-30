import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-DT5t6ajp.js
var $$splitNotFoundComponentImporter = () => import("./product._slug-tSSDn_pj.mjs");
var $$splitComponentImporter = () => import("./product._slug-DWxI-AyO.mjs");
var Route = createFileRoute("/product/$slug")({
	head: ({ params }) => {
		const title = `${params.slug.replace(/-/g, " ")} — SugarEcchi pack`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: "Adult anime character art pack by SugarEcchi. High resolution files, bilingual details, payment completed on Patreon."
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: "High resolution anime art pack. 18+ only. Buy on Patreon."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
