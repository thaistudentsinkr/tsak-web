import Image from "next/image";

//function to fetch data from sponsors api
// async function getSponsors() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sponsors`);
//   if (!res.ok) throw new Error("Failed to fetch sponsors");
//   return res.json();
// }

export default function Home() {
  //use fake data for now; use const sponsors = await getSponsors(); after have backend
  const sponsors = [
    {
      name: "Royal Thai Embassy, Seoul",
      logo: "https://image.mfa.go.th/mfa/0/bE5KohkHoq/%E0%B8%AA%E0%B8%AD%E0%B8%97new.png",
      contribution: [
        "รายการสนับสนุน เช่น งบประมาณการดำเนินงาน",
      ]
    },
  ];

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-black dark:text-white">
          Sponsorship & Partners
        </h1>
        <div className="flex flex-col gap-4 w-full">
          {sponsors.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-start gap-4 p-4"
            >
              <Image
                src={item.logo}
                alt={item.name}
                width={90}
                height={90}
                className="rounded-md"
              />
              <div className="flex flex-col">
                <span className="text-black dark:text-white font-bold text-lg">{item.name}</span>
                <ul className="list-disc ml-4 mt-1 text-gray-800 dark:text-gray-200">
                  {item.contribution.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
