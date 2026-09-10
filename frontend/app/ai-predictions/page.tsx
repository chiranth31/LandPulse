"use client";

import {
  BrainCircuit,
  TrendingUp,
  AlertTriangle,
  Target,
} from "lucide-react";

export default function AIPredictionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Predictive Intelligence
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          AI Predictions
        </h1>

        <p className="mt-2 text-slate-500">
          Identify projects likely to experience acquisition delays.
        </p>
      </div>

      {/* Model status */}
      <section className="mb-6 rounded-2xl bg-slate-950 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-500/15 p-3">
              <BrainCircuit className="text-emerald-400" size={28} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Prediction Engine Active
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                AI model is continuously evaluating acquisition risk signals.
              </p>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs uppercase text-slate-500">
              Model confidence
            </p>
            <p className="text-3xl font-bold text-emerald-400">
              91.4%
            </p>
          </div>
        </div>
      </section>

      {/* Prediction cards */}
      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <TrendingUp className="text-blue-500" size={25} />

          <p className="mt-5 text-sm text-slate-500">
            Projects predicted at risk
          </p>

          <p className="mt-1 text-4xl font-bold text-slate-900">
            24
          </p>

          <p className="mt-2 text-sm text-red-500">
            Requires attention
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <AlertTriangle className="text-orange-500" size={25} />

          <p className="mt-5 text-sm text-slate-500">
            Average predicted delay
          </p>

          <p className="mt-1 text-4xl font-bold text-slate-900">
            47
          </p>

          <p className="mt-2 text-sm text-slate-500">
            days
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <Target className="text-emerald-500" size={25} />

          <p className="mt-5 text-sm text-slate-500">
            On-track projects
          </p>

          <p className="mt-1 text-4xl font-bold text-slate-900">
            79
          </p>

          <p className="mt-2 text-sm text-emerald-600">
            61.7% of portfolio
          </p>
        </div>
      </section>

      {/* Prediction table */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Highest Priority Predictions
          </h2>

          <p className="text-sm text-slate-500">
            Projects where early intervention can reduce delay.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-slate-500">
                <th className="pb-3">Project</th>
                <th className="pb-3">Risk</th>
                <th className="pb-3">Predicted Delay</th>
                <th className="pb-3">Primary Cause</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-4 font-semibold">
                  NH-48 Expansion
                </td>
                <td className="py-4 text-red-600 font-semibold">
                  82%
                </td>
                <td className="py-4">
                  74 days
                </td>
                <td className="py-4">
                  Compensation
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4 font-semibold">
                  Industrial Corridor
                </td>
                <td className="py-4 text-orange-600 font-semibold">
                  68%
                </td>
                <td className="py-4">
                  51 days
                </td>
                <td className="py-4">
                  Legal Approval
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}