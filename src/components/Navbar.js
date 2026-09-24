"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const workoutActive = pathname === "/";
  const planActive = pathname === "/my-plan";

  return (
    <header className="border-b border-[#272b31] bg-[#0d0f12]">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={24}
            height={24}
            priority
            style={{
              width: "24px",
              height: "24px",
              objectFit: "contain",
            }}
          />

          <span className="font-display text-base font-bold uppercase text-white">
            FitLog
          </span>
        </Link>

        <nav className="flex h-7 items-center gap-1">
          <Link
            href="/"
            className="flex h-7 items-center rounded-full px-4 text-base font-medium"
            style={{
              backgroundColor: workoutActive ? "#1b2a0d" : "transparent",
              color: workoutActive ? "#ccff00" : "#9aa3ad",
            }}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="flex h-7 items-center rounded-full px-4 text-base font-medium"
            style={{
              backgroundColor: planActive ? "#1b2a0d" : "transparent",
              color: planActive ? "#ccff00" : "#9aa3ad",
            }}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full px-3 py-1.5 text-xs font-bold"
            style={{
              backgroundColor: "#ccff00",
              color: "#0d0f12",
            }}
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-[#272b31] px-3 py-1.5 text-xs font-bold text-white"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}