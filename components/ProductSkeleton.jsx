export default function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#e1e8e1] bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-2xl bg-[#f0f5f0]" />

        <div className="flex-1">
          <div className="h-5 w-2/3 rounded bg-[#f0f5f0]" />
          <div className="mt-3 h-4 w-1/3 rounded bg-[#f0f5f0]" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="h-6 w-24 rounded bg-[#f0f5f0]" />
        <div className="h-7 w-20 rounded-full bg-[#f0f5f0]" />
      </div>
    </div>
  );
}