"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import {
  Search,
  Map,
  Satellite,
  Mountain,
  Moon,
  Layers3,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  X,
  ArrowUpRight,
  Target,
  RefreshCcw,
  MapPin,
  CalendarDays,
  Activity,
  Maximize2,
  Crosshair,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-400" />
        <p className="mt-4 text-sm font-medium text-slate-300">
          Initializing spatial intelligence...
        </p>
      </div>
    </div>
  ),
});

type Project = {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  progress: number;
  risk: number;
  delay: number;
  cause: string;
  status: string;
};

const projects: Project[] = [
  {
    id: "LP-047",
    name: "NH-48 Expansion",
    location: "Bengaluru Rural",
    lat: 13.1986,
    lng: 77.7066,
    progress: 62,
    risk: 82,
    delay: 74,
    cause: "Compensation",
    status: "Critical",
  },
  {
    id: "LP-052",
    name: "Industrial Corridor",
    location: "Tumakuru",
    lat: 13.3379,
    lng: 77.1173,
    progress: 71,
    risk: 76,
    delay: 61,
    cause: "Legal dispute",
    status: "Critical",
  },
  {
    id: "LP-031",
    name: "Metro Extension",
    location: "Mysuru",
    lat: 12.2958,
    lng: 76.6394,
    progress: 81,
    risk: 64,
    delay: 42,
    cause: "Approval",
    status: "High Risk",
  },
  {
    id: "LP-068",
    name: "Ring Road Phase II",
    location: "Dharwad",
    lat: 15.4589,
    lng: 75.0078,
    progress: 88,
    risk: 58,
    delay: 31,
    cause: "Ownership",
    status: "Medium",
  },
  {
    id: "LP-021",
    name: "Coastal Highway",
    location: "Udupi",
    lat: 13.3409,
    lng: 74.7421,
    progress: 91,
    risk: 31,
    delay: 14,
    cause: "Rehabilitation",
    status: "On Track",
  },
  {
    id: "LP-074",
    name: "Airport Connectivity",
    location: "Mangaluru",
    lat: 12.9141,
    lng: 74.856,
    progress: 77,
    risk: 47,
    delay: 26,
    cause: "Compensation",
    status: "Medium",
  },
  {
    id: "LP-083",
    name: "Bengaluru Peripheral Ring Road",
    location: "Bengaluru Rural",
    lat: 13.115,
    lng: 77.55,
    progress: 54,
    risk: 88,
    delay: 67,
    cause: "Land ownership",
    status: "Critical",
  },
  {
    id: "LP-091",
    name: "Hubballi–Dharwad Bypass",
    location: "Dharwad",
    lat: 15.3647,
    lng: 75.124,
    progress: 69,
    risk: 73,
    delay: 48,
    cause: "Compensation",
    status: "High Risk",
  },
  {
    id: "LP-096",
    name: "Mysuru Industrial Park",
    location: "Mysuru",
    lat: 12.25,
    lng: 76.72,
    progress: 84,
    risk: 52,
    delay: 29,
    cause: "Approval",
    status: "Medium",
  },
  {
    id: "LP-102",
    name: "Udupi Coastal Corridor",
    location: "Udupi",
    lat: 13.144,
    lng: 74.756,
    progress: 93,
    risk: 24,
    delay: 11,
    cause: "Rehabilitation",
    status: "On Track",
  },
  {
    id: "LP-109",
    name: "Tumakuru Logistics Hub",
    location: "Tumakuru",
    lat: 13.25,
    lng: 77.15,
    progress: 61,
    risk: 79,
    delay: 56,
    cause: "Legal dispute",
    status: "Critical",
  },
  {
    id: "LP-115",
    name: "Mangaluru Port Connectivity",
    location: "Mangaluru",
    lat: 12.95,
    lng: 74.84,
    progress: 76,
    risk: 45,
    delay: 23,
    cause: "Documentation",
    status: "Medium",
  },
];

function getRiskColor(risk: number) {
  if (risk >= 75) return "text-red-500";
  if (risk >= 60) return "text-orange-500";
  if (risk >= 40) return "text-amber-500";
  return "text-emerald-500";
}

