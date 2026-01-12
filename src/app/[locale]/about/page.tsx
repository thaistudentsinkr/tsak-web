import Image from "next/image";
import Link from "next/link"

export default function Home() {
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
            Thai Students Association<br />
            in the Republic of Korea
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
          ABOUT TSAK
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
          สนทก.
        </h1>
      </div>
      
      <div className="w-full py-8">
        {/* Rectangle 1 */}
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
            ความเป็นมาของสมาคม
          </h2>
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
            TSAK เราทำอะไร
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
            วิสัยทัศน์ของ TSAK
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
            ความหมายของ LOGO ของสมาคม
          </h2>
        </div>
      </div>
      
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <center>
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-6">Feel free and don't hesitate to contact us!</p>
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
    </div>
  );
}
