import { getDictionary } from "@/lib/i18n";
import Image from "next/image";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <main className="flex flex-col gap-[32px] items-center w-full">
        {/* Image */}
        <div className="relative w-full">
          <Image
            src="/fall_2025_group_photo.jpg"
            alt="TSAK Group Photo"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        
        {/* Text below image */}
        <div className="p-8 pb-20 sm:p-20 w-full">
          <h1 className="text-2xl sm:text-4xl font-bold text-center sm:text-left">
            {(dict as any)["home.introduction"] || "Homepage"}
          </h1>
        </div>
      </main>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  
        {/* Background ellipse */}
        <div
          className="
            absolute
            w-[5000px]
            h-[350px]
            bg-[radial-gradient(ellipse_at_center,theme(colors.yellow.200),transparent_70%)]
    blur-3xl
    opacity-80
    -z-10
          "
        />
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 px-6 max-w-6xl w-full"
        >
          {/* Left logo */}
          <div className="w-[190px] h-[60px] rounded-[100%/100%] flex justify-center items-center text-center border-1 border-[#A51D2C] text-[12px] font-[400]">
            Thai Students Association<br />
            in the Republic of Korea
          </div>

          {/* Center text */}
          <div className="text-center space-y-4">
            <div className="text-sm md:text-base leading-relaxed text-gray-800">
              {dict.hero.maintext.split('\n').map((line, i) => (<p key={i}>{line}</p>))}
            </div>
          </div>

          {/* Right logo */}
          <div className="w-[190px] h-[60px] rounded-[100%/100%] flex justify-center items-center text-center border-1 border-[#A51D2C] text-[12px] font-[400]">
            Thai Students Association<br />
            in the Republic of Korea
          </div>
          
        </div>
      </section>

    </div>
  );
}
