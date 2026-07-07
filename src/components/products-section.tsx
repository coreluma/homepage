import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const products = [
  {
    number: "01",
    name: "TodayHello",
    category: "AI Phone Companion",
    description:
      "AI phone companion service connecting care, family, and meaningful daily check-ins.",
    tags: ["AI", "iOS", "Android", "Spring", "AWS"],
    href: "/projects/todayhello/",
    tone: "sky",
  },
  {
    number: "02",
    name: "Stay Hush",
    category: "AI Relationship App",
    description:
      "An emotional AI experience designed around conversation, memory, and long-term connection.",
    tags: ["AI Chat", "Subscription", "Mobile", "Persona"],
    href: "/projects/stay-hush/",
    tone: "violet",
  },
  {
    number: "03",
    name: "Bobf",
    category: "Lunch Recommendation",
    description:
      "A fast recommendation and group decision product that helps busy teams choose what to eat.",
    tags: ["Next.js", "Recommendation", "Team", "Web"],
    href: "/projects/bobf/",
    tone: "green",
  },
];

function ProductVisual({ tone, name }: { tone: string; name: string }) {
  if (tone === "sky") {
    return (
      <div className="product-visual product-visual-sky">
        <span className="visual-orbit visual-orbit-one" />
        <span className="visual-orbit visual-orbit-two" />
        <div className="phone-shell">
          <span className="phone-speaker" />
          <div className="flex flex-1 flex-col items-center justify-center">
            <span className="mb-4 size-16 rounded-full bg-white/80 p-2 shadow-[0_12px_30px_rgba(35,110,204,0.2)]">
              <span className="flex size-full items-center justify-center rounded-full bg-gradient-to-br from-[#5ce1ff] to-[#5278ff] text-lg font-semibold text-white">T</span>
            </span>
            <span className="text-xs font-semibold text-[#143461]">TodayHello</span>
            <span className="mt-1 text-[0.55rem] tracking-wider text-[#527095] uppercase">Calling with care</span>
          </div>
          <span className="mx-auto mb-3 h-1 w-16 rounded-full bg-[#173a65]/20" />
        </div>
      </div>
    );
  }

  if (tone === "violet") {
    return (
      <div className="product-visual product-visual-violet">
        <span className="hush-glow" />
        <div className="hush-card hush-card-back" />
        <div className="hush-card hush-card-front">
          <span className="font-mono text-[0.52rem] tracking-[0.2em] text-white/60 uppercase">Stay close</span>
          <span className="mt-auto text-3xl font-semibold tracking-[-0.05em] text-white">Hush.</span>
          <div className="mt-5 flex gap-1.5">
            {[0, 1, 2, 3, 4].map((item) => <span key={item} className="h-5 w-1 rounded-full bg-white/50" style={{ height: `${12 + item * 3}px` }} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-visual product-visual-green">
      <div className="bobf-plate">
        <span className="bobf-food bobf-food-one" />
        <span className="bobf-food bobf-food-two" />
        <span className="bobf-food bobf-food-three" />
      </div>
      <div className="bobf-ticket">
        <span className="text-[0.5rem] tracking-[0.18em] text-[#4e6f48] uppercase">Today&apos;s pick</span>
        <span className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#173f27]">{name}</span>
      </div>
    </div>
  );
}

export function ProductsSection() {
  return (
    <section id="products" className="products-section relative overflow-hidden py-28 sm:py-36 lg:py-44">
      <div className="clarity-mist pointer-events-none absolute inset-x-0 -top-32 h-[32rem]" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Selected products"
            title="Ideas, made tangible."
            description="작은 아이디어가 선명한 제품이 되기까지. Core Luma가 직접 설계하고 만들고 출시한 제품들입니다."
          />
          <p className="max-w-sm font-mono text-[0.65rem] leading-5 tracking-[0.14em] text-[#7b8ca3] uppercase lg:text-right">
            From core logic<br />to human experience
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-5">
          {products.map((product, index) => (
            <article
              key={product.name}
              className="product-card group flex min-h-[38rem] flex-col overflow-hidden rounded-[2rem] border border-white/75 bg-white/68 p-3 shadow-[0_30px_90px_-48px_rgba(22,71,129,0.42)] backdrop-blur-xl"
              style={{ "--reveal-delay": `${index * 8}%` } as React.CSSProperties}
            >
              <ProductVisual tone={product.tone} name={product.name} />

              <div className="flex flex-1 flex-col px-4 pt-6 pb-4 sm:px-5">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-mono text-[0.62rem] tracking-[0.18em] text-[#168cff] uppercase">{product.category}</p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[#07152f]">{product.name}</h3>
                  </div>
                  <span className="font-mono text-xs text-[#9aa9bd]">/{product.number}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#61708c]">{product.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </div>
                <a
                  href={product.href}
                  className="mt-auto flex items-center justify-between border-t border-[#164c91]/10 pt-5 text-sm font-semibold text-[#10264a] transition group-hover:text-[#168cff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#168cff]"
                >
                  Learn More
                  <span className="flex size-9 items-center justify-center rounded-full border border-[#164c91]/10 bg-white/70 text-base transition duration-300 group-hover:translate-x-1 group-hover:border-[#168cff]/25 group-hover:bg-[#168cff] group-hover:text-white" aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex items-center gap-4 font-mono text-[0.6rem] tracking-[0.16em] text-[#8292a9] uppercase">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#168cff]/25" />
          Idea becomes product
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#168cff]/25" />
        </div>
      </Container>
    </section>
  );
}
