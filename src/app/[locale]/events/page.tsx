"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EventCard from "./components/EventCard";
import EventsHeader from "./components/EventsHeader";
import { fetchEvents, EventData } from "@/lib/api/events";
import { getDictionary } from "@/lib/i18n";

export default function EventPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const dict = getDictionary(locale);
  
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="font-sans min-h-screen p-[clamp(1rem,4vw,5rem)] pb-[clamp(3rem,8vw,5rem)] flex items-center justify-center">
        <p className="text-xl">{dict.events.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans min-h-screen p-[clamp(1rem,4vw,5rem)] pb-[clamp(3rem,8vw,5rem)] flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen p-[clamp(1rem,4vw,5rem)] pb-[clamp(3rem,8vw,5rem)]">
      <main className="flex flex-col gap-[clamp(1.5rem,4vw,2rem)] items-center pt-[clamp(4rem,8vw,6rem)] relative z-0">
        {/* Event Header */}
        <EventsHeader />

        {/* Events Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full max-w-[90rem] mx-auto justify-items-center"
          style={{ columnGap: 'clamp(1rem,3vw,1.5rem)', rowGap: '92px' }}
        >
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 mt-10 text-lg">
              {dict.events.empty}
            </div>
          )}
          {/* Placeholder cards for empty slots
          <div className="bg-gray-100 rounded-lg border border-gray-200 h-80 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-sm">More events coming soon</p>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}
