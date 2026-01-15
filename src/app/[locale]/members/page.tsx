"use client";

import { useState, useEffect } from "react";
import MemberCard from "../../../components/ui/memberCard";
import { getDictionary } from "@/lib/i18n";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

const DEPARTMENTS = [
  "honorary",
  "executive",
  "liaison",
  "pr",
  "events",
  "accounting",
  "documents",
  "it",
  "alumni",
] as const;

type Department = (typeof DEPARTMENTS)[number];

type Position = "president" | "vice_president" | "secretary" | "head" | "member" | "advisor";

type MemberData = {
  id: number;
  picture: string | null;
  firstname: string;
  lastname: string;
  university: string;
  major: string;
  position: Position;
  department: Department;
  working: boolean;
};

export default function Home() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';

  const dict = getDictionary(locale);
  const [selectedDept, setSelectedDept] = useState<Department>("honorary");
  const [memberData, setMemberData] = useState<MemberData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Helper function to get position label
  const getPositionLabel = (position: string, department: string) => {
    if (position === "head") {
      const headPrefix = dict?.positions?.head_prefix || "Head of";
      const deptName = dict?.departments?.[department as Department] || department;
      return `${headPrefix} ${deptName}`;
    } else if (position === "member" && department !== "executive") {
      return dict?.departments?.[department as Department] || department;
    } else {
      return dict?.positions?.[position as keyof typeof dict.positions] || position;
    }
  };

  // Fetch members from Django API
  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("http://localhost:8000/api/members/");
        if (!res.ok) throw new Error("Failed to fetch members");
        const data = await res.json();
        setMemberData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load members");
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const filteredMembers = memberData.filter((m) => {
    if (selectedDept === "alumni") {
      return m.working === false;
    }
    return m.department === selectedDept && m.working === true;
  });

  if (loading) {
    return (
      <div className="font-sans min-h-screen p-8 sm:p-20 flex items-center justify-center">
        <p className="text-xl">Loading members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans min-h-screen p-8 sm:p-20 flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen p-4 pt-24 sm:p-8 sm:pt-28 lg:p-20">
      {/* Page Title */}
      <h2 className="text-2xl font-bold text-black mb-8 pt-5 text-center lg:translate-x-[150px]">
        {dict.departments[selectedDept]}
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Department Filter */}
        <aside className="w-full lg:w-[250px] shrink-0">
          
          {/* Mobile: Dropdown Selector - Narrower */}
          <div className="lg:hidden relative mb-4 w-[60%] mx-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#A51D2C] text-[#FFFCDD] rounded-xl text-base font-medium shadow-md"
            >
              <span>{dict.departments[selectedDept]}</span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} 
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDept(dept);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors
                      ${selectedDept === dept
                        ? "bg-[#A51D2C] text-[#FFFCDD]"
                        : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {dict.departments[dept]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop: Vertical buttons - Keep original */}
          <div className="hidden lg:flex flex-col gap-3">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`w-full text-lg font-medium px-4 py-3 border text-center
                  transition-all rounded-r-full
                  ${selectedDept === dept
                    ? "bg-[#A51D2C] text-[#FFFCDD] border-[#A51D2C]"
                    : "bg-[#2C3985] text-[#FFFCDD] border-[#2C3985] hover:bg-[#1F2A6B]"
                  }`}
                style={{
                  borderTopLeftRadius: "0.25rem",
                  borderBottomLeftRadius: "0.25rem",
                }}
              >
                {dict.departments[dept]}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col gap-8 items-center w-full relative">
          {selectedDept === "executive" ? (
            /* Executive Layout */
            <div className="relative flex flex-col gap-12 w-full max-w-7xl items-center justify-center py-12">
              <div className="hidden sm:flex absolute inset-0 items-center justify-center">
                <div className="border-2 border-[#A51D2C]/20 rounded-[50%] w-[320px] h-[100px] rotate-[9.47deg] flex items-center justify-center p-4">
                  <p className="text-[#A51D2C]/20 text-lg sm:text-xl leading-[1.1] text-center whitespace-pre-line max-w-[90%] tracking-tighter">
                    Thai Students Association{'\n'}in the Republic of Korea
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-15 relative z-10 w-full">
                {/* President */}
                <div className="flex justify-center mb-8">
                  {filteredMembers
                    .filter((m) => m.position === "president")
                    .map((member) => (
                      <MemberCard
                        key={member.id}
                        member={{
                          ...member,
                          positionLabel: getPositionLabel(member.position, member.department),
                        }}
                      />
                    ))}
                </div>

                {/* Vice President & Secretary - Vertical on mobile */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-30">
                  {filteredMembers
                    .filter(
                      (m) =>
                        m.position === "vice_president" ||
                        m.position === "secretary"
                    )
                    .map((member) => (
                      <MemberCard
                        key={member.id}
                        member={{
                          ...member,
                          positionLabel: getPositionLabel(member.position, member.department),
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>
          ) : (
            /* Regular Department Layout */
            <div className="w-full max-w-7xl">
              {/* Mobile: Vertical stack | Desktop: Flex wrap */}
              <div className="flex flex-col lg:flex-row lg:flex-wrap gap-10 items-center lg:justify-center">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={{
                        ...member,
                        positionLabel: getPositionLabel(member.position, member.department),
                      }}
                    />
                  ))
                ) : (
                  <p className="text-gray-600 mt-10 text-lg">
                    {dict.members.empty}
                  </p>
                )}
              </div>

              {/* Decorative element - Desktop only */}
              <div className="hidden lg:flex absolute bottom-4 right-4 w-[320px] h-[100px] items-center justify-center">
                <div className="border-2 border-[#A51D2C]/20 rounded-[50%] rotate-[-17.11deg] w-full h-full flex items-center justify-center p-2">
                  <p className="text-[#A51D2C]/20 text-lg sm:text-xl leading-[1.1] text-center whitespace-pre-line max-w-[90%] tracking-tighter">
                    Thai Students Association{'\n'}in the Republic of Korea
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}