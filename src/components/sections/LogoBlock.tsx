/**
 * src/components/sections/LogoBlock.tsx
 * Aligned client logo strip using original brand assets.
 */

import Image from "next/image";

const clientLogos = [
  {
    src: "/logos/Acrisure_logo.svg",
    alt: "Acrisure",
    width: 132,
    height: 28,
  },
  {
    src: "/logos/enhanced/adaptigent.png",
    alt: "Adaptigent",
    width: 148,
    height: 28,
  },
  {
    src: "/logos/awesomely-logo-mark-squircle.webp",
    alt: "Awesomely",
    width: 40,
    height: 40,
    compact: true,
  },
  {
    src: "/logos/enhanced/tawkify.png",
    alt: "Tawkify",
    width: 128,
    height: 28,
  },
  {
    src: "/logos/Logo-tritronics.png",
    alt: "Tri-Tronics",
    width: 156,
    height: 28,
  },
] as const;

/**
 * Horizontally aligned logo block for social proof below the hero.
 */
export function LogoBlock() {
  return (
    <section
      className="border-b border-white/[0.06] bg-zinc-950/50"
      aria-label="Experience across leading organizations"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          Experience engineering marketing and revenue-data systems for teams including
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-12 lg:gap-x-14">
          {clientLogos.map((logo) => (
            <li
              key={logo.alt}
              className={
                "compact" in logo && logo.compact
                  ? "flex h-9 w-9 shrink-0 items-center justify-center"
                  : "flex h-8 w-[9.5rem] shrink-0 items-center justify-center sm:h-9 sm:w-[10.5rem]"
              }
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-full w-auto max-w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
