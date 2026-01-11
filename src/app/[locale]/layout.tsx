import Link from "next/link";
import LanguageSwitcher from "../components/LanguageSwitcher";
import InformationDropdown from "../components/InformationDropDown";
import AboutDropdown from "../components/AboutDropDown";
import CommunityDropdown from "../components/CommunityDropDown";
import Footer from "../components/Footer";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-[#A51D2C] fixed rounded-[50px] py-2 px-4 top-4 left-1/2 -translate-x-1/2 shadow-[0_4px_6px_rgba(0,0,0,0.4)] h-[60px] w-[87%] max-w-[1240px] flex z-[100]">
        <Link href={`/${locale}`} className="flex items-center">
          <img src="/tsak.png" alt="tsak.png" className="w-[42px] h-auto rounded-full object-cover" />
          <img src="/TSAK_word.png" alt="TSAK_word.png" className="w-[135px] h-[41px]" />
        </Link>
        <ul className="flex text-[#FFFCDD] space-x-7 ml-auto mr-1 items-center">
          <ul className="font-onest text-base font-normal flex space-x-7">
            <li>
              <InformationDropdown/>
            </li>
            <li>
              <AboutDropdown/>
            </li>
            <li>
              <CommunityDropdown/>
            </li>  
          </ul>
          <li>
            <LanguageSwitcher locales={['en', 'th']}/>
          </li>
        </ul>
      </nav>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