function getRiskBg(risk: number) {
  if (risk >= 75) return "bg-red-500/10 border-red-500/20";
  if (risk >= 60) return "bg-orange-500/10 border-orange-500/20";
  if (risk >= 40) return "bg-amber-500/10 border-amber-500/20";
  return "bg-emerald-500/10 border-emerald-500/20";
}

function getRiskLabel(risk: number) {
  if (risk >= 75) return "Critical";
  if (risk >= 60) return "High Risk";
  if (risk >= 40) return "Medium";
  return "On Track";
}

export default function RiskMapPage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All Risks");
  const [districtFilter, setDistrictFilter] =
    useState("All Districts");

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [mapStyle, setMapStyle] = useState("street");

  const [showRiskZones, setShowRiskZones] = useState(true);
  const [showLabels, setShowLabels] = useState(false);

  const [showLayers, setShowLayers] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchMatch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.location.toLowerCase().includes(search.toLowerCase()) ||
        project.id.toLowerCase().includes(search.toLowerCase());

      const riskMatch =
        riskFilter === "All Risks" ||
        (riskFilter === "Critical" && project.risk >= 75) ||
        (riskFilter === "High Risk" &&
          project.risk >= 60 &&
          project.risk < 75) ||
        (riskFilter === "Medium" &&
          project.risk >= 40 &&
          project.risk < 60) ||
        (riskFilter === "On Track" && project.risk < 40);

      const districtMatch =
        districtFilter === "All Districts" ||
        project.location === districtFilter;

      return searchMatch && riskMatch && districtMatch;
    });
  }, [search, riskFilter, districtFilter]);

  const criticalCount = projects.filter(
    (project) => project.risk >= 75
  ).length;

  const highRiskCount = projects.filter(
    (project) => project.risk >= 60 && project.risk < 75
  ).length;

  const onTrackCount = projects.filter(
    (project) => project.risk < 40
  ).length;

  const averageRisk = Math.round(
    projects.reduce((sum, project) => sum + project.risk, 0) /
      projects.length
  );

  const resetFilters = () => {
    setSearch("");
    setRiskFilter("All Risks");
    setDistrictFilter("All Districts");
    setSelectedProject(null);
  };

  const toggleFullscreen = () => {
    const mapElement = document.getElementById("risk-map-container");

    if (!document.fullscreenElement) {
      mapElement?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7f8] text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white px-8 py-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-xl bg-slate-900 p-2.5 text-emerald-400">
                <Map size={18} />
              </span>

              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
                Spatial Risk Intelligence
              </p>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Land Acquisition Risk Map
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-slate-500">
              Geospatial command center for identifying acquisition
              hotspots, predicted delays and priority intervention
              zones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 lg:block">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-700">
                  AI ENGINE ACTIVE
                </span>
              </div>

              <p className="mt-1 text-[11px] text-slate-400">
                Last analysis · Today 10:42 AM
              </p>
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <RefreshCcw size={16} />
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="space-y-6 p-8">
        {/* KPI STRIP */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <MapPin size={20} />
              </span>

              <span className="text-xs font-semibold text-slate-400">
                Live
              </span>
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
              MAPPED PROJECTS
            </p>

            <p className="mt-1 text-3xl font-bold">
              {projects.length}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Spatially monitored
            </p>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-red-50 p-3 text-red-600">
                <ShieldAlert size={20} />
              </span>

              <span className="text-xs font-bold text-red-500">
                PRIORITY
              </span>
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
              CRITICAL ZONES
            </p>

            <p className="mt-1 text-3xl font-bold">
              {criticalCount}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Immediate intervention
            </p>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-orange-50 p-3 text-orange-500">
                <TrendingUp size={20} />
              </span>

              <span className="text-xs font-bold text-orange-500">
                MONITOR
              </span>
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
              HIGH RISK
            </p>

            <p className="mt-1 text-3xl font-bold">
              {highRiskCount}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Escalation candidates
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <Activity size={20} />
              </span>

              <span className="text-xs font-bold text-emerald-600">
                PORTFOLIO
              </span>
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
              AVERAGE RISK
            </p>

            <p className="mt-1 text-3xl font-bold">
              {averageRisk}%
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Overall acquisition exposure
            </p>
          </div>
        </section>

        {/* MAP COMMAND CENTER */}
        <section
          id="risk-map-container"
          className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
        >
          {/* MAP HEADER */}
          <div className="relative z-[1100] flex flex-col gap-4 border-b border-white/10 bg-slate-950 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                  Live Spatial Intelligence
                </span>
              </div>

              <h2 className="mt-1 text-lg font-bold text-white">
                Karnataka Acquisition Risk Surface
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowLayers(!showLayers)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Layers3 size={16} />
                  Map Layers
                </button>

                {showLayers && (
                  <div className="absolute right-0 top-12 z-[1200] w-64 rounded-2xl border border-slate-700 bg-slate-950 p-3 shadow-2xl">
                    <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Base Map
                    </p>

                    <button
                      onClick={() => {
                        setMapStyle("street");
                        setShowLayers(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${
                        mapStyle === "street"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <Map size={17} />
                      Street Map
                    </button>

                    <button
                      onClick={() => {
                        setMapStyle("satellite");
                        setShowLayers(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${
                        mapStyle === "satellite"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <Satellite size={17} />
                      Satellite
                    </button>

                    <button
                      onClick={() => {
                        setMapStyle("terrain");
                        setShowLayers(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${
                        mapStyle === "terrain"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <Mountain size={17} />
                      Terrain
                    </button>

                    <button
                      onClick={() => {
                        setMapStyle("dark");
                        setShowLayers(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${
                        mapStyle === "dark"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <Moon size={17} />
                      Dark Operations
                    </button>

                    <div className="my-2 border-t border-white/10" />

                    <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Intelligence Layers
                    </p>

                    <button
                      onClick={() =>
                        setShowRiskZones(!showRiskZones)
                      }
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/5"
                    >
                      <span>Risk Zones</span>

                      <span
                        className={`h-5 w-9 rounded-full p-1 ${
                          showRiskZones
                            ? "bg-emerald-500"
                            : "bg-slate-700"
                        }`}
                      >
                        <span
                          className={`block h-3 w-3 rounded-full bg-white transition ${
                            showRiskZones ? "translate-x-4" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <button
                      onClick={() => setShowLabels(!showLabels)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/5"
                    >
                      <span>Project Labels</span>

                      <span
                        className={`h-5 w-9 rounded-full p-1 ${
                          showLabels
                            ? "bg-emerald-500"
                            : "bg-slate-700"
                        }`}
                      >
                        <span
                          className={`block h-3 w-3 rounded-full bg-white transition ${
                            showLabels ? "translate-x-4" : ""
                          }`}
                        />
                      </span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={toggleFullscreen}
                className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white transition hover:bg-white/10"
                title="Fullscreen"
              >
                <Maximize2 size={17} />
              </button>
            </div>
          </div>

          {/* MAP */}
          <div className="relative h-[680px]">
            <MapView
              projects={filteredProjects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
              mapStyle={mapStyle}
              showRiskZones={showRiskZones}
              showLabels={showLabels}
            />

            {/* SEARCH OVERLAY */}
            <div className="absolute left-5 top-5 z-[1000] w-[340px]">
              <div className="rounded-2xl border border-white/10 bg-slate-950/90 p-2 shadow-2xl backdrop-blur-xl">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search project, district or ID..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500/50"
                  />
                </div>
              </div>
            </div>

            {/* LIVE STATUS */}
            <div className="absolute bottom-5 left-5 z-[1000] rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>

                <span className="text-xs font-bold text-white">
                  AI RISK LAYER ACTIVE
                </span>
              </div>

              <p className="mt-1 text-[11px] text-slate-500">
                {filteredProjects.length} projects in current view
              </p>
            </div>

            {/* LEGEND */}
            <div className="absolute bottom-5 right-5 z-[1000] rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Risk Classification
              </p>

              <div className="grid grid-cols-2 gap-x-5 gap-y-2 text-xs text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  Critical
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                  High Risk
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  Medium
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  On Track
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FILTERS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Layers3 size={17} className="text-emerald-600" />
              Filter Intelligence
            </div>

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-500"
            >
              <option>All Risks</option>
              <option>Critical</option>
              <option>High Risk</option>
              <option>Medium</option>
              <option>On Track</option>
            </select>

            <select
              value={districtFilter}
              onChange={(e) =>
                setDistrictFilter(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-500"
            >
              <option>All Districts</option>
              <option>Bengaluru Rural</option>
              <option>Tumakuru</option>
              <option>Mysuru</option>
              <option>Dharwad</option>
              <option>Udupi</option>
              <option>Mangaluru</option>
            </select>

            <div className="ml-auto flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white">
              <Crosshair size={15} className="text-emerald-400" />
              {filteredProjects.length} projects visible
            </div>
          </div>
        </section>

        {/* LOWER INTELLIGENCE AREA */}
        <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
          {/* HOTSPOTS */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    size={18}
                    className="text-red-500"
                  />

                  <h2 className="text-lg font-bold">
                    Priority Hotspots
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-400">
                  Locations with highest predicted delay exposure
                </p>
              </div>

              <span className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                {criticalCount} Critical
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {[...filteredProjects]
                .sort((a, b) => b.risk - a.risk)
                .slice(0, 6)
                .map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-5 text-xs font-bold text-slate-300">
                        0{index + 1}
                      </span>

                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-bold ${getRiskBg(
                          project.risk
                        )} ${getRiskColor(project.risk)}`}
                      >
                        {project.risk}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {project.name}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <MapPin size={12} />
                          {project.location}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={17}
                      className="text-slate-300"
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* PROJECT INTELLIGENCE */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {selectedProject ? (
              <>
                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                        Project Intelligence
                      </p>

                      <h2 className="mt-1 text-xl font-bold">
                        {selectedProject.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        {selectedProject.id} ·{" "}
                        {selectedProject.location}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedProject(null)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div
                    className={`rounded-2xl border p-5 ${getRiskBg(
                      selectedProject.risk
                    )}`}
                  >
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          AI RISK SCORE
                        </p>

                        <p
                          className={`mt-1 text-4xl font-bold ${getRiskColor(
                            selectedProject.risk
                          )}`}
                        >
                          {selectedProject.risk}%
                        </p>
                      </div>

                      <span
                        className={`text-xs font-bold ${getRiskColor(
                          selectedProject.risk
                        )}`}
                      >
                        {getRiskLabel(selectedProject.risk)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-100 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <CalendarDays size={15} />
                        <span className="text-xs font-semibold">
                          Predicted Delay
                        </span>
                      </div>

                      <p className="mt-2 text-lg font-bold">
                        {selectedProject.delay} days
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <TrendingUp size={15} />
                        <span className="text-xs font-semibold">
                          Progress
                        </span>
                      </div>

                      <p className="mt-2 text-lg font-bold">
                        {selectedProject.progress}%
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Primary Risk Driver
                    </p>

                    <div className="mt-2 flex items-center justify-between rounded-xl bg-orange-50 p-4">
                      <div>
                        <p className="text-sm font-bold text-orange-700">
                          {selectedProject.cause}
                        </p>

                        <p className="mt-1 text-xs text-orange-600">
                          Current dominant acquisition blocker
                        </p>
                      </div>

                      <AlertTriangle
                        size={19}
                        className="text-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Recommended Intervention
                    </p>

                    <div className="mt-2 rounded-xl bg-emerald-50 p-4">
                      <div className="flex items-start gap-3">
                        <Target
                          size={18}
                          className="mt-0.5 shrink-0 text-emerald-600"
                        />

                        <div>
                          <p className="text-sm font-bold text-emerald-800">
                            Resolve{" "}
                            {selectedProject.cause.toLowerCase()} blocker
                          </p>

                          <p className="mt-1 text-xs leading-5 text-emerald-700">
                            Prioritize the responsible stakeholder before
                            the predicted delay window is reached.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                      View Intelligence
                      <ArrowUpRight size={15} />
                    </button>

                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                      Intervention
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-[460px] flex-col items-center justify-center px-8 text-center">
                <div className="rounded-2xl bg-slate-100 p-4 text-slate-400">
                  <Crosshair size={28} />
                </div>

                <h3 className="mt-4 text-lg font-bold">
                  Select a project hotspot
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  Select a marker on the map or a priority location to
                  inspect its AI risk intelligence.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}