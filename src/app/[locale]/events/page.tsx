import Image from "next/image";
import EventCard from "./components/EventCard";
import EventsHeader from "./components/EventsHeader";
import { events } from "./event_data/events";

export default function EventPage() {
  return (
    <div className="min-h-screen p-[clamp(1rem,4vw,5rem)] pb-[clamp(3rem,8vw,5rem)]">
      <main className="flex flex-col gap-[clamp(1.5rem,4vw,2rem)] items-center pt-[clamp(4rem,8vw,6rem)] relative z-0">
        {/* Event Header */}
        <EventsHeader />

        {/* Events Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full max-w-[90rem]"
          style={{ columnGap: 'clamp(1rem,3vw,1.5rem)', rowGap: '92px' }}
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} locale={typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || 'en' : 'en'} />
          ))}
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
