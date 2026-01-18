"use client";

import Image from "next/image";
import Link from "next/link";
import { EventData } from "@/lib/api/events";
import { getDictionary } from "@/lib/i18n";
import styles from "./EventCard.module.css";

interface EventCardProps {
  event: EventData;
  locale: string;
}

export default function EventCard({ event, locale }: EventCardProps) {
  const dict = getDictionary(locale);
  const eventDetailUrl = `/${locale}/events/${event.id}`;

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
  
  const displayTitle = getDisplayTitle();
  
  // Get translated status text
  const statusText = dict.events.status[event.status as keyof typeof dict.events.status] || event.statusText;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ended':
        return 'bg-[#8d8d8d] text-white';
      case 'closed':
        return 'bg-[#a51d2c] text-white';
      case 'open':
        return 'bg-[#c3fc6e] text-black';
      default:
        return 'bg-[#8d8d8d] text-white';
    }
  };

  return (
    <div className={`font-sans ${styles.eventCard}`}>
      {/* White Rectangle - Contains Image */}
      <div className={styles.whiteRectangle}>
        {/* Event Image - Clickable to navigate to event detail */}
        <Link href={eventDetailUrl} className="block">
          <div className={styles.eventImage}>
            {event.imageUrl && event.imageUrl.trim() ? (
              <Image
                src={event.imageUrl}
                alt={displayTitle}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#f3f4f6]" />
            )}
          </div>
        </Link>
        
        {/* Organization logo in circular cutout */}
        <div className={styles.organizationLogo}>
          <Image
            src="/tsak.png"
            alt="TSAK Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Light Blue Rectangle - Event Details */}
      <Link href={eventDetailUrl} className="block">
        <div className={styles.eventDetailBox}>
          {/* Event Title */}
          <h3 className={styles.eventTitle}>
            {displayTitle}
          </h3>
          
          {/* Date and Status Row */}
          <div className="flex items-center justify-between">
            <p className={styles.eventDate}>
              <span className="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="inline-block align-middle">
                  <path d="M10 11.7948C9.82782 11.7948 9.67782 11.7309 9.55004 11.6031C9.42226 11.4753 9.35837 11.3253 9.35837 11.1531C9.35837 10.9809 9.42226 10.8312 9.55004 10.7039C9.67782 10.5767 9.82782 10.5128 10 10.5123C10.1723 10.5117 10.3223 10.5756 10.45 10.7039C10.5778 10.8323 10.6417 10.9823 10.6417 11.1539C10.6417 11.3256 10.5778 11.4753 10.45 11.6031C10.3223 11.7309 10.1723 11.7948 10 11.7948ZM6.66671 11.7948C6.49449 11.7948 6.34449 11.7309 6.21671 11.6031C6.08893 11.4753 6.02504 11.3253 6.02504 11.1531C6.02504 10.9809 6.08893 10.8312 6.21671 10.7039C6.34449 10.5767 6.49449 10.5128 6.66671 10.5123C6.83893 10.5117 6.98893 10.5756 7.11671 10.7039C7.24448 10.8323 7.30837 10.9823 7.30837 11.1539C7.30837 11.3256 7.24448 11.4753 7.11671 11.6031C6.98893 11.7309 6.83893 11.7948 6.66671 11.7948ZM13.3334 11.7948C13.1612 11.7948 13.0112 11.7309 12.8834 11.6031C12.7556 11.4753 12.6917 11.3253 12.6917 11.1531C12.6917 10.9809 12.7556 10.8312 12.8834 10.7039C13.0112 10.5767 13.1612 10.5128 13.3334 10.5123C13.5056 10.5117 13.6556 10.5756 13.7834 10.7039C13.9112 10.8323 13.975 10.9823 13.975 11.1539C13.975 11.3256 13.9112 11.4753 13.7834 11.6031C13.6556 11.7309 13.5056 11.7948 13.3334 11.7948ZM10 14.9998C9.82782 14.9998 9.67782 14.9359 9.55004 14.8081C9.42226 14.6803 9.35837 14.5303 9.35837 14.3581C9.35837 14.1859 9.42226 14.0362 9.55004 13.9089C9.67782 13.7817 9.82782 13.7178 10 13.7173C10.1723 13.7167 10.3223 13.7806 10.45 13.9089C10.5778 14.0373 10.6417 14.1873 10.6417 14.3589C10.6417 14.5306 10.5778 14.6806 10.45 14.8089C10.3223 14.9373 10.1723 15.0009 10 14.9998ZM6.66671 14.9998C6.49449 14.9998 6.34449 14.9359 6.21671 14.8081C6.08893 14.6803 6.02504 14.5303 6.02504 14.3581C6.02504 14.1859 6.08893 14.0362 6.21671 13.9089C6.34449 13.7817 6.49449 13.7178 6.66671 13.7173C6.83893 13.7167 6.98893 13.7806 7.11671 13.9089C7.24448 14.0373 7.30837 14.1873 7.30837 14.3589C7.30837 14.5306 7.24448 14.6806 7.11671 14.8089C6.98893 14.9373 6.83893 15.0009 6.66671 14.9998ZM13.3334 14.9998C13.1612 14.9998 13.0112 14.9359 12.8834 14.8081C12.7556 14.6803 12.6917 14.5303 12.6917 14.3581C12.6917 14.1859 12.7556 14.0362 12.8834 13.9089C13.0112 13.7817 13.1612 13.7178 13.3334 13.7173C13.5056 13.7167 13.6556 13.7806 13.7834 13.9089C13.9112 14.0373 13.975 14.1873 13.975 14.3589C13.975 14.5306 13.9112 14.6806 13.7834 14.8089C13.6556 14.9373 13.5056 15.0009 13.3334 14.9998ZM4.68004 17.4998C4.29615 17.4998 3.97587 17.3714 3.71921 17.1148C3.46254 16.8581 3.33393 16.5378 3.33337 16.1539V5.51227C3.33337 5.12894 3.46198 4.80894 3.71921 4.55227C3.97643 4.29561 4.29671 4.16699 4.68004 4.16644H6.15421V2.30811H7.05171V4.16644H13.0134V2.30811H13.8467V4.16644H15.3209C15.7042 4.16644 16.0245 4.29505 16.2817 4.55227C16.5389 4.80949 16.6673 5.12977 16.6667 5.51311V16.1539C16.6667 16.5373 16.5384 16.8576 16.2817 17.1148C16.025 17.372 15.7045 17.5003 15.32 17.4998H4.68004ZM4.68004 16.6664H15.3209C15.4487 16.6664 15.5662 16.6131 15.6734 16.5064C15.7806 16.3998 15.8339 16.282 15.8334 16.1531V8.84644H4.16671V16.1539C4.16671 16.2817 4.22004 16.3992 4.32671 16.5064C4.43337 16.6137 4.55087 16.667 4.67921 16.6664" fill="#FFFCDD"/>
                </svg>
                <span>{event.date}</span>
              </span>
            </p>
            <div className={`${getStatusColor(event.status)} ${styles.eventStatus}`}>
              {statusText}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
