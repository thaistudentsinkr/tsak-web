// app/[locale]/info/visa/page.tsx
import Image from "next/image";
import data from "@/locales/info/visa.json";
import ShareButtons from "./ShareButtons";

type __Locale__ = "en" | "th";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: __Locale__ }>;
}) {
  const { locale } = await params;
  const content = data[locale] || data.en;

  return (
    <div>
      {/* HEADER */}
      <header className="bg-tsak-blue text-white">
        <div className="px-16">
          {/* Layout container for everything */}
          <div className="mx-auto max-w-7xl py-16">
            {/* Flex container for content and image - centered */}
            <div className="flex items-center gap-8">
              {/* Left side - Title, line, and share stacked */}
              <div className="flex-1 flex flex-col items-center">
                {/* Title */}
                <h1 className="text-3xl font-bold mb-3 text-center">
                  {content.title}
                </h1>

                {/* Date / Author - constrained to title width */}
                <div className="mb-3 self-stretch flex justify-center">
                  <div className="flex justify-between text-sm text-blue-100 w-full max-w-xl">
                    <span>
                      {content.date && (() => {
                        const date = new Date(content.date);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        return `${day}.${month}.${year}`;
                      })()}
                    </span>
                    <span>
                      {locale === "th" ? "เขียนโดย — " : "Written by — "}
                      {content.author}
                    </span>
                  </div>
                </div>

                {/* Line - full width */}
                <div className="w-full h-[3px] bg-white/70 mb-3" />

                {/* Share row - constrained to title width */}
                <div className="self-stretch flex justify-center">
                  <div className="w-full max-w-xl">
                    <ShareButtons locale={locale} />
                  </div>
                </div>
              </div>

              {/* Image - fixed width, aligned to right of content below */}
              <div className="flex-shrink-0">
                <Image
                  src="/tsak.png"
                  alt="Article image"
                  width={420}
                  height={260}
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="px-16 bg-white">
        <div className="py-12 mx-auto max-w-7xl">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {content.content}
          </p>
        </div>
      </main>
    </div>
  );
}