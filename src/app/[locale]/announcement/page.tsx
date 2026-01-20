"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, ArrowUpDown } from "lucide-react";
import enContent from "@/locales/announcement/en.json";
import thContent from "@/locales/announcement/th.json";

type Locale = "en" | "th";

type Announcement = {
  id: string;
  date: string;
  semester: string;
  department: string;
  title: string;
  views: number;
};

const content = {
  en: enContent,
  th: thContent,
};

// Mock data
const announcements: Announcement[] = [
  {
    id: "1",
    date: "2025-04-02",
    semester: "Spring 2025",
    department: "ฝ่ายบริหาร",
    title: "คำแถลงแสดงความเสียใจต่อเหตุการณ์ไฟป่าในพื้นที่ภาคตะวันออกเฉียงใต้...",
    views: 1250,
  },
];

const semesters = ["All", "Spring 2025", "Fall 2024", "Spring 2024"];
const departments = ["TSAK", "ฝ่ายบริหาร", "ฝ่ายเอกสาร", "ฝ่ายบัญชีและการเงิน", "ฝ่ายประสานงาน", "ฝ่ายประชาสัมพันธ์", "ฝ่ายเทคโนโลยีสารสนเทศ","ฝ่ายกิจกรรม"];
// ภาษาอังกฤ​ษ​ departments = ["TSAK", "Executive Board", "Documentation", "Accounting", "Liaison", "Public Relations", "IT","Events"];
const ITEMS_PER_PAGE = 10;

export default function AnnouncementPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const [locale, setLocale] = useState<Locale>("th");
  const t = content[locale];

  // Filter states
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"date" | "views">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Resolve locale from params
  useEffect(() => {
    params.then((p) => setLocale(p.locale || "th"));
  }, [params]);

  // Filter and sort announcements
  const filteredAnnouncements = useMemo(() => {
    let filtered = announcements.filter((item) => {
      if (dateFrom && new Date(item.date) < new Date(dateFrom)) return false;
      if (dateTo && new Date(item.date) > new Date(dateTo)) return false;
      if (selectedSemester !== "All" && item.semester !== selectedSemester) return false;
      if (selectedDepartment !== "All" && item.department !== selectedDepartment) return false;
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      } else {
        return sortOrder === "desc" ? b.views - a.views : a.views - b.views;
      }
    });

    return filtered;
  }, [dateFrom, dateTo, selectedSemester, selectedDepartment, searchQuery, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAnnouncements.length / ITEMS_PER_PAGE);
  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-6 py-30">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          {t.title}
        </h1>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* First row: Date, Semester, Department */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Date From */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">{t.filters.date}</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#A51D2C] w-[150px]"
              />
            </div>

            {/* Date To */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">{t.filters.to}</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#A51D2C] w-[150px]"
              />
            </div>

            {/* Semester */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">{t.filters.semester}</label>
              <select
                value={selectedSemester}
                onChange={(e) => {
                  setSelectedSemester(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#A51D2C] bg-white"
              >
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem === "All" ? t.filters.all : sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">{t.filters.department}</label>
              <select
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#A51D2C] bg-white min-w-[150px]"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "All" ? t.filters.all : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Second row: Search */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">{t.filters.search}</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 max-w-2xl px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#A51D2C]"
            />
          </div>

          {/* Third row: Sorting */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-gray-500" />
              <label className="text-sm text-gray-600">
                {locale === "th" ? "เรียงตาม" : "Sort by"}
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as "date" | "views");
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#A51D2C] bg-white"
              >
                <option value="date">{locale === "th" ? "วันที่" : "Date"}</option>
                <option value="views">{locale === "th" ? "ยอดเข้าชม" : "Views"}</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value as "asc" | "desc");
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#A51D2C] bg-white"
              >
                <option value="desc">{locale === "th" ? "มากไปน้อย" : "Descending"}</option>
                <option value="asc">{locale === "th" ? "น้อยไปมาก" : "Ascending"}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#A51D2C] text-white">
                <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-3xl w-[100px]">
                  {t.table.headers[0]}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium w-[110px]">
                  {t.table.headers[1]}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium w-[120px]">
                  {t.table.headers[2]}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  {t.table.headers[3]}
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium rounded-tr-3xl w-[80px]">
                  <Eye className="w-4 h-4 mx-auto" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedAnnouncements.length > 0 ? (
                paginatedAnnouncements.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {item.semester}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {item.department}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <Link
                        href={`/${locale}/announcement/${item.id}`}
                        className="text-gray-700 hover:text-[#A51D2C] hover:underline transition-colors"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 text-center">
                      <span className="flex items-center justify-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.views.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    {t.table.noResults}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-500 hover:text-[#A51D2C] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#A51D2C] text-white"
                    : "text-gray-600 hover:text-[#A51D2C]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-500 hover:text-[#A51D2C] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}