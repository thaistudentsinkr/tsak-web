import Image from "next/image";

type NetworkCardProps = {
  logo: string;
  name: string;
};

export function NetworkCard({ logo, name }: NetworkCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 h-full">
      <Image
        src={logo}
        alt={name}
        width={80}
        height={80}
        className="object-contain"
      />
      <span className="font-medium text-gray-900">
        {name}
      </span>
    </div>
  );
}
