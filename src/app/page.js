import Link from "next/link";
import WorkoutCard from "@/components/WorkoutCard";

async function getWorkouts() {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("could not load workouts");
  }

  return response.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="bg-[#0d0f12]">
      <section className="mx-auto max-w-[1232px] px-0 pb-20 pt-10">
        <div className="grid min-h-[488px] overflow-hidden rounded-3xl border border-[#272b31] bg-[#15181d] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex flex-col justify-center px-8 py-12 lg:px-8">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-[#ccff00]">
              Workout Library
            </p>

            <h1 className="max-w-[610px] font-display text-5xl font-bold uppercase leading-[0.96] text-white lg:text-[58px]">
              Train with intent. Log every set.
            </h1>

            <p className="mt-6 max-w-[560px] text-base leading-7 text-[#9aa3ad]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="mt-8 flex w-fit items-center gap-5 rounded-lg px-5 py-3 text-sm font-bold uppercase text-[#0d0f12]"
              style={{ backgroundColor: "#ccff00" }}
            >
              Browse workouts
              <span aria-hidden="true" className="text-lg leading-none">
                ↓
              </span>
            </Link>
          </div>

          <div className="flex min-h-[488px] items-center justify-center overflow-hidden">
            <img
              src="/banner.png"
              alt="Workout anatomy illustration"
              className="h-auto max-h-[410px] w-auto max-w-[440px] object-contain"
            />
          </div>
        </div>
      </section>

      <section
        id="library"
        className="mx-auto max-w-[1448px] px-6 pb-20 sm:px-8"
      >
        <div className="mb-8">
          <h2 className="font-display text-4xl font-bold uppercase text-white sm:text-5xl">
            The Library
          </h2>

          <p className="mt-2 text-[#9aa3ad]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}
