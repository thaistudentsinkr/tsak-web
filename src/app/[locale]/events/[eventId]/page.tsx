import { events } from "../event_data/events";
import EventsHeader from "../components/EventsHeader";
import Image from "next/image";

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
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center pt-24">
        {/* Event Header */}
        <EventsHeader />

        {/* Event Subtitle */}
        <h2 className="text-2xl sm:text-3xl font-medium text-center">
          {event.subtitle || event.title}
        </h2>

        {/* Event Image */}
        <div className="w-full max-w-4xl">
          {event.imageUrl ? (
            <div className="relative w-full aspect-[4/3] bg-[#f3f4f6] rounded-lg overflow-hidden">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-[4/3] bg-[#f3f4f6] rounded-lg" />
          )}
          
          {/* Registration Button - Only show if event is open */}
          {event.status === 'open' && (
            <div className="flex justify-center mt-6">
              <button className="py-4 px-8 bg-[#2C3985] text-[#FFFCDD] rounded-full text-lg font-medium hover:bg-[#1e2a6b] transition-colors">
                ลงทะเบียนเข้าร่วมงาน
              </button>
            </div>
          )}
        </div>

        {/* Sponsors Section */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-medium text-left mb-8">
            ผู้สนับสนุน
          </h2>
          {event.sponsors && event.sponsors.length > 0 && (
            <div className="flex flex-wrap gap-6 items-center">
              {event.sponsors.map((sponsor, index) => (
                <div key={index} className="relative w-32 h-32 sm:w-40 sm:h-40">
                  <Image
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Event Details Section */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-medium text-left mb-8">
            รายละเอียดกิจกรรม
          </h2>
          {event.description && (
            <p className="text-lg text-left whitespace-pre-line">
              {event.description}
            </p>
          )}
        </div>

        {/* Event Photos Section */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-medium text-left mb-8">
            ภาพกิจกรรม
          </h2>
          {event.imageDir && event.imageDir.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.imageDir.map((imageUrl, index) => (
                <div key={index} className="relative w-full aspect-square bg-[#f3f4f6] rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`${event.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Event Detail Content */}
        {/* <div className="w-full max-w-4xl">
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
        </div> */}
      </main>
    </div>
  );
}