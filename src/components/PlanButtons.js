"use client";

import { usePlan } from "@/context/PlanContext";

export default function PlanButtons({ workout }) {
  // buttons for details page using real icons from public folder
  const { plan, saved, addToPlan, addToSaved, removeFromPlan, removeFromSaved } = usePlan();

  const alreadyInPlan = plan.some((w) => w.id === workout.id);
  const alreadySaved = saved.some((w) => w.id === workout.id);
  const planIsFull = plan.length >= 5 && !alreadyInPlan;

  return (
    <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
      <button
        onClick={() => (alreadyInPlan ? removeFromPlan(workout.id) : addToPlan(workout))}
        disabled={planIsFull}
        className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[11px] font-bold uppercase sm:w-auto sm:px-5 sm:text-xs lg:text-sm"
        style={{
          backgroundColor: alreadyInPlan ? "#272b31" : "#ccff00",
          color: alreadyInPlan ? "#fff" : "#0d0f12",
          opacity: planIsFull ? 0.5 : 1,
        }}
      >
        <img src="/SVG.png" alt="" className="h-4 w-4 object-contain" />
        {alreadyInPlan ? "In Plan" : "Add to Plan"}
      </button>

      <button
        onClick={() => (alreadySaved ? removeFromSaved(workout.id) : addToSaved(workout))}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#272b31] bg-[#15181d] px-4 py-3 text-[11px] font-bold uppercase text-white sm:w-auto sm:px-5 sm:text-xs lg:text-sm"
      >
        <img src="/Vector.png" alt="" className="h-4 w-4 object-contain" />
        {alreadySaved ? "Saved" : "Save for Later"}
      </button>
    </div>
  );
}