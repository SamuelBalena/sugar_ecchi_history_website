import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as ChevronRight, s as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as Button } from "./SiteLayout-C-HU6hZr.mjs";
import { t as ProductCard } from "./ProductCard-Da5SuLQ3.mjs";
import { t as useEmblaCarousel } from "../_libs/embla-carousel-react+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductRail-C_7v773w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductRail({ title, packs, viewAllTo, viewAllLabel }) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		loop: false,
		dragFree: true
	});
	const [canPrev, setCanPrev] = (0, import_react.useState)(false);
	const [canNext, setCanNext] = (0, import_react.useState)(false);
	const sync = (0, import_react.useCallback)(() => {
		if (!emblaApi) return;
		setCanPrev(emblaApi.canScrollPrev());
		setCanNext(emblaApi.canScrollNext());
	}, [emblaApi]);
	(0, import_react.useEffect)(() => {
		if (!emblaApi) return;
		sync();
		emblaApi.on("select", sync).on("reInit", sync);
	}, [emblaApi, sync]);
	if (packs.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto w-full max-w-7xl px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "SugarEcchi edit"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-2xl font-bold sm:text-3xl",
				children: title
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [viewAllTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: viewAllTo,
					className: "text-xs uppercase tracking-widest text-muted-foreground hover:text-accent",
					children: viewAllLabel
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden gap-1 sm:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "icon",
						"aria-label": "Previous",
						disabled: !canPrev,
						onClick: () => emblaApi?.scrollPrev(),
						className: "size-9 rounded-full text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "icon",
						"aria-label": "Next",
						disabled: !canNext,
						onClick: () => emblaApi?.scrollNext(),
						className: "size-9 rounded-full text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden",
			ref: emblaRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-4",
				children: packs.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 shrink-0 basis-[78%] sm:basis-[44%] lg:basis-[28%] xl:basis-[23%]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { pack })
				}, pack.id))
			})
		})]
	});
}
//#endregion
export { ProductRail as t };
