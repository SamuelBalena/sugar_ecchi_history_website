import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tags._slug-CDCE7Rcx.js
var $$splitComponentImporter = () => import("./tags._slug-_bGwpNrL.mjs");
var Route = createFileRoute("/tags/$slug")({
	head: ({ params }) => {
		const title = `${params.slug.replace(/-/g, " ")} art packs — SugarEcchi`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: "SugarEcchi art packs matching this style tag."
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: "Adult anime art packs matching this style tag."
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
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
