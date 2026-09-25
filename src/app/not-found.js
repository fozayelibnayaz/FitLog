import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0d0f12] px-5 sm:px-10">
      <div className="w-full max-w-[560px] text-center">
        <p className="font-display text-8xl font-bold text-[#ccff00]">404</p>

        <h1 className="mt-4 font-display text-4xl font-bold uppercase text-white sm:text-5xl">
          Workout not found
        </h1>

        <p className="mt-4 text-base leading-7 text-[#9aa3ad]">
          This route does not point to a workout. Go back to the library and
          choose a lift from there.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg px-5 py-3 text-sm font-bold uppercase text-[#0d0f12]"
          style={{ backgroundColor: "#ccff00" }}
        >
          Go to workouts
        </Link>
      </div>
    </main>
  );
}