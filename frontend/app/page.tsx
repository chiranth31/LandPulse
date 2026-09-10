"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  FileText,
  Gauge,
  LayoutDashboard,
  Lightbulb,
  Map,
  MapPin,
  Menu,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

const projects = [
  {
    id: "LP-047",
    name: "NH-48 Expansion",
    location: "Bengaluru Rural",
    risk: 82,
    delay: 74,
    cause: "Compensation",
    status: "Critical",
  },
  {
    id: "LP-031",
    name: "Industrial Corridor",
    location: "Tumakuru",
    risk: 76,
    delay: 61,
    cause: "Legal dispute",
    status: "Critical",
  },
  {
    id: "LP-062",
    name: "Metro Extension",
    location: "Mysuru",
    risk: 64,
    delay: 42,
    cause: "Approval",
    status: "High",
  },
  {
    id: "LP-018",
    name: "Ring Road Phase II",
    location: "Dharwad",
    risk: 58,
    delay: 31,
    cause: "Rehabilitation",
    status: "Medium",
  },
];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Projects", icon: Building2, href: "/projects" },
  { label: "Risk Map", icon: Map, href: "/risk-map" },
  { label: "AI Predictions", icon: BrainCircuit, href: "/ai-predictions" },
  { label: "Analytics", icon: Activity, href: "/analytics" },
  { label: "Interventions", icon: Target, href: "/interventions" },
  { label: "Stakeholders", icon: Users, href: "/stakeholders" },
  { label: "Alerts", icon: Bell, href: "/alerts" },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [search, setSearch] = useState("");
  const [simulate, setSimulate] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProjects = projects.filter((project) =>
    `${project.name} ${project.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const simulatedRisk = simulate ? 39 : selectedProject.risk;
  const simulatedDelay = simulate ? 29 : selectedProject.delay;

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-[#0b1730]">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col bg-[#071426] text-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* LOGO */}
        <div className="flex h-[84px] items-center border-b border-white/10 px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#08b982] shadow-lg shadow-emerald-500/20">
            <Map className="h-6 w-6 text-white" />
          </div>

          <div className="ml-3">
            <div className="text-[21px] font-extrabold tracking-tight">
              LandPulse
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Acquisition Intelligence
            </div>
          </div>

          <button
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          <div className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Command Center
          </div>

          <nav className="space-y-1">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.label;

              return (
                <Link
                  href={item.href}
                  key={item.label}
                  onClick={() => {
                    setActiveNav(item.label);
                    setSidebarOpen(false);
                  }}
                  className={`group flex w-full items-center rounded-xl px-3 py-3 text-left transition ${
                    active
                      ? "bg-[#063c42] text-[#12d99b]"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={19} strokeWidth={1.8} />
                  <span className="ml-3 text-sm font-medium">
                    {item.label}
                  </span>

                  {active && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-[#12d99b]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mb-3 mt-8 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Intelligence
          </div>

          <nav className="space-y-1">
            {navItems.slice(4, 8).map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.label;

              return (
                <Link
                  href={item.href}
                  key={item.label}
                  onClick={() => {
                    setActiveNav(item.label);
                    setSidebarOpen(false);
                  }}
                  className={`group flex w-full items-center rounded-xl px-3 py-3 text-left transition ${
                    active
                      ? "bg-[#063c42] text-[#12d99b]"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={19} strokeWidth={1.8} />
                  <span className="ml-3 text-sm font-medium">
                    {item.label}
                  </span>

                  {item.label === "Alerts" && (
                    <span className="ml-auto rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400">
                      06
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mb-3 mt-8 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            System
          </div>

          <button
            onClick={() => setActiveNav("Settings")}
            className="flex w-full items-center rounded-xl px-3 py-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <Settings size={19} />
            <span className="ml-3 text-sm font-medium">Settings</span>
          </button>
        </div>

        {/* AI ENGINE */}
        <div className="m-4 rounded-2xl border border-emerald-400/20 bg-[#0c2035] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10">
              <Sparkles className="h-5 w-5 text-emerald-400" />
            </div>

            <div>
              <div className="text-sm font-bold">AI Prediction Engine</div>
              <div className="text-[11px] text-slate-400">
                Predictive intelligence
              </div>
            </div>

            <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
          </div>

          <div className="mt-4 flex justify-between text-[11px]">
            <span className="text-slate-400">Model confidence</span>
            <span className="font-bold text-emerald-400">91.4%</span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-700">
            <div className="h-full w-[91.4%] rounded-full bg-emerald-400" />
          </div>

          <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-400">
            <CheckCircle2 size={12} />
            System operational
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="lg:ml-[270px]">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-[84px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-4">
            <button
              className="rounded-lg border border-slate-200 p-2 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                Ministry Monitoring Portal
              </div>
              <h1 className="text-xl font-bold tracking-tight">
                Land Acquisition Command Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <div className="relative hidden md:block">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search project..."
                className="h-10 w-[230px] rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white">
              <Bell size={19} className="text-slate-600" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#09172b] text-xs font-bold text-white">
              AD
            </div>
          </div>
        </header>

        <div className="p-5 lg:p-8">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-[26px] bg-[#081528] px-7 py-8 text-white shadow-xl shadow-slate-300/30 lg:px-9">
            <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute bottom-[-100px] left-[40%] h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  PREDICTION ENGINE ACTIVE
                </div>

                <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Predict before
                  <br />
                  <span className="text-emerald-400">it delays.</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 lg:text-base">
                  LandPulse combines project, compensation, legal, approval and
                  rehabilitation signals to identify acquisition risks before
                  they become critical delays.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300">
                    <BrainCircuit size={15} className="text-emerald-400" />
                    Explainable AI
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300">
                    <MapPin size={15} className="text-emerald-400" />
                    Geospatial Risk
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300">
                    <Target size={15} className="text-emerald-400" />
                    Intervention
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    Last model run
                  </div>
                  <div className="mt-1 text-lg font-bold">18:42 IST</div>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-400">
                    <CheckCircle2 size={11} />
                    Updated today
                  </div>
                </div>

                <button
                  onClick={() => setActiveNav("AI Predictions")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
                >
                  Analyze Portfolio
                  <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
          </section>

          {/* KPI SECTION */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={<Building2 size={20} />}
              iconClass="bg-blue-50 text-blue-600"
              label="Active Projects"
              value="128"
              description="11 projects added this month"
              trend="+8.4%"
              positive
            />

            <MetricCard
              icon={<ShieldAlert size={20} />}
              iconClass="bg-red-50 text-red-500"
              label="High-Risk Projects"
              value="24"
              description="18.7% of monitored portfolio"
              trend="+3.2%"
              positive={false}
            />

            <MetricCard
              icon={<CircleGauge size={20} />}
              iconClass="bg-amber-50 text-amber-600"
              label="Predicted Delay"
              value="47 days"
              description="Average projected acquisition delay"
              trend="-6.2%"
              positive
            />

            <MetricCard
              icon={<CheckCircle2 size={20} />}
              iconClass="bg-emerald-50 text-emerald-600"
              label="On Track"
              value="79"
              description="61.7% of monitored projects"
              trend="+4.1%"
              positive
            />
          </section>

          {/* PRIORITY QUEUE */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Priority Intervention Queue</h3>
                    <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-500">
                      ACTION REQUIRED
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Projects requiring immediate attention
                  </p>
                </div>

                <button
                  onClick={() => setActiveNav("Interventions")}
                  className="flex items-center gap-1 text-xs font-semibold text-emerald-600"
                >
                  View all
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400">
                      <th className="pb-3 font-semibold">Project</th>
                      <th className="pb-3 font-semibold">Risk</th>
                      <th className="pb-3 font-semibold">Delay</th>
                      <th className="pb-3 font-semibold">Main Cause</th>
                      <th className="pb-3 text-right font-semibold">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr
                        key={project.id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="py-4">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="text-left"
                          >
                            <div className="text-sm font-bold hover:text-emerald-600">
                              {project.name}
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                              <MapPin size={10} />
                              {project.location}
                            </div>
                          </button>
                        </td>

                        <td className="py-4">
                          <RiskBadge risk={project.risk} />
                        </td>

                        <td className="py-4 text-sm font-bold">
                          {project.delay} days
                        </td>

                        <td className="py-4">
                          <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                            {project.cause}
                          </span>
                        </td>

                        <td className="py-4 text-right">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-bold text-white transition hover:bg-emerald-600"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RISK DISTRIBUTION */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
              <div>
                <h3 className="text-lg font-bold">Risk Distribution</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Current portfolio classification
                </p>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <div
                  className="relative flex h-48 w-48 items-center justify-center rounded-full"
                  style={{
                    background:
                      "conic-gradient(#ef4444 0deg 67.5deg, #f59e0b 67.5deg 194deg, #10b981 194deg 360deg)",
                  }}
                >
                  <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-3xl font-extrabold">128</span>
                    <span className="text-xs text-slate-400">Projects</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <RiskLegend color="bg-red-500" label="High Risk" value="24" />
                <RiskLegend color="bg-amber-500" label="Medium Risk" value="45" />
                <RiskLegend color="bg-emerald-500" label="Low Risk" value="59" />
              </div>
            </div>
          </section>

          {/* RISK FORECAST + MAP */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_1fr]">
            {/* FORECAST */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Portfolio Risk Forecast</h3>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                      IMPROVING
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Historical risk and projected portfolio trajectory
                  </p>
                </div>

                <TrendingDown className="text-emerald-500" size={20} />
              </div>

              <div className="mt-6">
                <div className="relative h-[250px]">
                  {/* GRID */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[80, 60, 40, 20, 0].map((num) => (
                      <div
                        key={num}
                        className="flex items-center gap-3"
                      >
                        <span className="w-6 text-right text-[10px] text-slate-400">
                          {num}
                        </span>
                        <div className="h-px flex-1 border-t border-dashed border-slate-200" />
                      </div>
                    ))}
                  </div>

                  {/* SVG CHART */}
                  <svg
                    viewBox="0 0 700 230"
                    className="absolute left-8 right-0 top-0 h-full w-[calc(100%-32px)] overflow-visible"
                  >
                    <path
                      d="M0 150 C100 145 150 155 220 150 C310 145 370 140 440 125 C530 108 610 90 700 70 L700 230 L0 230 Z"
                      fill="rgba(16,185,129,0.08)"
                    />

                    <path
                      d="M0 150 C100 145 150 155 220 150 C310 145 370 140 440 125 C530 108 610 90 700 70"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="4"
                    />

                    <path
                      d="M0 135 C100 140 150 145 220 140 C310 135 370 140 440 145 C530 150 610 155 700 160"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                    />

                    <path
                      d="M0 95 C100 100 150 110 220 115 C310 120 370 122 440 125 C530 130 610 138 700 145"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                    />

                    <circle cx="700" cy="70" r="5" fill="#10b981" />
                    <circle cx="700" cy="160" r="5" fill="#f59e0b" />
                    <circle cx="700" cy="145" r="5" fill="#ef4444" />
                  </svg>
                </div>

                <div className="ml-9 mt-2 flex justify-between text-[10px] text-slate-400">
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-5 text-xs">
                  <ChartLegend color="bg-emerald-500" label="Low risk" />
                  <ChartLegend color="bg-amber-500" label="Medium risk" />
                  <ChartLegend color="bg-red-500" label="High risk" />
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">Acquisition Risk Map</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    High-risk acquisition zones
                  </p>
                </div>

                <button
                  onClick={() => setActiveNav("Risk Map")}
                  className="text-xs font-semibold text-emerald-600"
                >
                  Open map →
                </button>
              </div>

              <div className="relative mt-5 h-[270px] overflow-hidden rounded-2xl border border-slate-200 bg-[#e8eef3]">
                {/* MAP GRID */}
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                  }}
                />

                {/* ROAD LINES */}
                <div className="absolute left-[-20px] top-[120px] h-1 w-[120%] rotate-[8deg] bg-white shadow-sm" />
                <div className="absolute left-[40%] top-[-50px] h-[130%] w-1 rotate-[25deg] bg-white shadow-sm" />

                {/* MARKERS */}
                <MapMarker left="23%" top="35%" type="high" />
                <MapMarker left="65%" top="25%" type="high" />
                <MapMarker left="44%" top="65%" type="medium" />
                <MapMarker left="75%" top="62%" type="low" />
                <MapMarker left="32%" top="72%" type="medium" />

                {/* LEGEND */}
                <div className="absolute bottom-4 left-4 rounded-xl border border-white bg-white/95 p-3 shadow-lg">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Risk level
                  </div>

                  <div className="space-y-1.5">
                    <MapLegend color="bg-red-500" label="Critical" />
                    <MapLegend color="bg-amber-500" label="High / Medium" />
                    <MapLegend color="bg-emerald-500" label="Low" />
                  </div>
                </div>

                <div className="absolute right-4 top-4 rounded-lg bg-white/90 px-3 py-2 text-[10px] font-semibold text-slate-600 shadow">
                  24 high-risk zones
                </div>
              </div>
            </div>
          </section>

          {/* SELECTED PROJECT / EXPLAINABLE AI */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
            {/* PROJECT */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                    Selected project
                  </div>

                  <h3 className="mt-1 text-2xl font-extrabold">
                    {selectedProject.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={12} />
                    {selectedProject.location}
                    <span className="mx-1">•</span>
                    {selectedProject.id}
                  </div>
                </div>

                <RiskBadge risk={selectedProject.risk} />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    Delay probability
                  </div>
                  <div className="mt-1 text-2xl font-extrabold">
                    {simulatedRisk}%
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    Predicted delay
                  </div>
                  <div className="mt-1 text-2xl font-extrabold">
                    {simulatedDelay} days
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-semibold">Acquisition progress</span>
                  <span className="text-slate-500">62%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[62%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <MiniStat label="Affected parcels" value="18" />
                <MiniStat label="Legal cases" value="3" />
                <MiniStat label="Compensation" value="62%" />
              </div>
            </div>

            {/* EXPLAIN */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                  <BrainCircuit size={19} className="text-purple-600" />
                </div>

                <div>
                  <h3 className="text-lg font-bold">Why is it at risk?</h3>
                  <p className="text-xs text-slate-500">
                    Explainable AI risk contributors
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <Factor
                  label="Compensation pending"
                  value={31}
                  color="bg-red-500"
                />

                <Factor
                  label="Legal disputes"
                  value={24}
                  color="bg-orange-500"
                />

                <Factor
                  label="Approval delay"
                  value={18}
                  color="bg-amber-500"
                />

                <Factor
                  label="Ownership complexity"
                  value={15}
                  color="bg-blue-500"
                />

                <Factor
                  label="Rehabilitation status"
                  value={12}
                  color="bg-purple-500"
                />
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-purple-100 bg-purple-50 p-4">
                <Lightbulb size={18} className="mt-0.5 text-purple-600" />
                <div>
                  <div className="text-xs font-bold text-purple-900">
                    AI Insight
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-purple-700">
                    Compensation completion is currently the strongest
                    contributor to predicted delay.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SIMULATOR */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-7">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                    <Zap size={19} className="text-emerald-600" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">
                      What-If Delay Simulator
                    </h3>
                    <p className="text-xs text-slate-500">
                      Simulate interventions before taking action
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSimulate(!simulate)}
                className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
                  simulate
                    ? "bg-slate-900 text-white"
                    : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
                }`}
              >
                {simulate ? "Reset Scenario" : "Run Intervention Simulation"}
              </button>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr_1fr]">
              <SimulationCard
                title="Resolve compensation"
                description="Prioritize compensation verification"
                active={simulate}
              />

              <SimulationCard
                title="Clear legal disputes"
                description="Escalate pending legal cases"
                active={simulate}
              />

              <SimulationCard
                title="Accelerate approvals"
                description="Flag delayed approvals"
                active={simulate}
              />
            </div>

            {simulate && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                    <TrendingDown size={21} />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-emerald-900">
                      Simulation result
                    </div>

                    <p className="mt-1 text-xs leading-5 text-emerald-700">
                      Resolving the identified intervention factors could
                      significantly reduce the predicted acquisition delay.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-white p-4">
                    <div className="text-[10px] uppercase text-slate-400">
                      Risk
                    </div>
                    <div className="mt-1 text-xl font-extrabold">
                      <span className="text-red-500">
                        {selectedProject.risk}%
                      </span>{" "}
                      <span className="text-slate-300">→</span>{" "}
                      <span className="text-emerald-600">39%</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <div className="text-[10px] uppercase text-slate-400">
                      Predicted delay
                    </div>
                    <div className="mt-1 text-xl font-extrabold">
                      <span className="text-red-500">
                        {selectedProject.delay}d
                      </span>{" "}
                      <span className="text-slate-300">→</span>{" "}
                      <span className="text-emerald-600">29d</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <div className="text-[10px] uppercase text-slate-400">
                      Potential delay avoided
                    </div>
                    <div className="mt-1 text-xl font-extrabold text-emerald-600">
                      45 days
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* RECOMMENDED ACTION */}
          <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <div className="rounded-2xl bg-[#081528] p-6 text-white shadow-xl">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
                  <Target className="text-emerald-400" size={20} />
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Prescribe
                  </div>
                  <h3 className="text-lg font-bold">
                    Recommended Intervention
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-300">
                Prioritize compensation verification for the 18 affected
                parcels in {selectedProject.name}.
              </p>

              <button className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold transition hover:bg-emerald-400">
                Create Intervention Plan
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <FileText size={19} className="text-blue-600" />
                <h3 className="text-lg font-bold">AI Early Warning</h3>
              </div>

              <div className="mt-5 flex gap-4 rounded-xl border border-red-100 bg-red-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
                  <AlertTriangle className="text-red-500" size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-bold text-red-900">
                      Risk escalation detected
                    </div>

                    <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-600">
                      CRITICAL
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-red-700">
                    {selectedProject.name} risk increased due to compensation
                    and legal bottlenecks.
                  </p>

                  <button className="mt-3 text-xs font-bold text-red-700 underline underline-offset-2">
                    Investigate project →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-200 py-5 text-[10px] text-slate-400 sm:flex-row">
            <span>LandPulse • Land Acquisition Intelligence Platform</span>
            <span>Prediction Engine • Operational • Last update 18:42 IST</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function MetricCard({
  icon,
  iconClass,
  label,
  value,
  description,
  trend,
  positive,
}: {
  icon: React.ReactNode;
  iconClass: string;
  label: string;
  value: string;
  description: string;
  trend: string;
  positive: boolean;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${
            positive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={11} />
          ) : (
            <ArrowDownRight size={11} />
          )}
          {trend}
        </div>
      </div>

      <div className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </div>

      <div className="mt-1 text-3xl font-extrabold tracking-tight">
        {value}
      </div>

      <div className="mt-2 text-xs text-slate-400">{description}</div>
    </div>
  );
}

function RiskBadge({ risk }: { risk: number }) {
  const critical = risk >= 75;
  const high = risk >= 60;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${
        critical
          ? "bg-red-50 text-red-600"
          : high
          ? "bg-amber-50 text-amber-600"
          : "bg-emerald-50 text-emerald-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          critical
            ? "bg-red-500"
            : high
            ? "bg-amber-500"
            : "bg-emerald-500"
        }`}
      />
      {risk}% Risk
    </span>
  );
}

function RiskLegend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
        {label}
      </div>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}

function ChartLegend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-slate-500">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </div>
  );
}

function MapMarker({
  left,
  top,
  type,
}: {
  left: string;
  top: string;
  type: "high" | "medium" | "low";
}) {
  const classes = {
    high: "bg-red-500 shadow-red-300",
    medium: "bg-amber-500 shadow-amber-300",
    low: "bg-emerald-500 shadow-emerald-300",
  };

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left, top }}
    >
      <div
        className={`h-5 w-5 rounded-full border-4 border-white shadow-lg ${classes[type]}`}
      />
      <div
        className={`absolute inset-[-7px] animate-ping rounded-full opacity-20 ${classes[type]}`}
      />
    </div>
  );
}

function MapLegend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[10px] text-slate-600">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </div>
  );
}

function Factor({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-bold text-slate-800">{value}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="text-[9px] uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-sm font-extrabold">{value}</div>
    </div>
  );
}

function SimulationCard({
  title,
  description,
  active,
}: {
  title: string;
  description: string;
  active: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 transition ${
        active
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-bold">{title}</div>
          <div className="mt-1 text-[11px] text-slate-500">
            {description}
          </div>
        </div>

        <div
          className={`flex h-7 w-12 items-center rounded-full p-1 ${
            active ? "bg-emerald-500" : "bg-slate-300"
          }`}
        >
          <div
            className={`h-5 w-5 rounded-full bg-white shadow transition ${
              active ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}