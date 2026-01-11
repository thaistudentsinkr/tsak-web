"use client";

import { useState, useEffect } from "react";
import MemberCard from "../../../components/ui/memberCard";
import { getDictionary } from "@/lib/i18n";
import { useParams } from "next/navigation";

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
    <div className="font-sans min-h-screen p-8 sm:p-20">
      <h2 className="text-2xl font-bold text-black mb-8 pt-5 text-center sm:translate-x-[150px]">
        {dict.departments[selectedDept]}
      </h2>

      <div className="flex flex-col sm:flex-row gap-10">
        <aside className="w-full sm:w-[250px] flex flex-col gap-3">
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
            <div className="relative flex flex-col gap-12 w-full max-w-7xl items-center justify-center py-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-4 border-[#A51D2C]/20 rounded-[50%] w-[320px] h-[100px] rotate-[9.47deg] flex items-center justify-center p-4">
                  <p className="text-[#A51D2C]/20 font-bold text-lg sm:text-xl leading-snug text-center whitespace-pre-line">
                    Thai Students Association{'\n'}in the Republic of Korea
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-15 relative z-10 w-full">
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

                <div className="flex justify-center gap-30">
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
            <div className="w-full max-w-7xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
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

              <div className="absolute bottom-4 right-4 w-[320px] h-[100px] flex items-center justify-center">
                <div className="border-4 border-[#A51D2C]/20 rounded-[50%] rotate-[-17.11deg] w-full h-full flex items-center justify-center p-4">
                  <p className="text-[#A51D2C]/20 font-bold text-lg sm:text-xl leading-snug text-center whitespace-pre-line">
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