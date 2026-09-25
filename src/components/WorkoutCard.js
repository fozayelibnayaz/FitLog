import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-[#272b31] bg-[#15181d] transition hover:-translate-y-1 hover:border-[#ccff00]"
    >
      <div className="h-56 overflow-hidden bg-[#0d0f12]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-semibold uppercase text-[#0d0f12]"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h2 className="font-display text-2xl font-semibold uppercase leading-tight text-white">
          {workout.name}
        </h2>

        <p className="mt-2 text-sm text-[#9aa3ad]">{workout.equipment}</p>

        <div className="my-5 border-t border-[#272b31]" />

        <div className="flex items-center gap-4 whitespace-nowrap text-sm text-[#9aa3ad]">
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