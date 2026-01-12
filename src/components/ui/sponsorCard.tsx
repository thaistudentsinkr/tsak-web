import Image from "next/image";

type SponsorCardProps = {
  logo: string;
  name: string;
  description: string;
};

export function SponsorCard({ logo, name, description }: SponsorCardProps) {
  return (
    <div className="flex gap-6 p-6 rounded-lg">
      <div className="flex-shrink-0 flex items-start">
        <Image
          src={logo}
          alt={name}
          width={90}
          height={90}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-xl">
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-gray-800">
          {description}
        </p>
      </div>

    </div>
  );
}
