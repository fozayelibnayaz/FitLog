export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0d0f12]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#272b31] border-t-[#ccff00]" />

        <p className="text-sm text-[#9aa3ad]">Loading workouts...</p>
      </div>
    </main>
  );
}