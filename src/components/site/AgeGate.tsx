import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { BRAND } from "@/lib/social";

const GATE_KEY = "sugarecchi.gate.v1";

export function AgeGate() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(GATE_KEY) !== "1") setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-background/95 px-4 backdrop-blur-md">
      <div className="w-full max-w-md border border-border bg-card p-8 text-center shadow-luxe">
        <p className="eyebrow">{BRAND}</p>
        <h2 className="mt-3 text-3xl font-semibold">{t("gate.title")}</h2>
        <div className="gold-rule mx-auto my-5 w-24" />
        <p className="text-sm leading-relaxed text-muted-foreground">{t("gate.body")}</p>
        <div className="mt-7 flex flex-col gap-3">
          <Button
            size="lg"
            onClick={() => {
              window.localStorage.setItem(GATE_KEY, "1");
              setOpen(false);
            }}
          >
            {t("gate.enter")}
          </Button>
          <a
            href="https://www.google.com"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            {t("gate.leave")}
          </a>
        </div>
      </div>
    </div>
  );
}
