"use client";

type Member = {
    picture?: string;
    firstname: string;
    lastname: string;
    university: string;
    major: string;
    position: string;
    department: string;
    working: boolean;
};

export default function MemberCard({ member }: { member: Member }) {
    const { picture, firstname, lastname, university, major, position, department } = member;

    const cardBg = position === "ประธานสมาคม" ? "#85C5FF" : "#FFFFFF";

    const headerBg =
        department.includes("Head") || position === "ประธานสมาคม"
            ? "#A51D2C"
            : "#2e367c";

    const starColor =
        position === "ประธานสมาคม"
            ? "#FFFFFF" : position.includes("Head") || position === "รองประธานสมาคม" || position === "เลขานุการ"
                ? "#FFD700" : null;

    return (
        <div className={`w-full max-w-xs border rounded-xl shadow-md overflow-hidden`} style={{ backgroundColor: cardBg }}>
            <div className="relative">
                <div className="text-center py-3" style={{ backgroundColor: headerBg }}>
                    <h1 className="text-lg font-bold text-[#f7f5dc] tracking-wide">
                        TSAK MEMBER ID
                    </h1>
                    {starColor && (
                        <span
                            className="absolute right-4 bottom-0 translate-y-1/2 text-4xl"
                            style={{ color: starColor }}
                        >
                            ★
                        </span>
                    )}
                </div>
            </div>

            <div className="flex p-5 gap-5 items-start">
                <div className="w-[120px] h-[140px] bg-gray-300 rounded-md overflow-hidden">
                    {picture && (
                        <img
                            src={picture}
                            alt={`${firstname} ${lastname}`}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                <div className="flex flex-col flex-1 gap-2 text-black">
                    <div className="border-b pb-1 font-medium text-lg text-left">{firstname}</div>
                    <div className="border-b pb-1 font-medium text-lg text-right">{lastname}</div>
                    <div className="border-b pb-1 text-sm text-center">{university}</div>
                    <div className="border-b pb-1 text-sm text-center">{major}</div>
                    <div className="pt-2 text-center">
                        <span className="bg-[#9d2b2b] text-[#f7f5dc] text-sm font-medium py-1.5 px-6 rounded-full inline-block">
                            {position}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
