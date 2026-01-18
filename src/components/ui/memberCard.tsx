"use client";

type Member = {
    picture?: string | null;
    firstname: string;
    lastname: string;
    university: string;
    major: string;
    position: "president" | "vice_president" | "secretary" | "head" | "member" | "advisor";
    positionLabel?: string;
    department: string;
    working: boolean;
};

export default function MemberCard({ member }: { member: Member }) {
    const { picture, firstname, lastname, university, major, position, positionLabel } = member;

    const cardBg =
        position === "president"
            ? "#85C5FF"
            : position === "vice_president" || position === "secretary"
                ? "#FFFCDD"
                : "#FFFFFF";

    const headerBg =
        position === "head" || position === "president"
            ? "#A51D2C"
            : "#2e367c";

    const starColor =
        position === "president"
            ? "#FFFFFF"
            : position === "head" ||
                position === "vice_president" ||
                position === "secretary"
                ? "#FFD700"
                : null;

    // If picture is a full URL from Django (starts with http), use it directly
    // Otherwise, treat it as a filename in /public folder
    const imageSrc = picture 
        ? (picture.startsWith('http') ? picture : `/${picture}`)
        : undefined;

    return (
        <div
            className="w-full max-w-xs border shadow-md overflow-hidden aspect-[330/224.59] flex flex-col"
            style={{ backgroundColor: cardBg }}
        >
            <div className="relative flex-shrink-0">
                <div className="text-center py-2" style={{ backgroundColor: headerBg }}>
                    <h1 className="text-lg font-bold text-[#f7f5dc] tracking-wide">
                        TSAK MEMBER ID
                    </h1>
                    {starColor && (
                        <span
                            className="absolute right-2 bottom-0 translate-y-1/2 text-3xl"
                            style={{ color: starColor }}
                        >
                            ★
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-1 gap-3 p-2 items-start">
                <div className="flex-shrink-0 w-1/3 bg-gray-300 rounded-md overflow-hidden">
                    {picture && (
                        <img
                            src={imageSrc}
                            alt={`${firstname} ${lastname}`}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                <div className="flex flex-col flex-1 justify-between text-black text-xs sm:text-sm">
                    <div>
                        <div className="border-b pb-1 font-medium text-left">{firstname}</div>
                        <div className="border-b pb-1 font-medium text-right">{lastname}</div>
                        <div className="border-b pb-1 text-center">{university}</div>
                        <div className="border-b pb-1 text-center">{major}</div>
                    </div>

                    <div className="text-center mt-3 sm:mt-4 pb-4">
                        <span 
                            className="bg-[#9d2b2b] text-[#f7f5dc] text-[10px] sm:text-xs font-medium py-1 px-2 sm:px-3 rounded-full inline-block max-w-full truncate"
                            title={positionLabel || position}
                        >
                            {positionLabel || position}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}