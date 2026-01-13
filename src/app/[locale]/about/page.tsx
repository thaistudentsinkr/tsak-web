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
  ]
  return (
    <div className="font-sans min-h-screen">
      {/* Top Rectangle */}
      <div className="relative w-full h-120 bg-[#2C3985]">
        <div className="absolute bottom-20 left-1/2 -translate-x-[600px]">
          <div className="w-[180px] h-[180px] bg-[#FFFCDD] rounded-full flex items-center justify-center">
            <Image
              src="/tsak_logo.png"
              alt="TSAK Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </div>
        {/* Transparent Oval */}
        <div 
          className="absolute left-1/2 translate-x-[400px] flex items-center justify-center"
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
              fontFamily: 'Poppins',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '15px'
            }}
          >
            {dict.about.associationName.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < dict.about.associationName.split('\n').length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Second Rectangle */}
      <div 
        className="relative w-full h-48 flex items-center"
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFCDD 50%, #FFFFFF 100%)'
        }}
      >
        {/* FIX THIS: Change Font + Size */}
        <h1
          className="absolute left-1/2 -translate-x-[600px]"
          style={{
            color: '#A51D2C',
            fontFamily: 'Onest',
            fontSize: '64px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal'
          }}
        >
          {dict.about.title}
        </h1>
        <h1
          className="absolute left-1/2 translate-x-[400px]"
          style={{
            color: '#A51D2C',
            fontFamily: 'Onest',
            fontSize: '64px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal'
          }}
        >
          {dict.about.titleTh}
        </h1>
      </div>
      
      <div className="w-full py-8">
        {/* Rectangle 1 */}
        <div className="w-full py-8">
          <div className="relative w-full">
            <div className="w-full max-w-4xl" style={{ marginLeft: 'calc(50% - 600px)' }}>
              <h2
                style={{
                  color: '#2C3985',
                  fontFamily: 'Onest',
                  fontSize: '48px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  marginBottom: '24px'
                }}
              >
                {dict.about.history}
              </h2>
              {(dict.about as any).historyContent && (
                <p
                  style={{
                    color: '#2C3985',
                    fontFamily: 'Onest',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '1.6',
                    textAlign: 'left',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {(dict.about as any).historyContent}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Rectangle 2 */}
        <div className="relative w-full h-48 flex items-center">
          <h2
            className="absolute left-1/2 -translate-x-[600px]"
            style={{
              color: '#2C3985',
              fontFamily: 'Onest',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}
          >
            {dict.about.whatWeDo}
          </h2>
        </div>
        
        {/* Rectangle 3 */}
        <div className="relative w-full h-48 flex items-center">
          <h2
            className="absolute left-1/2 -translate-x-[600px]"
            style={{
              color: '#2C3985',
              fontFamily: 'Onest',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}
          >
            {dict.about.vision}
          </h2>
        </div>
        
        {/* Rectangle 4 */}
        <div className="relative w-full h-48 flex items-center">
          <h2
            className="absolute left-1/2 -translate-x-[600px]"
            style={{
              color: '#2C3985',
              fontFamily: 'Onest',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}
          >
            {dict.about.logoMeaning}
          </h2>
        </div>
      </div>
      
      
    </div>
  );
}
