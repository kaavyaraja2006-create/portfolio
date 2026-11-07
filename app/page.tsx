import { Hero, Work, Stack, Record, About, Contact } from "@/components/Sections";

export default function Page() {
  return (
    <main className="relative w-full max-w-[100vw] overflow-x-clip">
      <Hero />
      <Work />
      <Stack />
      <Record />
      <About />
      <Contact />
    </main>
  );
}
