import data from "@/locales/info/visa.json";

type Locale = 'en' | 'th';

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = await params;
  const content = data[locale] || data.en;

  return (
    <div>
      <header className="bg-tsak-blue text-white py-60 shadow-md">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
          <p className="text-blue-100 text-sm">
            {content.author && <span>{content.author}</span>}
            {content.author && content.date && " — "}
            {content.date &&
              new Date(content.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-8 p-8 relative z-10">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {content.content}
        </p>
      </main>
    </div>
  );
}
