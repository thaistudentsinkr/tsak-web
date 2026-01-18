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
  const locale = params?.locale || "en";
  const dict = getDictionary(locale);

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- Fetch Events ---------------- */
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
  }, [locale]);

  /* ---------------- Close dropdown on resize ---------------- */
  useEffect(() => {
    const handleResize = () => setIsFilterOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredEvents = useMemo(() => {
    let result = events;

    if (statusFilter !== "all") {
      result = result.filter((event) => event.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((event) => {
        const title =
          locale === "en" ? event.titleEn || event.title : event.title;
        return title.toLowerCase().includes(query);
      });
    }

    return result;
  }, [events, statusFilter, searchQuery, locale]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const getStatusLabel = (status: StatusFilter) => {
    if (status === "all") {
      return locale === "th" ? "ทั้งหมด" : "All";
    }
    return (
      dict.events.status[
        status as keyof typeof dict.events.status
      ] || status
    );
  };

  if (loading) {
    return (
      <div className="font-sans min-h-screen p-[clamp(1rem,4vw,5rem)] flex items-center justify-center">
        <p className="text-xl">{dict.events.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans min-h-screen p-[clamp(1rem,4vw,5rem)] flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen p-[clamp(1rem,4vw,5rem)] pb-[clamp(3rem,8vw,5rem)]">
      <main className="flex flex-col gap-[clamp(1.5rem,4vw,2rem)] items-center pt-[clamp(4rem,8vw,6rem)]">

        <EventsHeader />

        {/* Search & Filter */}
        <div className="w-full max-w-[30rem] flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full sm:min-w-[24rem] lg:min-w-[600px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={locale === "th" ? "ค้นหากิจกรรม..." : "Search events..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#2C3985] focus:ring-2 focus:ring-[#2C3985]/20"
            />
          </div>

          {/* Status Filter */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsFilterOpen((v) => !v)}
              className="
                w-full sm:w-auto
                flex items-center justify-between gap-3
                px-5 py-4
                bg-[#2C3985] text-[#FFFCDD]
                rounded-full font-medium
                hover:bg-[#1F2A6B]
              "
            >
              <span>
                {getStatusLabel(statusFilter)}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isFilterOpen && (
              <div
                className="
                  absolute top-full mt-2
                  w-full sm:w-48
                  left-0 sm:right-0 sm:left-auto
                  bg-white border rounded-2xl shadow-lg z-50
                "
              >
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm font-medium transition-all
                      ${
                        statusFilter === status
                          ? "bg-[#A51D2C] text-[#FFFCDD]"
                          : "text-[#2C3985] hover:bg-[#2C3985]/10"
                      }`}
                  >
                    {getStatusLabel(status)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <br></br>
        {/* Events Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full max-w-[90rem] mx-auto justify-items-center"
          style={{ columnGap: "clamp(1rem,3vw,1.5rem)", rowGap: "92px" }}
        >
          {paginatedEvents.length > 0 ? (
            paginatedEvents.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 mt-10 text-lg">
              {dict.events.empty}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 disabled:text-gray-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full font-medium ${
                  currentPage === page
                    ? "bg-[#2C3985] text-[#FFFCDD]"
                    : "text-[#2C3985] hover:bg-[#2C3985]/10"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 disabled:text-gray-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
