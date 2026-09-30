import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as useLang } from "./catalog-LwytbwQE.mjs";
import { a as SiteLayout, i as PageHeader, n as FaqAccordion } from "./SiteLayout-C-HU6hZr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-UXYRN9RU.js
var import_jsx_runtime = require_jsx_runtime();
function FaqPage() {
	const { t } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "FAQ",
		title: t("page.faq")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqAccordion, { withHeading: false })] });
}
//#endregion
export { FaqPage as component };
