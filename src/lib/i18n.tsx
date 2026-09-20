import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { I18nText, Lang } from "./types";

const STORAGE_KEY = "sugarecchi.lang";

export const copy = {
  "nav.shop": { en: "Shop", ja: "ショップ" },
  "nav.anime": { en: "Animes", ja: "アニメ" },
  "nav.characters": { en: "Characters", ja: "キャラクター" },
  "nav.collections": { en: "Collections", ja: "コレクション" },
  "nav.tags": { en: "Tags", ja: "タグ" },
  "nav.faq": { en: "FAQ", ja: "よくある質問" },
  "nav.bestsellers": { en: "Bestsellers", ja: "売れ筋商品" },
  "nav.new": { en: "New", ja: "新着" },
  "nav.sale": { en: "Sale", ja: "セール" },
  "nav.wishlist": { en: "Wishlist", ja: "お気に入り" },
  "search.ph": {
    en: "Search products, characters, anime",
    ja: "商品・キャラ・アニメを検索",
  },
  "search.none": { en: "No matches", ja: "該当なし" },
  "home.bannerTitle": { en: "New character packs", ja: "新着キャラクターパック" },
  "home.bannerCta": { en: "Shop all", ja: "すべての商品" },
  "home.byAnime": { en: "Shop by anime", ja: "アニメから探す" },
  "home.bestsellers": { en: "Bestsellers", ja: "売れ筋商品" },
  "home.new": { en: "New arrivals", ja: "新着商品" },
  "home.featured": { en: "Featured", ja: "おすすめ" },
  "home.collections": { en: "Collections", ja: "コレクション" },
  "card.buy": { en: "Buy on Patreon", ja: "Patreonで購入" },
  "card.view": { en: "View pack", ja: "詳細を見る" },
  "pdp.checkoutNote": {
    en: "You'll complete payment on Patreon",
    ja: "支払いはPatreonで完了します",
  },
  "pdp.related": { en: "You may also like", ja: "こちらの商品も" },
  "pdp.specs": { en: "Specs", ja: "仕様" },
  "pdp.contents": { en: "Contents", ja: "収録内容" },
  "pdp.files": { en: "Files", ja: "ファイル数" },
  "pdp.format": { en: "Format", ja: "フォーマット" },
  "pdp.characters": { en: "Characters", ja: "キャラクター" },
  "pdp.anime": { en: "Anime", ja: "アニメ" },
  "footer.social": { en: "Follow", ja: "フォロー" },
  "footer.catalog": { en: "Catalog", ja: "カタログ" },
  "footer.store": { en: "Store", ja: "ストア" },
  "footer.policy": { en: "18+ policy", ja: "18歳以上限定" },
  "footer.payments": { en: "Payments on Patreon", ja: "支払いはPatreon" },
  "footer.admin": { en: "Admin login", ja: "管理ログイン" },
  "footer.disclaimer": {
    en: "18+ only. Fictional adult characters. Payments completed on Patreon.",
    ja: "18歳以上限定。創作の成人キャラクターのみ。支払いはPatreonで完了します。",
  },
  "gate.title": { en: "18+ store", ja: "18歳以上のストア" },
  "gate.body": {
    en: "Adult fictional characters only. By entering you confirm you are 18 or older.",
    ja: "創作の成人キャラクターのみを扱います。入店は18歳以上であることの確認となります。",
  },
  "gate.enter": { en: "Enter store", ja: "ストアに入る" },
  "gate.leave": { en: "Leave", ja: "退出する" },
  "shop.title": { en: "Shop", ja: "ショップ" },
  "shop.results": { en: "products", ja: "件の商品" },
  "shop.filters": { en: "Filters", ja: "絞り込み" },
  "shop.clear": { en: "Clear filters", ja: "条件をクリア" },
  "shop.sort": { en: "Sort", ja: "並び替え" },
  "sort.newest": { en: "Newest", ja: "新着順" },
  "sort.bestselling": { en: "Bestselling", ja: "売れ筋順" },
  "sort.priceAsc": { en: "Price: low to high", ja: "価格の安い順" },
  "sort.priceDesc": { en: "Price: high to low", ja: "価格の高い順" },
  "shop.empty": { en: "No products match these filters.", ja: "該当する商品がありません。" },
  "page.animes": { en: "Animes", ja: "アニメ" },
  "page.characters": { en: "Characters", ja: "キャラクター" },
  "page.collections": { en: "Collections", ja: "コレクション" },
  "page.tags": { en: "Tags", ja: "タグ" },
  "page.faq": { en: "Frequently asked questions", ja: "よくある質問" },
  "wishlist.title": { en: "Wishlist", ja: "お気に入り" },
  "wishlist.empty": { en: "Your wishlist is empty.", ja: "お気に入りは空です。" },
  "common.packs": { en: "packs", ja: "パック" },
  "common.prev": { en: "Previous", ja: "前へ" },
  "common.next": { en: "Next", ja: "次へ" },
} as const satisfies Record<string, I18nText>;

export type CopyKey = keyof typeof copy;

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: CopyKey) => string;
  tx: (text: I18nText | undefined) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ja") setLangState(stored);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      t: (key) => copy[key][lang],
      tx: (text) => (text ? text[lang] || text.en : ""),
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
