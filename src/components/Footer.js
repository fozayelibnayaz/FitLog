import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#272b31] bg-[#0d0f12]">
      <div className="flex min-h-[110px] w-full flex-col items-start justify-center gap-5 px-5 sm:px-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={20}
            height={20}
            style={{
              width: "20px",
              height: "20px",
              objectFit: "contain",
            }}
          />

          <span className="font-display text-sm font-bold uppercase text-white">
            FitLog
          </span>
        </div>

        <p className="text-left text-xs text-[#9aa3ad] sm:text-sm md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}