import { notFound } from "next/navigation";
import PlanButtons from "@/components/PlanButtons";

async function getWorkout(id) {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function WorkoutDetails({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="bg-[#0d0f12]">
      <section className="w-full px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 xl:gap-14">
          {/* FIX: smaller on mobile */}
          <div className="aspect-[4/3] max-h-[300px] overflow-hidden rounded-2xl bg-[#15181d] sm:max-h-[420px] lg:max-h-none lg:aspect-[588/735]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <h1 className="font-display text-3xl font-bold uppercase leading-[0.95] text-white sm:text-4xl lg:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-[#9aa3ad] sm:text-sm sm:leading-7">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-medium text-[#0d0f12] sm:px-4 sm:py-1.5 sm:text-sm"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#272b31] bg-[#15181d] sm:mt-8">
              <div>
                <SpecRow label="Equipment" value={workout.equipment} />
                <SpecRow label="Difficulty" value={workout.difficulty} />
                <SpecRow label="Sets" value={workout.sets} />
                <SpecRow label="Reps" value={workout.reps} />
                <SpecRow label="Duration" value={`${workout.duration} min`} />
                <SpecRow
                  label="Calories"
                  value={`${workout.caloriesBurned} kcal`}
                />
                <SpecRow label="Rating" value={workout.rating} />
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <h2 className="font-display text-xl font-semibold uppercase text-white sm:text-2xl">
                Instructions
              </h2>

              <ol className="mt-4 list-decimal space-y-3 pl-5 text-[13px] leading-6 text-[#9aa3ad] sm:text-sm">
                {workout.instructions.map((instruction) => (
                  <li key={instruction} className="pl-1 sm:pl-2">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <PlanButtons workout={workout} />
          </div>
        </div>
      </section>
    </main>
  );
}

function SpecRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#272b31] px-4 py-3.5 last:border-b-0 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#9aa3ad] sm:text-xs">
        {label}
      </span>
      <span className="max-w-[60%] text-right text-sm text-white sm:text-[15px] lg:text-base">{value}</span>
    </div>
  );
}