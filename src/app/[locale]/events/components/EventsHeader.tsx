"use client";

import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import styles from "./EventsHeader.module.css";

export default function EventsHeader() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const dict = getDictionary(locale);

  return (
    <div className={`font-sans ${styles.headerContainer}`}>
      <div className={styles.headerRow}>
        <h1 className={styles.headerTitle}>{dict.events.title}</h1>
        <img
          src="/events/calendar_icon.png"
          alt="Calendar Icon"
          className={styles.calendarIcon}
        />
      </div>

      {/* Updated: Button now includes calendarCircle as an inline element */}
      <button className={styles.calendarButton}>
        <span className={styles.buttonText}>{dict.events.viewAsCalendar}</span>
        <div className={styles.calendarCircle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 26 26" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.8327 13.0003C23.8327 18.9836 18.9826 23.8337 12.9993 23.8337C7.0161 23.8337 2.16602 18.9836 2.16602 13.0003C2.16602 7.01708 7.0161 2.16699 12.9993 2.16699C18.9826 2.16699 23.8327 7.01708 23.8327 13.0003ZM9.43193 10.6094C9.22761 10.4121 8.95396 10.3029 8.66992 10.3053C8.38587 10.3078 8.11415 10.4217 7.9133 10.6226C7.71244 10.8235 7.5985 11.0952 7.59604 11.3792C7.59357 11.6633 7.70276 11.9369 7.9001 12.1412L12.2334 16.4746C12.4366 16.6777 12.7121 16.7918 12.9993 16.7918C13.2866 16.7918 13.5621 16.6777 13.7653 16.4746L18.0986 12.1412C18.2959 11.9369 18.4051 11.6633 18.4027 11.3792C18.4002 11.0952 18.2863 10.8235 18.0854 10.6226C17.8845 10.4217 17.6128 10.3078 17.3288 10.3053C17.0447 10.3029 16.7711 10.4121 16.5668 10.6094L12.9993 14.1768L9.43193 10.6094Z" fill="#FFFCDD"/>
          </svg>
        </div>
      </button>
    </div>
  );
}