"use client";

import { useState, useEffect, useRef } from "react";
import MemberCard from "../../../components/ui/memberCard";
import { getDictionary } from "@/lib/i18n";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

const DEPARTMENTS = [
  "current",
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
  const [selectedDept, setSelectedDept] = useState<Department>("current");
  const [memberData, setMemberData] = useState<MemberData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper function to get position label
  const getPositionLabel = (position: string, department: string) => {
    if (position === "head") {
      // For heads, combine "Head of" with department name
      const headPrefix = dict?.positions?.head_prefix || "Head of";
      const deptName = dict?.departments?.[department as Department] || department;
      return `${headPrefix} ${deptName}`;
    } else if (position === "member" && department !== "executive") {
      // For members of specific departments, you might want to show department name
      return dict?.departments?.[department as Department] || department;
    } else {
      // For other positions, use direct translation
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

  // Helper function to sort members for "current" view
  const sortCurrentMembers = (members: MemberData[]) => {
    const positionOrder: Record<Position, number> = {
      president: 1,
      vice_president: 2,
      secretary: 3,
      head: 4,
      member: 5,
      advisor: 6,
    };

    const deptOrder: Department[] = ["executive", "liaison", "pr", "events", "accounting", "documents", "it"];

    return members.sort((a, b) => {
      // First sort by department
      const deptIndexA = deptOrder.indexOf(a.department);
      const deptIndexB = deptOrder.indexOf(b.department);
      
      if (deptIndexA !== deptIndexB) {
        return deptIndexA - deptIndexB;
      }

      // Within same department, sort by position
      return positionOrder[a.position] - positionOrder[b.position];
    });
  };

  const filteredMembers = memberData.filter((m) => {
    if (selectedDept === "current") {
      // Show all active members across all departments, excluding honorary
      return m.working === true && m.department !== "honorary";
    } else if (selectedDept === "alumni") {
      return m.working === false;
    }
    return m.department === selectedDept && m.working === true;
  });

  // Sort members if "current" is selected
  const displayMembers = selectedDept === "current" 
    ? sortCurrentMembers([...filteredMembers])
    : filteredMembers;

  const handleSelectDept = (dept: Department) => {
    setSelectedDept(dept);
    setIsDropdownOpen(false);
  };

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
    <div className="font-sans min-h-screen p-25 sm:p-8 lg:p-20">
      <h2 className="text-2xl font-bold text-black mb-6 sm:mb-8 pt-5 text-center lg:translate-x-[150px]">
        {dict.departments[selectedDept]}
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-10">
        {/* Mobile Dropdown */}
        <div className="lg:hidden w-full" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-lg font-medium px-4 py-3 bg-[#A51D2C] text-[#FFFCDD] border border-[#A51D2C] rounded-full flex items-center justify-between transition-all"
          >
            <span>{dict.departments[selectedDept]}</span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50 relative">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => handleSelectDept(dept)}
                  className={`w-full text-base font-medium px-4 py-3 text-left transition-all border-b border-gray-100 last:border-b-0
                    ${selectedDept === dept
                      ? "bg-[#A51D2C] text-[#FFFCDD]"
                      : "bg-white text-[#2C3985] hover:bg-[#2C3985]/10"
                    }`}
                >
                  {dict.departments[dept]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-[250px] flex-col gap-3 flex-shrink-0">
          {DEPARTMENTS.map((dept) => {
            return (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`w-full text-lg font-medium px-4 py-3 border border-black text-center
                  transition-all rounded-r-full
                  ${selectedDept === dept
                    ? "bg-[#A51D2C] text-[#FFFCDD] border border-[#A51D2C]"
                    : "bg-[#2C3985] text-[#FFFCDD] border border-[#2C3985] hover:bg-[#1F2A6B]"
                  }`}
                style={{
                  borderTopLeftRadius: "0.25rem",
                  borderBottomLeftRadius: "0.25rem",
                }}
              >
                {dict.departments[dept]}
              </button>
            );
          })}
        </aside>

        <main className="flex-1 flex flex-col gap-8 items-center w-full relative">
          {selectedDept === "executive" ? (
            <div className="relative flex flex-col gap-12 w-full max-w-7xl items-center justify-center py-8 sm:py-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-2 border-[#A51D2C]/20 rounded-[50%] w-[280px] sm:w-[320px] h-[80px] sm:h-[100px] rotate-[9.47deg] flex items-center justify-center p-4">
                  <p className="text-[#A51D2C]/20 text-base sm:text-lg lg:text-xl leading-[1.1] text-center whitespace-pre-line max-w-[90%] tracking-tighter">
                    Thai Students Association{'\n'}in the Republic of Korea
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-8 sm:gap-15 relative z-10 w-full">
                {/* President */}
                <div className="flex justify-center mb-4 sm:mb-8">
                  {memberData
                    .filter((m) => m.position === "president" && m.working === true)
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

                {/* Vice President and Secretary */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 max-w-4xl mx-auto">
                  {memberData
                    .filter(
                      (m) =>
                        (m.position === "vice_president" || m.position === "secretary") &&
                        m.working === true
                    )
                    .map((member) => (
                      <div key={member.id} className="flex flex-wrap gap-4 sm:gap-8 justify-center">
                        <MemberCard
                          member={{
                            ...member,
                            positionLabel: getPositionLabel(member.position, member.department),
                          }}
                        />
                      </div>
                    ))}
                </div>

                {/* All Department Heads - 2 per row */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 max-w-4xl mx-auto">
                  {memberData
                    .filter((m) => m.position === "head" && m.working === true)
                    .map((member) => (
                      <div key={member.id} className="flex flex-wrap gap-4 sm:gap-8 justify-center">
                        <MemberCard
                          member={{
                            ...member,
                            positionLabel: getPositionLabel(member.position, member.department),
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-7xl">
              <div className="flex flex-wrap gap-4 sm:gap-8 justify-center">
                {displayMembers.length > 0 ? (
                  displayMembers.map((member) => (
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

              <div className="hidden sm:flex absolute bottom-4 right-4 w-[320px] h-[100px] items-center justify-center -z-10">
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