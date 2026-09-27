"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PlanRow from "@/components/PlanRow";
import { usePlan } from "@/context/PlanContext";

export default function MyPlan() {
  const { plan, saved, markDone, removeFromPlan, removeFromSaved } = usePlan();

  const [workouts, setWorkouts] = useState([]);
  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog",
        );
        const data = await response.json();
        setWorkouts(data);
      } catch {
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    }
    loadWorkouts();
  }, []);

  const currentIds = activeTab === "today" ? plan : saved;

  const currentWorkouts = useMemo(() => {
    const list = workouts.filter((workout) =>
      currentIds.includes(workout.id),
    );
    return [...list].sort((first, second) => {
      if (sortBy === "calories") {
        return second.caloriesBurned - first.caloriesBurned;
      }
      if (sortBy === "rating") {
        return second.rating - first.rating;
      }
      return first.duration - second.duration;
    });
  }, [workouts, currentIds, sortBy]);

  const planWorkouts = workouts.filter((workout) => plan.includes(workout.id));

  const totalMinutes = planWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = planWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  function handleRemove(id) {
    if (activeTab === "today") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
  }

  return (
    <main className="bg-[#0d0f12]">
      <section className="w-full px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="w-full">
          <h1 className="font-display text-[28px] font-bold uppercase text-white sm:text-4xl lg:text-5xl">
            My Plan
          </h1>

          <p className="mt-2 text-xs text-[#9aa3ad] sm:text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>

          {/* FIX: grid-cols-3 on mobile too, not sm:grid-cols-3 */}
          <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-2xl border border-[#272b31] bg-[#15181d] lg:mt-8">
            <StatCard label="Exercises" value={plan.length} />
            <StatCard label="Minutes" value={totalMinutes} />
            <StatCard label="Calories" value={totalCalories} />
          </div>

          {/* FIX: row on mobile too, smaller */}
          <div className="mt-6 flex flex-row items-center justify-between gap-3 border-b border-[#272b31] pb-4">
            <div className="flex w-fit items-center rounded-xl border border-[#272b31] bg-[#15181d] p-1">
              <button
                type="button"
                onClick={() => setActiveTab("today")}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-medium sm:px-4 sm:py-2 sm:text-sm ${
                  activeTab === "today"
                    ? "bg-[#252b35] text-white"
                    : "text-[#9aa3ad]"
                }`}
              >
                Today&apos;s Plan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-medium sm:px-4 sm:py-2 sm:text-sm ${
                  activeTab === "saved"
                    ? "bg-[#252b35] text-white"
                    : "text-[#9aa3ad]"
                }`}
              >
                Saved
              </button>
            </div>

            <label className="flex items-center gap-1.5 text-[11px] text-[#9aa3ad] sm:gap-3 sm:text-sm">
              <span className="hidden sm:inline">Sort By</span>
              <span className="sm:hidden">Sort</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-lg border border-[#272b31] bg-[#15181d] px-2 py-1.5 text-[11px] text-white outline-none sm:px-3 sm:py-2 sm:text-sm"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </label>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="rounded-2xl border border-[#272b31] bg-[#15181d] px-5 py-12 text-center text-sm text-[#9aa3ad]">
                Loading workouts...
              </div>
            ) : currentWorkouts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {currentWorkouts.map((workout) => (
                  <PlanRow
                    key={workout.id}
                    workout={workout}
                    isSaved={activeTab === "saved"}
                    onDone={markDone}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }) {
  const isExercises = label === "Exercises";
  return (
    <div className="border-r border-[#272b31] p-3 last:border-r-0 sm:p-5 lg:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9aa3ad] sm:text-xs">
        {label}
      </p>
      <p
        className={`mt-1 font-display text-2xl font-bold sm:mt-2 sm:text-4xl ${
          isExercises ? "text-[#ccff00]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[#50555d] px-5 py-12 text-center sm:py-16">
      <h2 className="font-display text-xl font-semibold uppercase text-white sm:text-2xl">
        Nothing here yet
      </h2>
      <p className="mt-2 text-xs text-[#9aa3ad] sm:text-sm">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex rounded-lg px-4 py-2.5 text-xs font-bold uppercase text-[#0d0f12] sm:px-5 sm:py-3 sm:text-sm"
        style={{ backgroundColor: "#ccff00" }}
      >
        Go to workouts
      </Link>
    </div>
  );
}