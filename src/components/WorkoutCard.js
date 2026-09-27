import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-[#272b31] bg-[#15181d] transition hover:-translate-y-1 hover:border-[#ccff00]"
    >
      <div className="h-48 overflow-hidden bg-[#0d0f12] sm:h-52 lg:h-56">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[10px] font-semibold uppercase text-[#0d0f12] sm:px-3 sm:text-xs"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h2 className="font-display text-[18px] font-semibold uppercase leading-tight text-white sm:text-xl lg:text-2xl">
          {workout.name}
        </h2>

        <p className="mt-1.5 text-xs text-[#9aa3ad] sm:text-sm">{workout.equipment}</p>

        <div className="my-4 border-t border-[#272b31] sm:my-5" />

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#9aa3ad] sm:gap-4 sm:text-xs lg:text-sm">
          <span className="flex items-center gap-1">
            <span aria-hidden="true">◷</span>
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <span aria-hidden="true">♨</span>
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <span aria-hidden="true">☆</span>
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}