import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anime._slug-BJq_JGAo.js
var $$splitComponentImporter = () => import("./anime._slug-DK8fZ3J-.mjs");
var Route = createFileRoute("/anime/$slug")({
	head: ({ params }) => {
		const title = `${params.slug.replace(/-/g, " ")} art packs — SugarEcchi`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: "Every SugarEcchi art pack from this anime series, with its characters."
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: "Art packs and characters from this anime series."
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
