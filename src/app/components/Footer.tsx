import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#A51D2C] text-[#FFFCDD] py-8 px-6">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between gap-8">
          <div className="flex gap-4">
            <img 
              src="/tsak.png" 
              alt="TSAK Logo" 
              className="w-[80px] h-[80px] rounded-full object-cover"
            />
            <div className="font-onest">
              <h3 className="text-xl font-bold">TSAK</h3>
              <p className="text-sm">สมาคมนักเรียนไทยในสาธารณรัฐเกาหลี (สนทก.)</p>
              <p className="text-sm">Thai Student Association in the Republic of Korea</p>
              <p className="text-sm">주한 태국 유학생 협회</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold">Write to us</p>
              <a href="mailto:thaistudentsinkorea@gmail.com" className="text-sm underline">
                thaistudentsinkorea@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/Thaistudentkorea" aria-label="Facebook" className="hover:opacity-80">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/thaistudentsinkr/" aria-label="Instagram" className="hover:opacity-80">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/thaistudentsinkr" aria-label="LinkedIn" className="hover:opacity-80">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:block mt-6 pt-4 border-t border-[#FFFCDD]/20 text-xs text-right">
          <p>Copyright © {new Date().getFullYear()}, All Rights Reserved by Thai Student Association in Republic of Korea</p>
          <p>Project managed by Nunnalin Heimvichit
          </p>
          <p>Designed by Aphichaya Kreangwate, Pemika Chareonwongsa
          </p>
          <p>Developed by Jaden Jorradol, Thiwat Chatkham, Thommakoon Nitheekulawatn, Passavee Losripat
          </p>
          <Link href="#" className="underline">นโยบายเว็บไซต์และลิขสิทธิ์</Link>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold">Write to us</p>
            <a href="mailto:thaistudentsinkorea@gmail.com" className="text-sm underline">
              thaistudentsinkorea@gmail.com
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/Thaistudentkorea" aria-label="Facebook" className="hover:opacity-80">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/thaistudentsinkr/" aria-label="Instagram" className="hover:opacity-80">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/company/thaistudentsinkr" aria-label="LinkedIn" className="hover:opacity-80">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          <div className="text-sm mt-4">
            <p>Copyright © {new Date().getFullYear()}, All Rights Reserved by Thai Student Association in Republic of Korea</p>
            <p>Design by Aphichaya Kreangwate, Pemika Chareonwongsa, Developed by</p>
            <Link href="#" className="underline">นโยบายเว็บไซต์และลิขสิทธิ์</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}