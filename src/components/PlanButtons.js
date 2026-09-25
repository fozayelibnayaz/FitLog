"use client";

import { usePlan } from "@/context/PlanContext";

export default function PlanButtons({ workout }) {
  const { addToPlan, saveForLater, inPlan, inSaved, plan } = usePlan();

  const alreadyInPlan = inPlan(workout.id);
  const alreadySaved = inSaved(workout.id);
  const planIsFull = plan.length >= 5;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={alreadyInPlan || planIsFull}
        className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-[#0d0f12] transition disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: "#ccff00" }}
      >
        <img
          src="/SVG.png"
          alt=""
          className="h-[18px] w-[18px] object-contain"
        />

        <span>
          {alreadyInPlan
            ? "Already in today's plan"
            : planIsFull
              ? "Today's plan is full"
              : "Add to today's plan"}
        </span>
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout)}
        disabled={alreadySaved}
        className="inline-flex items-center gap-2 rounded-lg border border-[#3b424c] px-5 py-3 text-sm font-medium text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <img
          src="/vector.png"
          alt=""
          className="h-[18px] w-[18px] object-contain"
        />

        <span>{alreadySaved ? "Already saved" : "Save for later"}</span>
      </button>
    </div>
  );
}