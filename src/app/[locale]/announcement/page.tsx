"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, ArrowUpDown } from "lucide-react";
import enContent from "@/locales/announcement/en.json";
import thContent from "@/locales/announcement/th.json";

type Locale = "en" | "th";

type Semester = {
  code: string;
  display_name: string;
};

type Announcement = {
  id: string;
  date: string;
  semester: Semester;
  department: string;
  title: string;
  views: number;
};


const content = {
  en: enContent,
  th: thContent,
};

// API Configuration
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const departments = ["All", "tsak", "executive", "documentation", "accounting", "liaison", "pr", "it", "events"];
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
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"date" | "views">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Data states
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  // Resolve locale from params
  useEffect(() => {
    params.then((p) => setLocale(p.locale || "th"));
  }, [params]);

  // Fetch announcements from Django backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const queryParams = new URLSearchParams({
          locale: locale,
          page: currentPage.toString(),
        });

        if (dateFrom) queryParams.append('date_from', dateFrom);
        if (dateTo) queryParams.append('date_to', dateTo);
        if (selectedSemester !== 'All') queryParams.append('semester', selectedSemester);
        if (selectedDepartment !== 'All') queryParams.append('department', selectedDepartment);
        if (searchQuery) queryParams.append('search', searchQuery);
        queryParams.append('sort_by', sortBy);
        queryParams.append('sort_order', sortOrder);

        const response = await fetch(`${API_BASE}/api/announcements/?${queryParams}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }

        const data = await response.json();
        
        // Handle paginated response
        if (data.results) {
          setAnnouncements(data.results);
          setTotalCount(data.count || 0);
        } else {
          // Handle non-paginated response
          setAnnouncements(data);
          setTotalCount(data.length);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [locale, currentPage, dateFrom, dateTo, selectedSemester, selectedDepartment, searchQuery, sortBy, sortOrder]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/announcements/filters/?locale=${locale}`
        );
        if (!res.ok) throw new Error("Failed to fetch semesters");

        const data = await res.json();
        setSemesters(data.semesters);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSemesters();
  }, [locale]);

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${date.getFullYear()}`;
  };

  const getDepartmentDisplay = (dept: string) => {
    const deptMap: Record<Locale, Record<string, string>> = {
      th: {
        tsak: 'TSAK',
        executive: 'ฝ่ายบริหาร',
        documentation: 'ฝ่ายเอกสาร',
        accounting: 'ฝ่ายบัญชีและการเงิน',
        liaison: 'ฝ่ายประสานงาน',
        pr: 'ฝ่ายประชาสัมพันธ์',
        it: 'ฝ่ายเทคโนโลยีสารสนเทศ',
        events: 'ฝ่ายกิจกรรม',
      },
      en: {
        tsak: 'TSAK',
        executive: 'Executive Board',
        documentation: 'Documentation',
        accounting: 'Accounting',
        liaison: 'Liaison',
        pr: 'Public Relationas',
        it: 'IT Support',
        events: 'Events',
      },
    };

    return deptMap[locale][dept] || dept;
  };


  const getSemesterDisplay = (sem: string) => {
    const semMap: Record<string, string> = {
      'spring_2025': 'Spring 2025',
      'fall_2024': 'Fall 2024',
      'spring_2024': 'Spring 2024',
    };
    return semMap[sem] || sem;
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
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#A51D2C] bg-white min-w-[150px]"
              >
                {semesters.map((sem) => (
                  <option key={sem.code} value={sem.code}>
                    {sem.code === "All" ? t.filters.all : sem.display_name}
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
                    {dept === "All" ? t.filters.all : getDepartmentDisplay(dept)}
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A51D2C]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {locale === "th" ? "เกิดข้อผิดพลาด: " : "Error: "}{error}
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
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
                {announcements.length > 0 ? (
                  announcements.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {item.semester.display_name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {getDepartmentDisplay(item.department)}
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
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
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