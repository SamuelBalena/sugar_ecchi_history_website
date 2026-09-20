import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import type { Pack } from "@/lib/types";

interface ProductRailProps {
  title: string;
  packs: Pack[];
  viewAllTo?: LinkProps["to"];
  viewAllLabel?: string;
}

export function ProductRail({ title, packs, viewAllTo, viewAllLabel }: ProductRailProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, dragFree: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    sync();
    emblaApi.on("select", sync).on("reInit", sync);
  }, [emblaApi, sync]);

  if (packs.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">SugarEcchi edit</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {viewAllTo ? (
            <Link to={viewAllTo} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent">
              {viewAllLabel}
            </Link>
          ) : null}
          <div className="hidden gap-1 sm:flex">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous"
              disabled={!canPrev}
              onClick={() => emblaApi?.scrollPrev()}
              className="size-9 rounded-full text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next"
              disabled={!canNext}
              onClick={() => emblaApi?.scrollNext()}
              className="size-9 rounded-full text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className="min-w-0 shrink-0 basis-[78%] sm:basis-[44%] lg:basis-[28%] xl:basis-[23%]"
            >
              <ProductCard pack={pack} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
