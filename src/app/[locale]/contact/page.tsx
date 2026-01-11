import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const contact = [
    {
      text: "thaistudentsinkorea@gmail.com",
      logo: "https://images.icon-icons.com/2631/PNG/512/gmail_new_logo_icon_159149.png",
      link: "mailto:thaistudentsinkorea@gmail.com"
    },
    {
      text: "Facebook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png",
      link: "https://facebook.com/Thaistudentkorea"
    },
    {
      text: "Instagram",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png",
      link: "https://www.instagram.com/thaistudentsinkr/"
    },
    {
      text: "LinkedIn",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
      link: "https://www.linkedin.com/company/thaistudentsinkr"
    },
    {
      text: "openlink",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp41Q-XrUHe_tb-dWkQWYISUpuCNAK9K7Msw&s",
      link: "https://www.openlink.co/tsak"
    },
    {
      text: "K-campus",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97sukkNEXGlXOQojQ8FaDlRDhk2S1E2Re6w&s",
      link: "https://kcampus.kr/profile/thaistudentassociation(tsak)-25487"
    },
  ];

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <center>
          <h1 className="text-3xl font-bold">{dict.contact.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{dict.contact.subtitle}</p>
          <div className="flex flex-col item-center justify-center gap-4">
            {contact.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                target="_blank"
                className="flex items-center gap-3 bg-white px-10 py-5 rounded-[20px] shadow-md hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
              >
                <Image
                  src={item.logo}
                  alt={item.text}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <span className="text-gray-800 font-medium text-lg">{item.text}</span>
              </Link>
            ))}
          </div>
        </center>
      </main>
    </div>
  );
}