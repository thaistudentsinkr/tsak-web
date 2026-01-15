import Image from "next/image";
import { getDictionary } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: PageProps) {
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
    <div className="min-h-screen">
      {/* Top Rectangle - Hero Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[480px] bg-[#2C3985]">
        {/* Logo */}
        <div className="absolute bottom-8 sm:bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 lg:left-1/2 lg:-translate-x-[600px]">
          <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[180px] lg:h-[180px] bg-[#FFFCDD] rounded-full flex items-center justify-center">
            <Image
              src="/tsak_logo_no_bg.png"
              alt="TSAK Logo"
              width={150}
              height={150}
              className="object-contain w-[100px] sm:w-[120px] lg:w-[150px]"
            />
          </div>
        </div>

        {/* Transparent Oval - Hidden on mobile */}
        <div 
          className="hidden lg:flex absolute left-1/2 translate-x-[400px] items-center justify-center"
          style={{
            bottom: '80px',
            transform: 'translateY(32px)',
            width: '187px',
            height: '64px',
            border: '2px solid #FFFCDD',
            borderRadius: '50%',
            backgroundColor: 'transparent'
          }}
        >
          <div
            style={{
              color: '#FFFCDD',
              textAlign: 'center',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '15px'
            }}
          >
            {dict.about.associationName.split('\n').map((line: string, index: number) => (
              <span key={index}>
                {line}
                {index < dict.about.associationName.split('\n').length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Second Rectangle - Title Section */}
      <div 
        className="relative w-full py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-8"
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFCDD 50%, #FFFFFF 100%)'
        }}
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <h1 className="text-[#A51D2C] text-3xl sm:text-4xl lg:text-6xl font-semibold text-center lg:text-left">
            {dict.about.title}
          </h1>
          <h1 className="text-[#A51D2C] text-3xl sm:text-4xl lg:text-6xl font-semibold text-center lg:text-right">
            {dict.about.titleTh}
          </h1>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="w-full py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* History Section */}
          <section className="py-8 sm:py-12">
            <h2 className="text-[#2C3985] text-2xl sm:text-3xl lg:text-5xl font-semibold mb-6">
              {dict.about.history}
            </h2>
            {(dict.about as any).historyContent && (
              <p className="text-[#2C3985] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {(dict.about as any).historyContent}
              </p>
            )}
          </section>
          
          {/* What We Do Section */}
          <section className="py-8 sm:py-12">
            <h2 className="text-[#2C3985] text-2xl sm:text-3xl lg:text-5xl font-semibold mb-6">
              {dict.about.whatWeDo}
            </h2>
            {(dict.about as any).whatWeDoContent && (
              <p className="text-[#2C3985] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {(dict.about as any).whatWeDoContent}
              </p>
            )}
          </section>
          
          {/* Vision Section */}
          <section className="py-8 sm:py-12">
            <h2 className="text-[#2C3985] text-2xl sm:text-3xl lg:text-5xl font-semibold mb-6">
              {dict.about.vision}
            </h2>
            {(dict.about as any).visionContent && (
              <p className="text-[#2C3985] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {(dict.about as any).visionContent}
              </p>
            )}
          </section>
        
          <section className="py-8 sm:py-12">
            <h2 className="text-[#2C3985] text-2xl sm:text-3xl lg:text-5xl font-semibold mb-6">
              {dict.about.logoMeaning}
            </h2>
            {(dict.about as any).logoMeaningContent && (
              <p className="text-[#2C3985] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {(dict.about as any).logoMeaningContent}
              </p>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}