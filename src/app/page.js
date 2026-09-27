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
      <section className="w-full px-4 pb-10 pt-4 sm:px-6 sm:pb-16 sm:pt-6 lg:px-8 lg:pb-20 lg:pt-8">
        {/* FIX: side by side on mobile too */}
        <div className="grid grid-cols-[1.15fr_0.85fr] overflow-hidden rounded-2xl border border-[#272b31] bg-[#15181d] sm:rounded-3xl lg:min-h-[440px] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-14">
            <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#ccff00] sm:mb-3 sm:text-[11px]">
              Workout Library
            </p>

            <h1 className="max-w-[320px] font-display text-[20px] font-bold uppercase leading-[0.9] text-white sm:max-w-[400px] sm:text-[28px] lg:max-w-[560px] lg:text-[52px]">
              Train with intent. Log every set.
            </h1>

            <p className="mt-2 max-w-[300px] text-[10px] leading-4 text-[#9aa3ad] sm:mt-3 sm:max-w-[380px] sm:text-xs sm:leading-5 lg:mt-4 lg:max-w-[500px] lg:text-sm lg:leading-6">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="mt-3 flex w-fit rounded-md px-3 py-2 text-[9px] font-bold uppercase text-[#0d0f12] sm:mt-5 sm:px-4 sm:py-2.5 sm:text-xs"
              style={{ backgroundColor: "#ccff00" }}
            >
              Browse workouts
            </Link>
          </div>

          <div className="flex items-center justify-center p-2 sm:p-4 lg:p-0">
            <img
              src="/banner.png"
              alt="Workout anatomy illustration"
              className="h-auto max-h-[140px] w-full object-contain sm:max-h-[220px] lg:max-h-[380px] lg:max-w-[420px]"
            />
          </div>
        </div>
      </section>

      <section id="library" className="w-full px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <div className="mb-5 sm:mb-7">
          <h2 className="font-display text-[28px] font-bold uppercase text-white sm:text-4xl lg:text-5xl">
            The Library
          </h2>
          <p className="mt-1 text-xs text-[#9aa3ad] sm:text-sm lg:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}