import { HeroDesignSwitcher } from "@/components/hero-design-switcher";
import { ProductsSection } from "@/components/products-section";
import { SectionShell } from "@/components/ui/section-shell";

const sections = [
  {
    id: "about",
    eyebrow: "Who we are",
    title: "A small team building solid products.",
    description: "Our story, principles, and the meaning behind Core and Luma.",
  },
  {
    id: "process",
    eyebrow: "How we build",
    title: "From idea to launch.",
    description: "A focused process from the first thought to continuous improvement.",
  },
  {
    id: "members",
    eyebrow: "Meet the team",
    title: "Two disciplines, one product team.",
    description: "Frontend and backend working side by side from beginning to end.",
  },
  {
    id: "timeline",
    eyebrow: "Building in public",
    title: "Always making the next thing.",
    description: "A living timeline of launches, lessons, and what comes next.",
  },
  {
    id: "contact",
    eyebrow: "Start a conversation",
    title: "Let’s build something meaningful.",
    description: "A calm, direct invitation for ideas, collaborations, and product opportunities.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <HeroDesignSwitcher />
      <ProductsSection />

      {sections.map((section) => (
        <SectionShell key={section.id} {...section} />
      ))}
    </main>
  );
}
