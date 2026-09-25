"use client";

import Link from "next/link";

export default function PlanRow({
  workout,
  isSaved,
  onDone,
  onRemove,
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#272b31] bg-[#15181d] p-4 sm:flex-row sm:items-center">
      <img
        src={workout.image}
        alt={workout.name}
        className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-32"
      />

      <div className="min-w-0 flex-1">
        <h2 className="font-display text-2xl font-semibold uppercase leading-tight text-white">
          {workout.name}
        </h2>

        <p className="mt-1 text-sm text-[#9aa3ad]">{workout.equipment}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#9aa3ad]">
          <span>◷ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-lg border border-[#50555d] px-3 py-2 text-xs font-bold uppercase text-white hover:border-[#ccff00] hover:text-[#ccff00]"
        >
          View Details
        </Link>

        {!isSaved && (
          <button
            type="button"
            onClick={() => onDone(workout.id)}
            className="rounded-lg bg-[#ccff00] px-3 py-2 text-xs font-bold uppercase text-[#0d0f12]"
          >
            ✓ Mark as Done
          </button>
        )}

        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#50555d] text-lg text-[#9aa3ad] hover:border-red-400 hover:text-red-400"
          aria-label={`Remove ${workout.name}`}
        >
          ×
        </button>
      </div>
    </div>
  );
}