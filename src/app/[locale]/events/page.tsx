"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import EventCard from "./components/EventCard";
import EventsHeader from "./components/EventsHeader";
import { fetchEvents, EventData } from "@/lib/api/events";
import { getDictionary } from "@/lib/i18n";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const STATUS_OPTIONS = ["all", "open", "closed", "ended"] as const;
type StatusFilter = (typeof STATUS_OPTIONS)[number];

export default function EventPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const dict = getDictionary(locale);
  
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter, Search, Pagination states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch events from Django API
  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError(dict.events.error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [dict.events.error]);

  // Filter and search logic
  const filteredEvents = useMemo(() => {
    let result = events;

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((event) => event.status === statusFilter);
    }

    // Search by title
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((event) => {
        const title = locale === 'en' ? (event.titleEn || event.title) : event.title;
        return title.toLowerCase().includes(query);
      });
    }

    return result;
  }, [events, statusFilter, searchQuery, locale]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  // Get status label
  const getStatusLabel = (status: StatusFilter) => {
    if (status === "all") {
      return locale === "th" ? "ทั้งหมด" : "All";
    }
    return dict.events.status[status as keyof typeof dict.events.status] || status;
  };

  if (loading) {
    return (
      <div className="font-sans min-h-screen p-4 sm:p-8 lg:p-20 flex items-center justify-center">
        <p className="text-xl">{dict.events.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans min-h-screen p-4 sm:p-8 lg:p-20 flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen p-4 sm:p-8 lg:p-20">
      <main className="flex flex-col gap-6 sm:gap-8 items-center pt-16 sm:pt-20 lg:pt-24 relative z-0">
        {/* Event Header */}
        <EventsHeader />

        {/* Search and Filter Bar */}
        <div className="w-full max-w-[50rem] flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-auto sm:min-w-[600px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={locale === "th" ? "ค้นหากิจกรรม..." : "Search events..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#2C3985] focus:ring-2 focus:ring-[#2C3985]/20 transition-all"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full sm:w-auto flex items-center justify-between gap-3 px-5 py-3 bg-[#2C3985] text-[#FFFCDD] rounded-full font-medium transition-all hover:bg-[#1F2A6B]"
            >
              <span>{locale === "th" ? "สถานะ:" : "Status:"} {getStatusLabel(statusFilter)}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full right-0 mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-all border-b border-gray-100 last:border-b-0
                      ${statusFilter === status
                        ? "bg-[#A51D2C] text-[#FFFCDD]"
                        : "bg-white text-[#2C3985] hover:bg-[#2C3985]/10"
                      }`}
                  >
                    {getStatusLabel(status)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="w-full max-w-[50rem] text-sm text-gray-500">
          {locale === "th" 
            ? `แสดง ${paginatedEvents.length} จาก ${filteredEvents.length} กิจกรรม`
            : `Showing ${paginatedEvents.length} of ${filteredEvents.length} events`
          }
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-x-6 lg:gap-y-[92px] w-full max-w-[80rem]">
          {paginatedEvents.length > 0 ? (
            paginatedEvents.map((event) => (
              <div key={event.id} className="flex justify-center">
                <EventCard event={event} locale={locale} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 mt-10 text-lg">
              {searchQuery || statusFilter !== "all"
                ? (locale === "th" ? "ไม่พบกิจกรรมที่ตรงกับการค้นหา" : "No events match your search")
                : dict.events.empty
              }
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2 mt-8">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full transition-all ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#2C3985] hover:bg-[#2C3985]/10"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first, last, current, and adjacent pages
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1;

                // Show ellipsis
                const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                if (showEllipsisBefore || showEllipsisAfter) {
                  return (
                    <span key={page} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }

                if (!showPage) return null;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full font-medium transition-all ${
                      currentPage === page
                        ? "bg-[#2C3985] text-[#FFFCDD]"
                        : "text-[#2C3985] hover:bg-[#2C3985]/10"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full transition-all ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#2C3985] hover:bg-[#2C3985]/10"
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}