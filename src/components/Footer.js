import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#272b31] bg-[#0d0f12]">
      <div className="mx-auto flex min-h-[110px] max-w-[1400px] items-center justify-between px-6 sm:px-10">
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

        <p className="text-right text-xs text-[#9aa3ad] sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}