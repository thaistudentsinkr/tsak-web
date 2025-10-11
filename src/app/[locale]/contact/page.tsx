"use client";

import { useState } from "react";
import MemberCard from "../../components/ui/memberCard";

const departments = [
  "สมาชิกกิตติมศักด์",
  "สมาชิกปัจจุบัน",
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
    if (selectedDept === "สมาชิกปัจจุบัน") {
      return m.working === true;
    } else if (selectedDept === "อดีตสมาชิก") {
      return m.working === false;
    } else {
      return m.department === selectedDept;
    }
  });

  //if (loading) return <p className="text-center mt-20 text-lg">Loading members...</p>;
  //uncomment when use real API to show loading message

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20">
      <h2 className="text-2xl font-bold text-black mb-8 text-center pt-5">
        {selectedDept}
      </h2>

      <div className="flex flex-col sm:flex-row gap-10">
        <aside className="w-full sm:w-[250px] flex flex-col gap-3">
          {departments.map((dept, index) => {
            const isFirst = index === 0;
            const isLast = index === departments.length - 1;

            return (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`w-full text-lg font-medium px-4 py-3 border border-black text-black text-center
        transition-all rounded-r-full
        ${selectedDept === dept
                    ? "bg-[#9d2b2b] text-white"
                    : "bg-white hover:bg-gray-100"
                  }`}
                style={{
                  borderTopLeftRadius: "0.25rem",
                  borderBottomLeftRadius: "0.25rem",
                  borderTopRightRadius: isFirst ? "0" : undefined,
                  borderBottomRightRadius: isLast ? "0" : undefined,
                }}
              >
                {dept}
              </button>
            );
          })}

        </aside>

        <main className="flex-1 flex flex-col gap-8 items-center w-full">
          {selectedDept === "ฝ่ายบริหาร" ? (
            <div className="flex flex-col gap-4 w-full max-w-7xl">
              <div className="flex justify-center">
                {filteredMembers
                  .filter((m) => m.position === "ประธานสมาคม")
                  .map((member, idx) => (
                    <MemberCard key={idx} member={member} />
                  ))}
              </div>

              <div className="flex justify-center gap-4">
                {filteredMembers
                  .filter(
                    (m) =>
                      m.position === "รองประธานสมาคม" || m.position === "เลขานุการ"
                  )
                  .map((member, idx) => (
                    <MemberCard key={idx} member={member} />
                  ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full max-w-7xl">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <MemberCard key={index} member={member} />
                ))
              ) : (
                <p className="text-gray-600 mt-10 text-lg">
                  ไม่มีสมาชิกในหมวดนี้
                </p>
              )}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
