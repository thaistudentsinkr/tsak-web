import { ExternalLink, GraduationCap, Briefcase, Building2, CreditCard, Award, Lightbulb, BookOpen, Mic } from "lucide-react";
import enData from "@/locales/info/topik/en.json";
import thData from "@/locales/info/topik/th.json";

type Locale = "en" | "th";

const messages: Record<string, typeof enData> = {
  en: enData,
  th: thData,
};

export default async function TopikPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = messages[locale] || messages.en;

  const importanceIcons = [GraduationCap, Award, Briefcase, BookOpen, Building2];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#2C3985] text-white py-60 shadow-md">
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-8 p-8 relative z-10">
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
          <p className="text-gray-700 leading-relaxed text-lg">
            {content.introduction}
          </p>

          {/* Official Website Link */}
          <a
            href="https://www.topik.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#A51D2C] text-white rounded-full font-medium hover:bg-[#8B1824] transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            {content.visitTopik}
          </a>
        </section>

        {/* Why is TOPIK Important */}
        <section className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2C3985] mb-6">
            {content.sections.importance.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.sections.importance.items.map((item, idx) => {
              const Icon = importanceIcons[idx] || GraduationCap;
              return (
                <div
                  key={idx}
                  className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2C3985]/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#2C3985]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2C3985] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* IBT vs PBT Comparison Table */}
        <section className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2C3985] mb-6">
            {content.sections.comparison.title}
          </h2>
          <div className="overflow-x-auto">
            <div className="overflow-hidden rounded-xl border border-[#2C3985]/20">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#2C3985]">
                    {content.sections.comparison.headers.map((header, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-3 text-left text-sm font-semibold text-white"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.sections.comparison.rows.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className="border-b border-[#2C3985]/10 last:border-b-0"
                    >
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className={`px-4 py-3 text-sm ${
                            cellIdx === 0
                              ? "font-medium text-[#2C3985] bg-[#2C3985]/5"
                              : "text-gray-700"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Exam Structure */}
        <section className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2C3985] mb-6">
            {content.sections.structure.title}
          </h2>

          {/* IBT Section */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#A51D2C] mb-6 pb-2 border-b-2 border-[#A51D2C]">
              {content.sections.structure.ibt.title}
            </h3>

            {/* IBT TOPIK I */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-lg font-semibold text-[#2C3985]">
                  {content.sections.structure.ibt.topik1.title}
                </h4>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {content.sections.structure.ibt.topik1.levels}
                </span>
              </div>
              <div className="overflow-x-auto">
                <div className="overflow-hidden rounded-xl border border-[#2C3985]/20 mb-2">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#2C3985]">
                        {content.sections.structure.ibt.topik1.headers.map(
                          (header, idx) => (
                            <th
                              key={idx}
                              className="px-4 py-3 text-left text-sm font-semibold text-white"
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {content.sections.structure.ibt.topik1.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="border-b border-[#2C3985]/10 last:border-b-0">
                          {row.map((cell, cellIdx) => (
                            <td
                              key={cellIdx}
                              className={`px-4 py-3 text-sm ${
                                cellIdx === 0 ? "font-medium text-[#2C3985] bg-[#2C3985]/5" : "text-gray-700"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  {content.sections.structure.ibt.topik1.total}
                </p>
              </div>
            </div>

            {/* IBT TOPIK II */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-lg font-semibold text-[#2C3985]">
                  {content.sections.structure.ibt.topik2.title}
                </h4>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  {content.sections.structure.ibt.topik2.levels}
                </span>
              </div>
              <div className="overflow-x-auto">
                <div className="overflow-hidden rounded-xl border border-[#2C3985]/20 mb-2">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#2C3985]">
                        {content.sections.structure.ibt.topik2.headers.map(
                          (header, idx) => (
                            <th
                              key={idx}
                              className="px-4 py-3 text-left text-sm font-semibold text-white"
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {content.sections.structure.ibt.topik2.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="border-b border-[#2C3985]/10 last:border-b-0">
                          {row.map((cell, cellIdx) => (
                            <td
                              key={cellIdx}
                              className={`px-4 py-3 text-sm ${
                                cellIdx === 0 ? "font-medium text-[#2C3985] bg-[#2C3985]/5" : "text-gray-700"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  {content.sections.structure.ibt.topik2.total}
                </p>
              </div>
            </div>
          </div>

          {/* PBT Section */}
          <div>
            <h3 className="text-xl font-bold text-[#2C3985] mb-6 pb-2 border-b-2 border-[#2C3985]">
              {content.sections.structure.pbt.title}
            </h3>

            {/* PBT TOPIK I */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-lg font-semibold text-[#2C3985]">
                  {content.sections.structure.pbt.topik1.title}
                </h4>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {content.sections.structure.pbt.topik1.levels}
                </span>
              </div>
              <div className="overflow-x-auto">
                <div className="overflow-hidden rounded-xl border border-[#2C3985]/20 mb-2">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#2C3985]">
                        {content.sections.structure.pbt.topik1.headers.map(
                          (header, idx) => (
                            <th
                              key={idx}
                              className="px-4 py-3 text-left text-sm font-semibold text-white"
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {content.sections.structure.pbt.topik1.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="border-b border-[#2C3985]/10 last:border-b-0">
                          {row.map((cell, cellIdx) => (
                            <td
                              key={cellIdx}
                              className={`px-4 py-3 text-sm ${
                                cellIdx === 0 ? "font-medium text-[#2C3985] bg-[#2C3985]/5" : "text-gray-700"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  {content.sections.structure.pbt.topik1.total}
                </p>
              </div>
            </div>

            {/* PBT TOPIK II */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-lg font-semibold text-[#2C3985]">
                  {content.sections.structure.pbt.topik2.title}
                </h4>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  {content.sections.structure.pbt.topik2.levels}
                </span>
              </div>
              <div className="overflow-x-auto">
                <div className="overflow-hidden rounded-xl border border-[#2C3985]/20 mb-2">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#2C3985]">
                        {content.sections.structure.pbt.topik2.headers.map(
                          (header, idx) => (
                            <th
                              key={idx}
                              className="px-4 py-3 text-left text-sm font-semibold text-white"
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {content.sections.structure.pbt.topik2.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="border-b border-[#2C3985]/10 last:border-b-0">
                          {row.map((cell, cellIdx) => (
                            <td
                              key={cellIdx}
                              className={`px-4 py-3 text-sm ${
                                cellIdx === 0 ? "font-medium text-[#2C3985] bg-[#2C3985]/5" : "text-gray-700"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  {content.sections.structure.pbt.topik2.total}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Pricing */}
        <section className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2C3985] mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            {content.sections.pricing.title}
          </h2>
          <p className="text-gray-700 mb-6">
            {content.sections.pricing.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IBT Pricing */}
            <div>
              <h3 className="font-semibold text-[#A51D2C] mb-3">
                {content.sections.pricing.ibt.title}
              </h3>
              <div className="overflow-hidden rounded-xl border border-[#2C3985]/20">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#2C3985]">
                      {content.sections.pricing.ibt.headers.map((header, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-3 text-left text-sm font-semibold text-white"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.sections.pricing.ibt.rows.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="border-b border-[#2C3985]/10 last:border-b-0"
                      >
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className={`px-4 py-3 text-sm ${
                              cellIdx === 0
                                ? "font-semibold text-[#2C3985] bg-[#2C3985]/5"
                                : "text-gray-700"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PBT Pricing */}
            <div>
              <h3 className="font-semibold text-[#2C3985] mb-3">
                {content.sections.pricing.pbt.title}
              </h3>
              <div className="overflow-hidden rounded-xl border border-[#2C3985]/20">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#2C3985]">
                      {content.sections.pricing.pbt.headers.map((header, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-3 text-left text-sm font-semibold text-white"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.sections.pricing.pbt.rows.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="border-b border-[#2C3985]/10 last:border-b-0"
                      >
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className={`px-4 py-3 text-sm ${
                              cellIdx === 0
                                ? "font-semibold text-[#2C3985] bg-[#2C3985]/5"
                                : "text-gray-700"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4 italic">
            {content.sections.pricing.note}
          </p>
        </section>

        {/* Preparation Tips */}
        <section className="bg-[#FFFCDD] rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2C3985] mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            {content.sections.tips.title}
          </h2>
          <ul className="space-y-3 mb-6">
            {content.sections.tips.items.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#2C3985] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {idx + 1}
                </span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://www.topik.go.kr/practice"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#A51D2C] text-white rounded-full font-medium hover:bg-[#8B1824] transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            {content.sections.tips.practiceTest}
          </a>
        </section>

        {/* TOPIK Speaking Section */}
        <section className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2C3985] mb-4 flex items-center gap-2">
            <Mic className="w-6 h-6" />
            {content.sections.speaking.title}
          </h2>
          <p className="text-gray-700 mb-6">
            {content.sections.speaking.description}
          </p>

          {/* Speaking Structure Table */}
          <div className="mb-8">
            <h3 className="font-semibold text-[#A51D2C] mb-3">
              {content.sections.speaking.structure.title}
            </h3>
            <div className="overflow-x-auto">
              <div className="overflow-hidden rounded-xl border border-[#2C3985]/20">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#2C3985]">
                      {content.sections.speaking.structure.headers.map((header, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-3 text-left text-sm font-semibold text-white"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.sections.speaking.structure.rows.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="border-b border-[#2C3985]/10 last:border-b-0"
                      >
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className={`px-4 py-3 text-sm ${
                              cellIdx === 0
                                ? "font-semibold text-[#2C3985] bg-[#2C3985]/5"
                                : "text-gray-700"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium mt-2">
              {content.sections.speaking.structure.total}
            </p>
          </div>

          {/* Speaking Levels */}
          <div className="mb-6">
            <h3 className="font-semibold text-[#A51D2C] mb-3">
              {content.sections.speaking.levels.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {content.sections.speaking.levels.items.map((level, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#2C3985]">
                      {level.level}
                    </span>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                      {level.score}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Speaking Fee */}
          <div className="bg-[#FFFCDD] rounded-lg p-4">
            <p className="font-medium text-[#2C3985]">
              {content.sections.speaking.pricing.title}: {content.sections.speaking.pricing.fee}
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-4 italic">
            {content.sections.speaking.note}
          </p>
        </section>

        {/* Official Website CTA */}
        <section className="bg-[#2C3985] rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-4">
            {content.officialWebsite}
          </h2>
          <a
            href="https://www.topik.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFFCDD] text-[#2C3985] rounded-full font-medium hover:bg-white transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            {content.visitTopik}
          </a>
        </section>
      </main>
    </div>
  );
}