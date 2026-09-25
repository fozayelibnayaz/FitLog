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
      <section className="w-full px-5 pb-20 pt-8 sm:px-10 lg:pt-14">
       <div className="mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="overflow-hidden rounded-2xl bg-[#15181d]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full min-h-[480px] w-full object-cover lg:min-h-[620px]"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] text-white sm:text-6xl">
              {workout.name}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-[#9aa3ad]">
              {workout.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-4 py-1.5 text-sm font-medium text-[#0d0f12]"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#272b31] bg-[#15181d]">
              <div className="border-b border-[#272b31] px-6 py-4">
                <h2 className="font-display text-xl font-semibold uppercase text-white">
                  Key Specs
                </h2>
              </div>

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
                <SpecRow label="Rating" value={`★ ${workout.rating}`} />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-2xl font-semibold uppercase text-white">
                Instructions
              </h2>

              <ol className="mt-5 list-decimal space-y-4 pl-5 text-base leading-6 text-[#9aa3ad] marker:text-[#9aa3ad] marker:text-base">
                {workout.instructions.map((instruction) => (
                  <li key={instruction} className="pl-2">
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
    <div className="flex items-center justify-between gap-6 border-b border-[#272b31] px-6 py-5 last:border-b-0">
      <span className="text-sm font-semibold uppercase tracking-wide text-[#9aa3ad]">
        {label}
      </span>

      <span className="text-right text-base text-white">{value}</span>
    </div>
  );
}
