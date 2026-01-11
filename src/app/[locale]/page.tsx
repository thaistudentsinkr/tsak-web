import { getDictionary } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>{(dict as any)["home.introduction"] || "Homepage"}</h1>
      </main>
    </div>
  );
}
