import Image from "next/image";

type SponsorCardProps = {
  logo: string;
  name: string;
  description: string;
};

export function SponsorCard({ logo, name, description }: SponsorCardProps) {
  return (
    <div className="flex gap-6 p-6">
      <div className="flex-shrink-0">
        <Image
          src={logo}
          alt={name}
          width={90}
          height={90}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-xl text-gray-900">
          {name}
        </h3>

        <p className="
          text-sm leading-relaxed text-gray-800
          text-justify
        ">
          {description}
        </p>
      </div>
    </div>
  );
}
