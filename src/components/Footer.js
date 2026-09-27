import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#272b31] bg-[#0d0f12]">
      <div className="flex min-h-[64px] w-full flex-col items-start justify-center gap-3 px-4 py-4 sm:min-h-[80px] sm:px-6 lg:min-h-[90px] lg:flex-row lg:items-center lg:justify-between lg:px-8">
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

        <p className="text-left text-[11px] text-[#9aa3ad] sm:text-xs lg:text-sm md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}