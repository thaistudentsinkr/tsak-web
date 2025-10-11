"use client";

import { useState } from "react";
import MemberCard from "../../components/ui/memberCard";

const departments = [
  "สมาชิกกิตติมศักด์",
  "ฝ่ายบริหาร",
  "ฝ่ายประสานงาน",
  "ฝ่ายประชาสัมพันธ์",
  "ฝ่ายกิจกรรม",
  "ฝ่ายบัญชี",
  "ฝ่ายเอกสาร",
  "IT Support",
  "อดีตสมาชิก",
];

export default function Home() {
  const [selectedDept, setSelectedDept] = useState<string>(departments[0]);

  // const [memberData, setMemberData] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   async function fetchMembers() {
  //     try {
  //       const res = await fetch("/api/members/");
  //       if (!res.ok) throw new Error("Failed to fetch members");
  //       const data = await res.json();
  //       setMemberData(data); // update the state once
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchMembers();
  // }, []);

  //use fake data for now
  const memberData = [
    {
      picture: "tsak.png",
      firstname: "Firstname",
      lastname: "Lastname",
      university: "Seoul National University",
      major: "Computer Science",
      position: "ประธานสมาคม",
      department: "ฝ่ายบริหาร",
      working: true,
    },

    {
      picture: "tsak.png",
      firstname: "Firstname",
      lastname: "Lastname",
      university: "Seoul National University",
      major: "Computer Science",
      position: "Head of IT Support",
      department: "IT Support",
      working: true,
    },

    {
      picture: "tsak.png",
      firstname: "Firstname",
      lastname: "Lastname",
      university: "Seoul National University",
      major: "Computer Science",
      position: "IT Support",
      department: "IT Support",
      working: true,
    },

    {
      picture: "tsak.png",
      firstname: "Firstname",
      lastname: "Lastname",
      university: "Seoul National University",
      major: "Computer Science",
      position: "IT Support",
      department: "IT Support",
      working: false,
    },

    {
      picture: "tsak.png",
      firstname: "Firstname",
      lastname: "Lastname",
      university: "Seoul National University",
      major: "Computer Science",
      position: "IT Support",
      department: "IT Support",
      working: true,
    },

    {
      picture: "tsak.png",
      firstname: "Firstname",
      lastname: "Lastname",
      university: "Seoul National University",
      major: "Computer Science",
      position: "ที่ปรึกษา",
      department: "สมาชิกกิตติมศักด์",
      working: true,
    },

    {
      picture: "tsak.png",
      firstname: "Firstname",
      lastname: "Lastname",
      university: "Seoul National University",
      major: "Computer Science",
      position: "รองประธานสมาคม",
      department: "ฝ่ายบริหาร",
      working: true,
    },

    {
      picture: "tsak.png",
      firstname: "Firstname",
      lastname: "Lastname",
      university: "Seoul National University",
      major: "Computer Science",
      position: "เลขานุการ",
      department: "ฝ่ายบริหาร",
      working: true,
    },
  ];

  const filteredMembers = memberData.filter((m) => {
    if (selectedDept === "อดีตสมาชิก") {
      return m.working === false;
    } else {
      return m.department === selectedDept;
    }
  });

  //if (loading) return <p className="text-center mt-20 text-lg">Loading members...</p>;
  //uncomment when use real API to show loading message

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20">
      <h2 className="text-2xl font-bold text-black mb-8 pt-5 text-center sm:translate-x-[150px]">
        {selectedDept}
      </h2>

      <div className="flex flex-col sm:flex-row gap-10">
        <aside className="w-full sm:w-[250px] flex flex-col gap-3">
          {departments.map((dept, index) => {

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
                {dept}
              </button>
            );
          })}

        </aside>

        <main className="flex-1 flex flex-col gap-8 items-center w-full relative">
          {selectedDept === "ฝ่ายบริหาร" ? (
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
                    .filter((m) => m.position === "ประธานสมาคม")
                    .map((member, idx) => (
                      <MemberCard key={idx} member={member} />
                    ))}
                </div>

                <div className="flex justify-center gap-30">
                  {filteredMembers
                    .filter(
                      (m) =>
                        m.position === "รองประธานสมาคม" ||
                        m.position === "เลขานุการ"
                    )
                    .map((member, idx) => (
                      <MemberCard key={idx} member={member} />
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-7xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member, index) => (
                    <MemberCard key={index} member={member} />
                  ))
                ) : (
                  <p className="text-gray-600 mt-10 text-lg">
                    ไม่มีสมาชิกในฝ่ายนี้
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
