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
    </div>
  );
}
