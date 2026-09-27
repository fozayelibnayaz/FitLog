"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [open, setOpen] = useState(false);

  const workoutActive = pathname === "/";
  const planActive = pathname === "/my-plan";

  return (
    <header className="border-b border-[#272b31] bg-[#0d0f12]">
      <div className="flex min-h-[64px] w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
            priority
            style={{
              width: "28px",
              height: "28px",
              objectFit: "contain",
            }}
          />
          <span className="font-display text-[17px] font-bold uppercase text-white sm:text-lg">
            FitLog
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="flex h-7 items-center rounded-full px-4 text-sm font-medium"
            style={{
              backgroundColor: workoutActive ? "#1b2a0d" : "transparent",
              color: workoutActive ? "#ccff00" : "#9aa3ad",
            }}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className="flex h-7 items-center rounded-full px-4 text-sm font-medium"
            style={{
              backgroundColor: planActive ? "#1b2a0d" : "transparent",
              color: planActive ? "#ccff00" : "#9aa3ad",
            }}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/my-plan" className="flex items-center gap-1.5 text-xs text-[#d5d8df] sm:text-sm">
            <span>Plan</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-xs font-bold text-[#0d0f12] sm:h-7 sm:min-w-7 sm:text-sm">{plan.length}</span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-1.5 text-xs text-[#d5d8df] sm:text-sm">
            <span>Saved</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#303640] px-1.5 text-xs sm:h-7 sm:min-w-7 sm:text-sm">{saved.length}</span>
          </Link>
          <button onClick={() => setOpen(!open)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#303640] text-white md:hidden">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#272b31] px-4 py-3 md:hidden">
          <Link href="/" onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 text-sm ${workoutActive ? "bg-[#15181d] text-[#ccff00]" : "text-[#9aa3ad]"}`}>Workouts</Link>
          <Link href="/my-plan" onClick={() => setOpen(false)} className={`mt-2 block rounded-xl px-4 py-3 text-sm ${planActive ? "bg-[#15181d] text-[#ccff00]" : "text-[#9aa3ad]"}`}>My Plan</Link>
        </div>
      )}
    </header>
  );
}