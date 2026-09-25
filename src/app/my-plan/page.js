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

  function handleDone(id) {
    markDone(id);
  }

  function handleRemove(id) {
    if (activeTab === "today") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
  }

  return (
    <main className="bg-[#0d0f12]">
      <section className="w-full px-5 pb-20 pt-10 sm:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div>
            <h1 className="font-display text-5xl font-bold uppercase text-white sm:text-6xl">
              My Plan
            </h1>

            <p className="mt-3 text-[#9aa3ad]">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <div className="mt-10 grid overflow-hidden rounded-2xl border border-[#272b31] bg-[#15181d] sm:grid-cols-3">
            <StatCard label="Exercises" value={plan.length} />
            <StatCard label="Minutes" value={totalMinutes} />
            <StatCard label="Calories" value={totalCalories} />
          </div>

<div className="mt-10 flex flex-col gap-4 border-b border-[#272b31] pb-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex w-fit items-center rounded-xl border border-[#272b31] bg-[#15181d] p-1">
  <button
    type="button"
    onClick={() => setActiveTab("today")}
    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
      activeTab === "today"
        ? "bg-[#252b35] text-white"
        : "text-[#9aa3ad] hover:text-white"
    }`}
  >
    Today&apos;s Plan
  </button>

  <button
    type="button"
    onClick={() => setActiveTab("saved")}
    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
      activeTab === "saved"
        ? "bg-[#252b35] text-white"
        : "text-[#9aa3ad] hover:text-white"
    }`}
  >
    Saved
  </button>
</div>

            <label className="flex items-center gap-3 text-sm text-[#9aa3ad]">
              Sort By
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-lg border border-[#272b31] bg-[#15181d] px-3 py-2 text-white outline-none"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </label>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="rounded-2xl border border-[#272b31] bg-[#15181d] px-5 py-12 text-center text-[#9aa3ad]">
                Loading workouts...
              </div>
            ) : currentWorkouts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {currentWorkouts.map((workout) => (
                  <PlanRow
                    key={workout.id}
                    workout={workout}
                    isSaved={activeTab === "saved"}
                    onDone={handleDone}
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
    <div className="border-b border-[#272b31] p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#9aa3ad]">
        {label}
      </p>

      <p
        className={`mt-2 font-display text-4xl font-bold ${
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
    <div className="rounded-2xl border border-dashed border-[#50555d] px-5 py-16 text-center">
      <h2 className="font-display text-3xl font-semibold uppercase text-white">
        Nothing here yet
      </h2>

      <p className="mt-3 text-[#9aa3ad]">
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex rounded-lg px-5 py-3 text-sm font-bold uppercase text-[#0d0f12]"
        style={{ backgroundColor: "#ccff00" }}
      >
        Go to workouts
      </Link>
    </div>
  );
}