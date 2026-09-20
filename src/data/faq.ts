import type { I18nText } from "@/lib/types";

export interface FaqItem {
  id: string;
  question: I18nText;
  answer: I18nText;
}

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: {
      en: "Do I pay on this website?",
      ja: "このサイトで支払いをしますか？",
    },
    answer: {
      en: "No. This is a catalog. The product button opens Patreon in a new tab. Payment is handled by Patreon.",
      ja: "いいえ。ここはカタログです。商品ボタンはPatreonを新しいタブで開きます。支払いはPatreon側で行われます。",
    },
  },
  {
    id: "faq-2",
    question: { en: "Where do I receive the pack?", ja: "パックはどこで受け取れますか？" },
    answer: {
      en: "On Patreon, after checkout, through the listing you opened.",
      ja: "決済後、開いた商品ページのあるPatreon上で受け取れます。",
    },
  },
  {
    id: "faq-3",
    question: { en: "Why not buy only on Patreon?", ja: "Patreonだけで買えばいいのでは？" },
    answer: {
      en: "You can. This store exists to browse by anime, character, and tags faster than the native shop.",
      ja: "それでも構いません。このストアはアニメ・キャラ・タグで原生ショップより速く探すためのものです。",
    },
  },
  {
    id: "faq-4",
    question: { en: "Are the characters 18+?", ja: "キャラクターは18歳以上ですか？" },
    answer: {
      en: "Yes. Adult fictional characters only. Minors are not sold or depicted.",
      ja: "はい。創作の成人キャラクターのみです。未成年は扱いません。",
    },
  },
  {
    id: "faq-5",
    question: {
      en: "Can I get English and Japanese product info?",
      ja: "商品情報は英語と日本語で見られますか？",
    },
    answer: {
      en: "Yes. Switch EN / 日本語 in the navbar. Each product has both texts in one listing.",
      ja: "はい。ナビの EN / 日本語 で切り替えます。各商品は1件の登録で両方の本文を持ちます。",
    },
  },
  {
    id: "faq-6",
    question: {
      en: "A search typo returned nothing useful. What now?",
      ja: "検索の打ち間違いで出てこないときは？",
    },
    answer: {
      en: "Try the character or anime name. Search matches close spellings in English and Japanese.",
      ja: "キャラ名かアニメ名を試してください。英語・日本語の近い表記も探します。",
    },
  },
  {
    id: "faq-7",
    question: { en: "How do I follow updates?", ja: "更新はどこで追えますか？" },
    answer: {
      en: "Patreon https://www.patreon.com/c/SugarEcchi and X https://x.com/SugarEcchi",
      ja: "Patreon https://www.patreon.com/c/SugarEcchi と X https://x.com/SugarEcchi",
    },
  },
];
