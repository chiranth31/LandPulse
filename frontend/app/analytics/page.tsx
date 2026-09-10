export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
        Intelligence & Analytics
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        Portfolio Analytics
      </h1>

      <p className="mt-2 text-slate-500">
        Analyse acquisition risk, delay trends and project performance.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Portfolio Health</p>
          <h2 className="mt-2 text-4xl font-bold">78.6%</h2>
          <p className="mt-2 text-emerald-600">Improving</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">High-Risk Projects</p>
          <h2 className="mt-2 text-4xl font-bold">24</h2>
          <p className="mt-2 text-red-500">Requires attention</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Average Delay</p>
          <h2 className="mt-2 text-4xl font-bold">47 days</h2>
          <p className="mt-2 text-emerald-600">↓ 6.2%</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Portfolio Risk Trend</h2>

        <div className="mt-8 flex h-64 items-end gap-6">
          {[70, 65, 58, 52, 45, 38].map((height, i) => (
            <div key={i} className="flex flex-1 items-end">
              <div
                className="w-full rounded-t-lg bg-emerald-500"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-between text-sm text-slate-400">
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
        </div>
      </div>
    </main>
  );
}