"use client";

import Link from "next/link";

export default function PlanRow({
  workout,
  isSaved,
  onDone,
  onRemove,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#272b31] bg-[#15181d] p-3 sm:flex-row sm:items-center sm:p-4">
      <img
        src={workout.image}
        alt={workout.name}
        className="h-40 w-full rounded-xl object-cover sm:h-20 sm:w-28 lg:h-24 lg:w-32"
      />

      <div className="min-w-0 flex-1">
        <h2 className="font-display text-[18px] font-semibold uppercase leading-tight text-white sm:text-xl lg:text-2xl">
          {workout.name}
        </h2>

        <p className="mt-1 text-xs text-[#9aa3ad] sm:text-sm">{workout.equipment}</p>

        <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-[#9aa3ad] sm:text-xs">
          <span>◷ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-lg border border-[#50555d] px-3 py-2 text-[11px] font-bold uppercase text-white hover:border-[#ccff00] hover:text-[#ccff00] sm:text-xs"
        >
          View Details
        </Link>

        {!isSaved && (
          <button
            type="button"
            onClick={() => onDone(workout.id)}
            className="rounded-lg bg-[#ccff00] px-3 py-2 text-[11px] font-bold uppercase text-[#0d0f12] sm:text-xs"
          >
            ✓ Mark as Done
          </button>
        )}

        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#50555d] text-sm text-[#9aa3ad] hover:border-red-400 hover:text-red-400 sm:h-9 sm:w-9"
          aria-label={`Remove ${workout.name}`}
        >
          ×
        </button>
      </div>
    </div>
  );
}