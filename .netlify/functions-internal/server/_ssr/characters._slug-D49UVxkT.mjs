import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/characters._slug-D49UVxkT.js
var $$splitComponentImporter = () => import("./characters._slug-CEuaTkpC.mjs");
var Route = createFileRoute("/characters/$slug")({
	head: ({ params }) => {
		const title = `${params.slug.replace(/-/g, " ")} art packs — SugarEcchi`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: "Every SugarEcchi art pack featuring this character."
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: "Art packs featuring this anime character."
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
