"use client";

import { usePlan } from "@/context/PlanContext";

export default function PlanButtons({ workout }) {
  const {
    addToPlan,
    saveForLater,
    inPlan,
    inSaved,
    plan,
  } = usePlan();

  const alreadyInPlan = inPlan(workout.id);
  const alreadySaved = inSaved(workout.id);
  const planIsFull = plan.length >= 5;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={alreadyInPlan || planIsFull}
        className="rounded-lg px-5 py-3 text-sm font-bold uppercase text-[#0d0f12] transition disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: "#ccff00" }}
      >
        {alreadyInPlan
          ? "Already in today's plan"
          : planIsFull
            ? "Today's plan is full"
            : "＋ Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout)}
        disabled={alreadySaved}
        className="rounded-lg border border-[#50555d] px-5 py-3 text-sm font-bold uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {alreadySaved ? "Already saved" : "♡ Save for later"}
      </button>
    </div>
  );
}