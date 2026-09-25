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
      <div className="flex min-h-[78px] w-full items-center justify-between gap-4 px-5 sm:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={30}
            height={30}
            priority
            style={{
              width: "30px",
              height: "30px",
              objectFit: "contain",
            }}
          />

          <span className="font-display text-lg font-bold uppercase text-white">
            FitLog
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="flex h-7 items-center rounded-full px-4 py-[6px] text-sm font-medium leading-4"
            style={{
              backgroundColor: workoutActive ? "#1b2a0d" : "transparent",
              color: workoutActive ? "#ccff00" : "#9aa3ad",
            }}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="flex h-7 items-center rounded-full px-4 py-[6px] text-sm font-medium leading-4"
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
            className="flex h-7 items-center rounded-full px-4 py-[6px] text-sm font-semibold leading-4"
            style={{
              backgroundColor: "#ccff00",
              color: "#0d0f12",
            }}
          >
            Plan&nbsp; {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="flex h-7 items-center rounded-full border border-[#272b31] px-4 py-[6px] text-sm font-semibold leading-4 text-white"
          >
            Saved&nbsp; {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}