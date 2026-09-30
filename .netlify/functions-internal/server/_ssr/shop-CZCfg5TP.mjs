import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SiteLayout, i as PageHeader, s as cn, t as Button } from "./SiteLayout-C-HU6hZr.mjs";
import { t as ProductCard } from "./ProductCard-Da5SuLQ3.mjs";
import { a as searchPacks } from "./selectors-Dephc5YT.mjs";
import { t as Route } from "./shop-C6XP34mM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-CZCfg5TP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 8;
function sortPacks(packs, sort) {
	const list = [...packs];
	switch (sort) {
		case "bestselling": return list.sort((a, b) => b.salesCount - a.salesCount);
		case "priceAsc": return list.sort((a, b) => a.price - b.price);
		case "priceDesc": return list.sort((a, b) => b.price - a.price);
		default: return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
	}
}
function ShopPage() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: "/shop" });
	const { t, tx } = useLang();
	const { publishedPacks, characters, animes, collections, tags } = useCatalog();
	const setSearch = (next) => {
		navigate({ search: (prev) => ({
			...prev,
			...next,
			page: void 0
		}) });
	};
	const filtered = (0, import_react.useMemo)(() => {
		let list = publishedPacks;
		if (search["anime"]) {
			const anime = animes.find((a) => a.slug === search["anime"]);
			const ids = new Set(characters.filter((c) => c.animeId === anime?.id).map((c) => c.id));
			list = list.filter((p) => p.characterIds.some((cid) => ids.has(cid)));
		}
		if (search["character"]) {
			const character = characters.find((c) => c.slug === search["character"]);
			list = list.filter((p) => character ? p.characterIds.includes(character.id) : false);
		}
		if (search["collection"]) {
			const collection = collections.find((c) => c.slug === search["collection"]);
			list = list.filter((p) => collection ? p.collectionIds.includes(collection.id) : false);
		}
		if (search["tag"]) {
			const tag = tags.find((c) => c.slug === search["tag"]);
			list = list.filter((p) => tag ? p.tagIds.includes(tag.id) : false);
		}
		if (search["sale"]) list = list.filter((p) => Boolean(p.compareAtPrice));
		if (search["q"]) list = searchPacks(list, search["q"], characters);
		return search["q"] ? list : sortPacks(list, search.sort ?? "newest");
	}, [
		publishedPacks,
		characters,
		animes,
		collections,
		tags,
		search
	]);
	const page = search.page ?? 1;
	const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	const hasFilters = Boolean(search["q"] || search["anime"] || search["character"] || search["collection"] || search["tag"] || search["sale"]);
	const chip = (active) => cn("border px-3 py-1.5 text-xs transition-colors", active ? "border-accent bg-accent/10 text-accent" : "border-border/70 text-muted-foreground hover:border-accent/60 hover:text-foreground");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		faq: "compact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Catalog",
			title: search["q"] ? `“${search["q"]}”` : t("shop.title"),
			subtitle: `${filtered.length} ${t("shop.results")}`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-7xl gap-8 px-4 pb-14 lg:grid-cols-[240px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: t("shop.filters")
						}), hasFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void navigate({ search: {} }),
							className: "text-[11px] uppercase tracking-widest text-muted-foreground hover:text-accent",
							children: t("shop.clear")
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
						title: t("nav.anime"),
						children: animes.map((anime) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: chip(search["anime"] === anime.slug),
							onClick: () => setSearch({ anime: search["anime"] === anime.slug ? void 0 : anime.slug }),
							children: tx(anime.name)
						}, anime.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
						title: t("nav.characters"),
						children: characters.map((character) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: chip(search["character"] === character.slug),
							onClick: () => setSearch({ character: search["character"] === character.slug ? void 0 : character.slug }),
							children: tx(character.name)
						}, character.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
						title: t("nav.collections"),
						children: collections.map((collection) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: chip(search["collection"] === collection.slug),
							onClick: () => setSearch({ collection: search["collection"] === collection.slug ? void 0 : collection.slug }),
							children: tx(collection.title)
						}, collection.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
						title: t("nav.tags"),
						children: tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: chip(search["tag"] === tag.slug),
							onClick: () => setSearch({ tag: search["tag"] === tag.slug ? void 0 : tag.slug }),
							children: tx(tag.label)
						}, tag.id))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex flex-wrap items-center gap-2 border-b border-border/50 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-1 text-[11px] uppercase tracking-widest text-muted-foreground",
						children: t("shop.sort")
					}), [
						"newest",
						"bestselling",
						"priceAsc",
						"priceDesc"
					].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: chip((search.sort ?? "newest") === key),
						onClick: () => setSearch({ sort: key }),
						children: t(`sort.${key}`)
					}, key))]
				}),
				visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-16 text-center text-sm text-muted-foreground",
					children: t("shop.empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
					children: visible.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { pack }, pack.id))
				}),
				pageCount > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex items-center justify-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page <= 1,
							onClick: () => void navigate({ search: (prev) => ({
								...prev,
								page: page - 1
							}) }),
							children: t("common.prev")
						}),
						Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: (prev) => ({
								...prev,
								page: n > 1 ? n : void 0
							}),
							className: chip(n === page),
							children: n
						}, n)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page >= pageCount,
							onClick: () => void navigate({ search: (prev) => ({
								...prev,
								page: page + 1
							}) }),
							children: t("common.next")
						})
					]
				}) : null
			] })]
		})]
	});
}
function FilterGroup({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-3 text-xs uppercase tracking-widest text-muted-foreground",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children
	})] });
}
//#endregion
export { ShopPage as component };
