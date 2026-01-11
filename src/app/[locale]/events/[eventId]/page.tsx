import { events } from "../event_data/events";
import EventsHeader from "../components/EventsHeader";

export default async function EventPage({
  params,
}: Readonly<{
  params: Promise<{ eventId: string }>;
}>) {
  const eventId = (await params).eventId;
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-4xl sm:text-5xl font-bold text-center sm:text-left">
            Event Not Found
          </h1>
          <p className="text-lg text-center sm:text-left max-w-2xl">
            The event with ID {eventId} could not be found.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center pt-24">
        {/* Event Header */}
        <EventsHeader />

        {/* Event Detail Content */}
        <div className="w-full max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            {event.title}
          </h2>
          {event.titleEn && (
            <h3 className="text-2xl text-gray-600 text-center mb-8">{event.titleEn}</h3>
          )}
          <div className="text-lg text-center max-w-2xl mx-auto space-y-4">
            <p><strong>Event ID:</strong> {event.id}</p>
            <p><strong>Date:</strong> {event.date}</p>
            {event.location && <p><strong>Location:</strong> {event.location}</p>}
            {event.organizer && <p><strong>Organizer:</strong> {event.organizer}</p>}
            <p><strong>Status:</strong> {event.statusText}</p>
            {event.description && <p><strong>Description:</strong> {event.description}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}