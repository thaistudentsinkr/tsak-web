import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { SponsorCard } from "../../../components/ui/sponsorCard";
import { NetworkCard } from "../../../components/ui/networkCard";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type NetworkItem = {
  type: "network";
  id: string;
  name: string;
  name_en: string;
  logo: string;
};

type SponsorItem = {
  type: "sponsor";
  id: string;
  name: string;
  name_en: string;
  logo: string;
};

type CTAItem = {
  type: "cta";
  id: "cta";
};

type GridItem = NetworkItem | SponsorItem | CTAItem;

function NetworkCTA({ href, title, subtitle, }: { href: string; title: string; subtitle: string; }) {
  return (
    <Link
      href={href}
      className="
        flex flex-col items-center justify-center
        gap-3 p-10 h-full text-center
        bg-gray-50 text-gray-700
        hover:bg-gray-100 transition
      "
    >
      <div className="text-5xl font-light text-gray-400">+</div>

      <span className="text-xl font-semibold text-gray-800">
        {title}
      </span>

      <span className="text-sm text-gray-500">
        {subtitle}
      </span>
    </Link>
  );
}

async function getSponsors() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  try {
    const response = await fetch(`${BACKEND_URL}/api/sponsors/`, {
      cache: 'no-store', // or 'force-cache' for caching
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sponsors: ${response.status}`);
    }

    const data = await response.json();

    // Transform logo URLs to include full backend URL
    const transformSponsors = (sponsors: any[]) =>
      sponsors.map(sponsor => ({
        ...sponsor,
        logo: sponsor.logo.startsWith('http')
          ? sponsor.logo
          : `${BACKEND_URL}${sponsor.logo}`
      }));

    return {
      embassies: transformSponsors(data.embassies || []),
      partners: transformSponsors(data.partners || []),
      sponsors: transformSponsors(data.sponsors || []),
      networks: transformSponsors(data.networks || []),
    };
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    // Return empty data structure as fallback
    return {
      embassies: [],
      partners: [],
      sponsors: [],
      networks: [],
    };
  }
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const sponsorsData = await getSponsors();
  const isEnglish = locale === 'en';

  // Helper function to get the appropriate name based on locale
  const getName = (item: any) => {
    return isEnglish && item.name_en ? item.name_en : item.name;
  };

  // Helper function to get the appropriate description based on locale
  const getDescription = (item: any) => {
    return isEnglish && item.description_en ? item.description_en : item.description;
  };

  const sponsorGridItems: GridItem[] = [
    ...sponsorsData.sponsors.map((s) => ({
      ...s,
      type: "sponsor" as const,
    })),
    { id: "cta-sponsor", type: "cta" as const },
  ];

  const networkGridItems: GridItem[] = [
    ...sponsorsData.networks.map((n) => ({
      ...n,
      type: "network" as const,
    })),
    { id: "cta-network", type: "cta" as const },
  ];

  return (
    <div className="min-h-screen p-8 sm:p-30">
      <main className="mx-auto max-w-5xl flex flex-col gap-16">

        <h1 className="text-3xl font-bold text-center">
          {dict.sponsors.title}
        </h1>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">
            {dict.sponsors.support}
          </h2>

          {sponsorsData.embassies.map((e) => (
            <SponsorCard
              key={e.id}
              logo={e.logo}
              name={getName(e)}
              description={getDescription(e)}
            />
          ))}
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">
            {dict.sponsors.partner}
          </h2>

          {sponsorsData.partners.map((p) => (
            <SponsorCard
              key={p.id}
              logo={p.logo}
              name={getName(p)}
              description={getDescription(p)}
            />
          ))}
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">
            {dict.sponsors.sponsors}
          </h2>

          <div className="border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3">
              {sponsorGridItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    border-gray-200
                    border-b
                    sm:border-r
                    sm:[&:nth-child(3n)]:border-r-0
                  "
                >
                  {item.type === "cta" ? (
                    <NetworkCTA
                      href={`/${locale}/contact`}
                      title={dict.sponsors.ctaTitle}
                      subtitle={dict.sponsors.ctaSubtitle}
                    />
                  ) : (
                    <NetworkCard
                      logo={item.logo}
                      name={getName(item)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">
            {dict.sponsors.network}
          </h2>

          <div className="border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3">
              {networkGridItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    border-gray-200
                    border-b
                    sm:border-r
                    sm:[&:nth-child(3n)]:border-r-0
                  "
                >
                  {item.type === "cta" ? (
                    <NetworkCTA
                      href={`/${locale}/contact`}
                      title={dict.sponsors.ctaTitle}
                      subtitle={dict.sponsors.ctaSubtitle}
                    />
                  ) : (
                    <NetworkCard
                      logo={item.logo}
                      name={getName(item)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}