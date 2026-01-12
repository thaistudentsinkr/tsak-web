import Image from "next/image";
import { getDictionary } from "@/lib/i18n";
import { SponsorCard } from "../../../components/ui/sponsorCard";
import { NetworkCard } from "../../../components/ui/networkCard";

//function to fetch data from sponsors api
// async function getSponsors() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sponsors`);
//   if (!res.ok) throw new Error("Failed to fetch sponsors");
//   return res.json();
// }

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

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
        description: "ASEAN Youth Network in Korea (AYNK) คือ ชุมชนอาสาสมัครของนักศึกษาในสาธารณรัฐเกาหลีจากประเทศอาเซียน ในเดือนเมษายน 2568 สมาคมนักเรียนไทยในสาธารณรัฐเกาหลี พร้อมด้วยสมาคมนักศึกษาจากประเทศสมาชิกอาเซียนอื่นๆ ในเกาหลี ได้ลงนามบันทึกความเข้าใจ (MOU) เพื่อสนับสนุนวัตถุประสงค์หลักของ AYNK ในการมุ่งมั่นส่งเสริมการแลกเปลี่ยนเยาวชน การสร้างเครือข่าย และความร่วมมือระหว่างอาเซียนกับเกาหลี เพื่อเสริมสร้างความสัมพันธ์อาเซียน-เกาหลีให้แน่นแฟ้นยิ่งขึ้น"
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
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png"
      },
      {
        id: "network-123",
        name: "Open Science Network",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png"
      },
      {
        id: "network-124",
        name: "Open Science Network",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png"
      },
      {
        id: "network-125",
        name: "Open Science Network",
        logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png"
      }
    ]
  };


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-16 row-start-2 w-full max-w-5xl">

        <h1 className="text-3xl font-bold text-center">
          {dict.sponsors.title}
        </h1>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">
            {dict.sponsors.support}
          </h2>

          <div className="flex flex-col gap-8 w-full">
            {sponsors.embassies.map(e => (
              <SponsorCard
                key={e.id}
                logo={e.logo}
                name={e.name}
                description={e.description}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">
            {dict.sponsors.partner}
          </h2>

          <div className="flex flex-col gap-8 w-full">
            {sponsors.partners.map(p => (
              <SponsorCard
                key={p.id}
                logo={p.logo}
                name={p.name}
                description={p.description}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">
            {dict.sponsors.network}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {sponsors.networks.map(n => (
              <NetworkCard
                key={n.id}
                logo={n.logo}
                name={n.name}
              />
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}