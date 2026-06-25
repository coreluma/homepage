const links = [
  {
    name: "붕어빵 탐험대",
    href: "https://bunglog.coreluma.kr/",
  },
  {
    name: "밥프 BOBF",
    href: "https://dev-bobf.coreluma.kr/",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-background px-6 text-foreground">
      <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:max-w-xl">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 flex-1 items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 text-base font-semibold text-zinc-950 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-700 dark:focus-visible:outline-zinc-50"
          >
            {link.name}
          </a>
        ))}
      </div>
    </main>
  );
}
