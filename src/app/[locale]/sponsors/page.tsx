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
  logo: string;
};

type CTAItem = {
  type: "cta";
  id: "cta";
};

type GridItem = NetworkItem | CTAItem;

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

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  //use fake data for now; use const sponsors = await getSponsors(); after have backend
  const sponsors = {
    embassies: [
      {
        id: "thai-embassy-seoul",
        name: "Royal Thai Embassy, Seoul",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png",
        description: "สถานเอกอัครราชทูต ณ กรุงโซล ได้ให้การสนับสนุนสมาคมนักเรียนไทยในสาธารณรัฐเกาหลีอย่างต่อเนื่อง ทั้งในระยะเริ่มต้นของการรวมตัวจัดตั้งสมาคมและในการดำเนินการจัดกิจกรรมต่าง ๆ โดยมีเป้าหมายร่วมกันให้สมาคมฯ ทำหน้าที่เป็นศูนย์กลางประสานงานดูแลนักเรียนไทยในสาธารณรัฐเกาหลี เพื่อเสริมสร้างเครือข่ายและกระชับความสัมพันธ์ในหมู่นักเรียนไทยให้แน่นแฟ้นมากยิ่งขึ้น"
      }
    ],
    partners: [
      {
        id: "partner-abc",
        name: "ABC Corporation",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png",
        description: "ASEAN Youth Network in Korea (AYNK) คือ ชุมชนอาสาสมัครของนักศึกษาในสาธารณรัฐเกาหลีจากประเทศอาเซียน ในเดือนเมษายน 2568 สมาคมนักเรียนไทยในสาธารณรัฐเกาหลี พร้อมด้วยสมาคมนักศึกษาจากประเทศสมาชิกอาเซียนอื่นๆ ในเกาหลี ได้ลงนามบันทึกความเข้าใจ (MOU) เพื่อสนับสนุนวัตถุประสงค์หลักของ AYNK ในการมุ่งมั่นส่งเสริมการแลกเปลี่ยนเยาวชน การสร้างเครือข่าย และความร่วมมือระหว่างอาเซียนกับเกาหลี เพื่อเสริมสร้างความสัมพันธ์อาเซียน-เกาหลีให้แน่นแฟ้นยิ่งขึ้น",
      },
      {
        id: "partner-abg",
        name: "ABC Corporation",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png",
        description: "ASEAN Youth Network in Korea (AYNK) คือ ชุมชนอาสาสมัครของนักศึกษาในสาธารณรัฐเกาหลีจากประเทศอาเซียน ในเดือนเมษายน 2568 สมาคมนักเรียนไทยในสาธารณรัฐเกาหลี พร้อมด้วยสมาคมนักศึกษาจากประเทศสมาชิกอาเซียนอื่นๆ ในเกาหลี ได้ลงนามบันทึกความเข้าใจ (MOU) เพื่อสนับสนุนวัตถุประสงค์หลักของ AYNK ในการมุ่งมั่นส่งเสริมการแลกเปลี่ยนเยาวชน การสร้างเครือข่าย และความร่วมมือระหว่างอาเซียนกับเกาหลี เพื่อเสริมสร้างความสัมพันธ์อาเซียน-เกาหลีให้แน่นแฟ้นยิ่งขึ้น"
      }
    ],
    networks: [
      {
        id: "network-xyz",
        name: "XYZ Research Network",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png",
      },
      {
        id: "network-123",
        name: "Open Science Network",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png",
      },
      {
        id: "network-124",
        name: "Open Science Network",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png",
      },
      {
        id: "network-125",
        name: "Open Science Network",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png",
      },
      {
        id: "network-126",
        name: "Open Science Network",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png",
      },
      {
        id: "network-127",
        name: "Open Science Network",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png",
      },
    ],
  };

  const gridItems: GridItem[] = [
    ...sponsors.networks.map((n) => ({
      ...n,
      type: "network" as const,
    })),
    { id: "cta", type: "cta" },
  ];

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <main className="mx-auto max-w-5xl flex flex-col gap-16">

        <h1 className="text-3xl font-bold text-center">
          {dict.sponsors.title}
        </h1>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">
            {dict.sponsors.support}
          </h2>

          {sponsors.embassies.map((e) => (
            <SponsorCard
              key={e.id}
              logo={e.logo}
              name={e.name}
              description={e.description}
            />
          ))}
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">
            {dict.sponsors.partner}
          </h2>

          {sponsors.partners.map((p) => (
            <SponsorCard
              key={p.id}
              logo={p.logo}
              name={p.name}
              description={p.description}
            />
          ))}
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">
            {dict.sponsors.network}
          </h2>

          <div className="border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3">
              {gridItems.map((item, index) => (
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
                      name={item.name}
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