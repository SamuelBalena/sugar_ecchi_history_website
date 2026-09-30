import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collections._slug-DyiQwWlx.js
var $$splitComponentImporter = () => import("./collections._slug-CowRMZQS.mjs");
var Route = createFileRoute("/collections/$slug")({
	head: ({ params }) => {
		const title = `${params.slug.replace(/-/g, " ")} collection — SugarEcchi`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: "A curated SugarEcchi collection of adult anime art packs."
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: "A curated set of adult anime art packs."
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
