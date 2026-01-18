"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EventsHeader from "../components/EventsHeader";
import Image from "next/image";
import { fetchEventById, EventData } from "@/lib/api/events";
import { getDictionary } from "@/lib/i18n";

export default function EventPage() {
  const params = useParams<{ locale: string; eventId: string }>();
  const locale = params?.locale || 'en';
  const eventId = params?.eventId;
  const dict = getDictionary(locale);
  
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch event from Django API
  useEffect(() => {
    async function loadEvent() {
      if (!eventId) {
        setError(dict.events.notFound);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchEventById(eventId);
        setEvent(data);
      } catch (err) {
        console.error(err);
        if (err instanceof Error && err.message === "Event not found") {
          setError(dict.events.notFound);
        } else {
          setError(dict.events.errorEvent);
        }
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [eventId, dict.events]);

  if (loading) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <p className="text-xl">{dict.events.loadingEvent}</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-4xl sm:text-5xl font-bold text-center sm:text-left">
            {error || dict.events.notFound}
          </h1>
        </div>
      </div>
    );
  }

  // Get title based on locale: use titleEn for English, title for Thai and other locales
  const getDisplayTitle = () => {
    if (locale === 'en') {
      // For English, prefer titleEn, fallback to title
      return event.titleEn || event.title;
    } else {
      // For Thai and other locales, use title (which should be in that language)
      return event.title;
    }
  };
  
  // Get subtitle based on locale: use subtitleEn for English, subtitle for Thai and other locales
  const getDisplaySubtitle = () => {
    if (locale === 'en') {
      // For English, prefer subtitleEn, fallback to subtitle, then title
      return event.subtitleEn || event.subtitle || getDisplayTitle();
    } else {
      // For Thai and other locales, use subtitle, fallback to title
      return event.subtitle || getDisplayTitle();
    }
  };
  
  // Get description based on locale: use descriptionEn for English, description for Thai and other locales
  const getDisplayDescription = () => {
    if (locale === 'en') {
      // For English, prefer descriptionEn, fallback to description
      return event.descriptionEn || event.description;
    } else {
      // For Thai and other locales, use description
      return event.description;
    }
  };
  
  const displayTitle = getDisplayTitle();
  const displaySubtitle = getDisplaySubtitle();
  const displayDescription = getDisplayDescription();

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-[32px] row-start-2 items-center pt-24">
        {/* Event Header */}
        <EventsHeader />

        {/* Event Subtitle */}
        <h2 className="text-2xl sm:text-3xl font-medium text-center">
          {displaySubtitle}
        </h2>

        {/* Event Image */}
        <div className="w-full max-w-4xl">
          {event.imageUrl && event.imageUrl.trim() ? (
            <div className="relative w-full aspect-[4/3] bg-[#f3f4f6] rounded-lg overflow-hidden">
              <Image
                src={event.imageUrl}
                alt={displayTitle}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-[4/3] bg-[#f3f4f6] rounded-lg" />
          )}
          
          {/* Registration Button - Only show if event is open and has registration URL */}
          {event.status === 'open' && event.registrationUrl && (
            <div className="flex justify-center mt-6">
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-8 bg-[#2C3985] text-[#FFFCDD] rounded-full text-lg font-medium hover:bg-[#1e2a6b] transition-colors inline-block"
              >
                {dict.events.register}
              </a>
            </div>
          )}
        </div>

        {/* Sponsors Section */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-medium text-left mb-8">
            {dict.events.sponsors}
          </h2>
          {event.sponsors && event.sponsors.length > 0 && (
            <div className="flex flex-wrap gap-6 items-center">
              {event.sponsors
                .filter((sponsor) => sponsor.logoUrl && sponsor.logoUrl.trim())
                .map((sponsor, index) => (
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
            {dict.events.details}
          </h2>
          {displayDescription && (
            <p className="text-lg text-left whitespace-pre-line">
              {displayDescription}
            </p>
          )}
        </div>

        {/* Event Photos Section */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-medium text-left mb-8">
            {dict.events.photos}
          </h2>
          {event.imageDir && event.imageDir.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.imageDir
                .filter((imageUrl) => imageUrl && imageUrl.trim())
                .map((imageUrl, index) => (
                  <div key={index} className="relative w-full aspect-square bg-[#f3f4f6] rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={`${displayTitle} - Image ${index + 1}`}
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
      </div>
    </div>
  );
}