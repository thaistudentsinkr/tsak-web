import Image from "next/image";
import { getDictionary } from "@/lib/i18n";
import { Download, FileText } from "lucide-react";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function RegulationsPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const pageTitle = locale === 'th' ? 'ข้อบังคับสมาคม' : 'Regulations';
  const pageSubtitle = locale === 'th' 
    ? 'ข้อบังคับสมาคมนักเรียนไทยในสาธารณรัฐเกาหลี' 
    : 'Thai Students Association in the Republic of Korea Regulations';
  const downloadText = locale === 'th' ? 'ดาวน์โหลด PDF' : 'Download PDF';
  const viewText = locale === 'th' ? 'ดูเอกสาร' : 'View Document';

  const pdfPath = "/documents/tsak-regulations.pdf";

  return (
    <div className="min-h-screen">

      {/* Title Section */}
      <div 
        className="relative w-full py-6 sm:py-10 lg:py-14 flex flex-col items-center justify-center px-4 sm:px-8"
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFCDD 50%, #FFFFFF 100%)'
        }}
      >
        <h1 className="text-[#A51D2C] text-3xl sm:text-4xl lg:text-6xl font-semibold text-center">
          {pageTitle}
        </h1>
        <p className="text-[#2C3985] text-sm sm:text-base lg:text-lg mt-2 text-center">
          {pageSubtitle}
        </p>
      </div>

      {/* Content Section */}
      <div className="w-full py-8 sm:py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Download Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href={pdfPath}
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#A51D2C] text-[#FFFCDD] rounded-full font-medium hover:bg-[#8B1824] transition-colors"
            >
              <Download className="w-5 h-5" />
              {downloadText}
            </a>
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2C3985] text-[#FFFCDD] rounded-full font-medium hover:bg-[#1F2A6B] transition-colors"
            >
              <FileText className="w-5 h-5" />
              {viewText}
            </a>
          </div>

          {/* PDF Viewer */}
          <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {/* PDF Header */}
            <div className="bg-[#2C3985] text-[#FFFCDD] px-4 sm:px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span className="font-medium text-sm sm:text-base">
                  {locale === 'th' ? 'เอกสารข้อบังคับสมาคม' : 'Association Regulations Document'}
                </span>
              </div>
              <a
                href={pdfPath}
                download
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title={downloadText}
              >
                <Download className="w-5 h-5" />
              </a>
            </div>

            {/* PDF Embed using object tag with fallback */}
            <div className="w-full h-[500px] sm:h-[600px] lg:h-[800px] bg-gray-100">
              <object
                data={pdfPath}
                type="application/pdf"
                className="w-full h-full"
              >
                {/* Fallback if PDF cannot be displayed */}
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <FileText className="w-16 h-16 text-[#2C3985] mb-4" />
                  <p className="text-[#2C3985] text-lg font-medium mb-2">
                    {locale === 'th' 
                      ? 'ไม่สามารถแสดง PDF ในเบราว์เซอร์ได้' 
                      : 'Unable to display PDF in browser'}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {locale === 'th' 
                      ? 'กรุณาดาวน์โหลดเอกสารเพื่อดู' 
                      : 'Please download the document to view'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={pdfPath}
                      download
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#A51D2C] text-[#FFFCDD] rounded-full font-medium hover:bg-[#8B1824] transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      {downloadText}
                    </a>
                    <a
                      href={pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2C3985] text-[#FFFCDD] rounded-full font-medium hover:bg-[#1F2A6B] transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      {locale === 'th' ? 'เปิดในแท็บใหม่' : 'Open in new tab'}
                    </a>
                  </div>
                </div>
              </object>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-[#FFFCDD]/50 rounded-2xl">
            <h2 className="text-[#2C3985] text-xl sm:text-2xl font-semibold mb-4">
              {locale === 'th' ? 'หมายเหตุ' : 'Note'}
            </h2>
            <p className="text-[#2C3985] text-sm sm:text-base leading-relaxed">
              {locale === 'th' 
                ? 'เอกสารฉบับนี้เป็นข้อบังคับอย่างเป็นทางการของสมาคมนักเรียนไทยในสาธารณรัฐเกาหลี หากมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อคณะกรรมการบริหารสมาคม' 
                : 'This document contains the official regulations of the Thai Students Association in the Republic of Korea. For any questions or additional information, please contact the executive committee.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}