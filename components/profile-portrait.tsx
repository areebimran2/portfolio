import Image from "next/image";

type ProfilePortraitProps = {
  src: string;
  name: string;
};

export function ProfilePortrait({ src, name }: ProfilePortraitProps) {
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="absolute inset-3 -z-10 rounded-full bg-primary/25 blur-2xl"
      />
      <div className="rounded-full border border-primary/40 bg-card p-2 shadow-[0_24px_70px_rgb(0_0_0/0.5),0_0_0_8px_rgb(113_151_208/0.04)]">
        <Image
          src={src}
          alt={`Portrait of ${name}`}
          width={272}
          height={272}
          priority
          className="size-36 rounded-full object-cover sm:size-64"
        />
      </div>
    </div>
  );
}
