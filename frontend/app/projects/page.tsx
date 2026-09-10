"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  SlidersHorizontal,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ChevronRight,
  X,
  Download,
  Eye,
  Pencil,
  Trash2,
  RotateCcw,
  BrainCircuit,
  ShieldAlert,
  TrendingUp,
  Sparkles,
  Target,
  FileText,
} from "lucide-react";

type ProjectStatus = "Critical" | "High Risk" | "Medium" | "On Track";

type Project = {
  id: string;
  name: string;
  location: string;
  progress: number;
  risk: number;
  delay: number;
  cause: string;
  status: ProjectStatus;
  updated: string;
};

const initialProjects: Project[] = [
  { id: "LP-047", name: "NH-48 Expansion", location: "Bengaluru Rural", progress: 62, risk: 82, delay: 74, cause: "Compensation", status: "Critical", updated: "12 min ago" },
  { id: "LP-052", name: "Industrial Corridor", location: "Tumakuru", progress: 71, risk: 76, delay: 61, cause: "Legal dispute", status: "Critical", updated: "24 min ago" },
  { id: "LP-031", name: "Metro Extension", location: "Mysuru", progress: 81, risk: 64, delay: 42, cause: "Approval", status: "High Risk", updated: "41 min ago" },
  { id: "LP-068", name: "Ring Road Phase II", location: "Dharwad", progress: 88, risk: 58, delay: 31, cause: "Ownership", status: "Medium", updated: "1 hr ago" },
  { id: "LP-021", name: "Coastal Highway", location: "Udupi", progress: 91, risk: 31, delay: 14, cause: "Rehabilitation", status: "On Track", updated: "1 hr ago" },
  { id: "LP-074", name: "Airport Connectivity", location: "Mangaluru", progress: 77, risk: 47, delay: 26, cause: "Compensation", status: "Medium", updated: "2 hrs ago" },
  { id: "LP-083", name: "Bengaluru Peripheral Ring Road", location: "Bengaluru Rural", progress: 54, risk: 88, delay: 67, cause: "Land ownership", status: "Critical", updated: "2 hrs ago" },
  { id: "LP-091", name: "Hubballi–Dharwad Bypass", location: "Dharwad", progress: 69, risk: 73, delay: 48, cause: "Compensation", status: "High Risk", updated: "3 hrs ago" },
  { id: "LP-096", name: "Mysuru Industrial Park", location: "Mysuru", progress: 84, risk: 52, delay: 29, cause: "Approval", status: "Medium", updated: "3 hrs ago" },
  { id: "LP-102", name: "Udupi Coastal Corridor", location: "Udupi", progress: 93, risk: 24, delay: 11, cause: "Rehabilitation", status: "On Track", updated: "4 hrs ago" },
  { id: "LP-109", name: "Tumakuru Logistics Hub", location: "Tumakuru", progress: 61, risk: 79, delay: 56, cause: "Legal dispute", status: "Critical", updated: "5 hrs ago" },
  { id: "LP-115", name: "Mangaluru Port Connectivity", location: "Mangaluru", progress: 76, risk: 45, delay: 23, cause: "Documentation", status: "Medium", updated: "6 hrs ago" },
];

const districts = ["Bengaluru Rural", "Tumakuru", "Mysuru", "Dharwad", "Udupi", "Mangaluru"];
const causes = ["Compensation", "Legal dispute", "Approval", "Ownership", "Land ownership", "Rehabilitation", "Documentation"];
const statuses: ProjectStatus[] = ["Critical", "High Risk", "Medium", "On Track"];

function RiskBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Critical: "bg-red-50 text-red-700 border-red-200",
    "High Risk": "bg-orange-50 text-orange-700 border-orange-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    "On Track": "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${styles[status] || "bg-slate-50 text-slate-600 border-slate-200"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>;
}

function RiskScore({ score }: { score: number }) {
  const style = score >= 75 ? "text-red-600" : score >= 60 ? "text-orange-600" : score >= 40 ? "text-amber-600" : "text-emerald-600";
  return <span className={`font-extrabold ${style}`}>{score}%</span>;
}

function getStatusFromRisk(risk: number): ProjectStatus {
  if (risk >= 75) return "Critical";
  if (risk >= 60) return "High Risk";
  if (risk >= 40) return "Medium";
  return "On Track";
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All Risk Scores");
  const [districtFilter, setDistrictFilter] = useState("All Districts");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);
  const [toast, setToast] = useState("");
  const projectsPerPage = 6;

  const blankProject: Project = {
    id: "",
    name: "",
    location: "Bengaluru Rural",
    progress: 0,
    risk: 50,
    delay: 0,
    cause: "Compensation",
    status: "Medium",
    updated: "Just now",
  };
  const [form, setForm] = useState<Project>(blankProject);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const filteredProjects = useMemo(() => projects.filter((project) => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || [project.name, project.location, project.id, project.cause].some((v) => v.toLowerCase().includes(q));
    const matchesRisk = riskFilter === "All Risk Scores" ||
      (riskFilter === "0–39 Low" && project.risk < 40) ||
      (riskFilter === "40–59 Medium" && project.risk >= 40 && project.risk < 60) ||
      (riskFilter === "60–74 High" && project.risk >= 60 && project.risk < 75) ||
      (riskFilter === "75–100 Critical" && project.risk >= 75);
    const matchesDistrict = districtFilter === "All Districts" || project.location === districtFilter;
    const matchesStatus = statusFilter === "All Status" || project.status === statusFilter;
    return matchesSearch && matchesRisk && matchesDistrict && matchesStatus;
  }), [projects, search, riskFilter, districtFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * projectsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

  const critical = projects.filter((p) => p.status === "Critical").length;
  const highRisk = projects.filter((p) => p.status === "High Risk").length;
  const onTrack = projects.filter((p) => p.status === "On Track").length;
  const avgRisk = Math.round(projects.reduce((sum, p) => sum + p.risk, 0) / projects.length);

  const resetFilters = () => {
    setSearch(""); setRiskFilter("All Risk Scores"); setDistrictFilter("All Districts"); setStatusFilter("All Status"); setCurrentPage(1);
  };

  const openAdd = () => { setForm(blankProject); setShowAddProject(true); };

  const submitProject = () => {
    if (!form.id.trim() || !form.name.trim()) { notify("Project ID and Project Name are required."); return; }
    if (projects.some((p) => p.id.toLowerCase() === form.id.trim().toLowerCase())) { notify("That Project ID already exists."); return; }
    const newProject = { ...form, id: form.id.trim(), name: form.name.trim(), updated: "Just now", status: getStatusFromRisk(form.risk) };
    setProjects((prev) => [newProject, ...prev]);
    setShowAddProject(false); setCurrentPage(1); notify("Project added to the monitoring portfolio.");
  };

  const saveEdit = () => {
    if (!editingProject) return;
    setProjects((prev) => prev.map((p) => p.id === editingProject.id ? { ...editingProject, status: getStatusFromRisk(editingProject.risk), updated: "Just now" } : p));
    setEditingProject(null); notify("Project information updated.");
  };

  const confirmDelete = () => {
    if (!deleteProject) return;
    setProjects((prev) => prev.filter((p) => p.id !== deleteProject.id));
    setDeleteProject(null); setSelectedProject(null); notify("Project removed from the demo portfolio.");
  };

  const exportCSV = () => {
    const header = ["Project ID", "Project", "District", "Progress %", "Risk %", "Predicted Delay Days", "Primary Cause", "Status"];
    const rows = filteredProjects.map((p) => [p.id, p.name, p.location, p.progress, p.risk, p.delay, p.cause, p.status]);
    const csv = [header, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "landpulse-project-portfolio.csv"; a.click(); URL.revokeObjectURL(url);
    notify("Portfolio CSV exported.");
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white px-8 py-6">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Portfolio Intelligence
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950">Land Acquisition Projects</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500">Search the monitored project portfolio, inspect AI risk intelligence, and act before acquisition delays become critical.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={exportCSV} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                <Download size={17} /> Export CSV
              </button>
              <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700">
                <Plus size={18} /> Register Project
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] space-y-6 p-6 lg:p-8">
        {/* COMMAND SUMMARY */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <SummaryCard icon={<MapPin size={20} />} label="TOTAL PROJECTS" value={projects.length} note="Active in monitoring" iconClass="bg-blue-50 text-blue-600" />
          <SummaryCard icon={<ShieldAlert size={20} />} label="CRITICAL" value={critical} note="Immediate intervention" iconClass="bg-red-50 text-red-600" accent="red" />
          <SummaryCard icon={<Clock3 size={20} />} label="HIGH RISK" value={highRisk} note="Requires attention" iconClass="bg-orange-50 text-orange-600" accent="orange" />
          <SummaryCard icon={<CheckCircle2 size={20} />} label="ON TRACK" value={onTrack} note="Progressing as planned" iconClass="bg-emerald-50 text-emerald-600" accent="green" />
          <SummaryCard icon={<BrainCircuit size={20} />} label="AVG AI RISK" value={`${avgRisk}%`} note="Portfolio risk index" iconClass="bg-violet-50 text-violet-600" accent="violet" />
        </section>

        {/* AI STATUS STRIP */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white shadow-xl">
          <div className="flex flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-emerald-500/15 p-3 text-emerald-300"><Sparkles size={21} /></div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold">LandPulse Prediction Engine</h2>
                  <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">Active</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">Portfolio intelligence is ready. Risk scores and predicted delays are available for monitored projects.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="rounded-lg border border-white/10 px-3 py-2">Model: XGBoost + SHAP</span>
              <span className="rounded-lg border border-white/10 px-3 py-2">Last run: Today, 10:14 AM</span>
              <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 font-bold text-emerald-300">98.2% pipeline health</span>
            </div>
          </div>
        </section>

        {/* SEARCH + FILTERS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search existing projects, locations, IDs or risk causes..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100" />
            </div>
            <button onClick={() => setShowFilters((v) => !v)} className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${showFilters ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>
              <SlidersHorizontal size={17} /> Filters {showFilters ? "On" : ""}
            </button>
            <select value={riskFilter} onChange={(e) => { setRiskFilter(e.target.value); setCurrentPage(1); }} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-emerald-500">
              <option>All Risk Scores</option><option>0–39 Low</option><option>40–59 Medium</option><option>60–74 High</option><option>75–100 Critical</option>
            </select>
            <select value={districtFilter} onChange={(e) => { setDistrictFilter(e.target.value); setCurrentPage(1); }} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-emerald-500">
              <option>All Districts</option>{districts.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-emerald-500">
              <option>All Status</option>{statuses.map((s) => <option key={s}>{s}</option>)}
            </select>
            {(search || riskFilter !== "All Risk Scores" || districtFilter !== "All Districts" || statusFilter !== "All Status") && (
              <button onClick={resetFilters} title="Reset filters" className="rounded-xl border border-slate-200 p-3 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"><RotateCcw size={17} /></button>
            )}
          </div>
          {showFilters && (
            <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 md:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Current view</p><p className="mt-1 text-lg font-black">{filteredProjects.length} projects</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Critical in view</p><p className="mt-1 text-lg font-black text-red-600">{filteredProjects.filter((p) => p.status === "Critical").length}</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Average risk in view</p><p className="mt-1 text-lg font-black">{filteredProjects.length ? Math.round(filteredProjects.reduce((a, p) => a + p.risk, 0) / filteredProjects.length) : 0}%</p></div>
            </div>
          )}
        </section>

        {/* PORTFOLIO TABLE */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2"><h2 className="text-lg font-black">Project Portfolio</h2><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">{filteredProjects.length} results</span></div>
              <p className="mt-1 text-sm text-slate-400">Select an existing project to open its AI intelligence profile.</p>
            </div>
            <button onClick={exportCSV} className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700">Export Report <ArrowUpRight size={16} /></button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead><tr className="border-b border-slate-100 bg-slate-50/80 text-left">
                {['Project', 'Location', 'Progress', 'AI Risk', 'Predicted Delay', 'Primary Driver', 'Status', ''].map((h, i) => <th key={i} className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-slate-400">{h}</th>)}
              </tr></thead>
              <tbody>
                {paginatedProjects.map((project) => (
                  <tr key={project.id} onClick={() => setSelectedProject(project)} className="group cursor-pointer border-b border-slate-100 transition hover:bg-emerald-50/30">
                    <td className="px-6 py-5"><div><p className="font-extrabold text-slate-900">{project.name}</p><p className="mt-1 text-xs font-bold text-slate-400">{project.id} · Updated {project.updated}</p></div></td>
                    <td className="px-6 py-5"><div className="flex items-center gap-2 text-sm font-medium text-slate-600"><MapPin size={15} className="text-slate-400" />{project.location}</div></td>
                    <td className="px-6 py-5"><div className="w-32"><div className="mb-2 flex justify-between text-xs"><span className="font-bold text-slate-700">{project.progress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${project.progress}%` }} /></div></div></td>
                    <td className="px-6 py-5"><RiskScore score={project.risk} /></td>
                    <td className="px-6 py-5"><div className="flex items-center gap-2"><CalendarDays size={15} className="text-slate-400" /><span className="text-sm font-bold text-slate-700">{project.delay} days</span></div></td>
                    <td className="px-6 py-5"><span className="text-sm font-medium text-slate-600">{project.cause}</span></td>
                    <td className="px-6 py-5"><RiskBadge status={project.status} /></td>
                    <td className="px-6 py-5"><button onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }} className="rounded-lg p-2 text-slate-400 transition group-hover:bg-white group-hover:text-emerald-600"><ChevronRight size={19} /></button></td>
                  </tr>
                ))}
                {!paginatedProjects.length && <tr><td colSpan={8} className="px-6 py-20 text-center"><Search className="mx-auto text-slate-300" size={32} /><p className="mt-3 font-bold text-slate-700">No projects found</p><p className="mt-1 text-sm text-slate-400">Try changing your search or filters.</p><button onClick={resetFilters} className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">Reset view</button></td></tr>}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">Showing <span className="font-bold text-slate-700">{filteredProjects.length === 0 ? 0 : startIndex + 1}</span> to <span className="font-bold text-slate-700">{Math.min(startIndex + projectsPerPage, filteredProjects.length)}</span> of <span className="font-bold text-slate-700">{filteredProjects.length}</span> projects</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={safePage === 1} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => <button key={page} onClick={() => setCurrentPage(page)} className={`rounded-lg px-3 py-2 text-sm font-bold ${safePage === page ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{page}</button>)}
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
            </div>
          </div>
        </section>
      </div>

      {/* PROJECT INTELLIGENCE MODAL */}
      {selectedProject && <ModalShell onClose={() => setSelectedProject(null)} wide>
        <div className="border-b border-slate-200 bg-slate-950 px-6 py-6 text-white">
          <div className="flex items-start justify-between gap-4"><div><div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300"><BrainCircuit size={15} /> AI Project Intelligence</div><h2 className="text-2xl font-black">{selectedProject.name}</h2><p className="mt-1 text-sm text-slate-400">{selectedProject.id} · {selectedProject.location}</p></div><RiskBadge status={selectedProject.status} /></div>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <MetricBox label="AI Risk Score" value={`${selectedProject.risk}%`} icon={<ShieldAlert size={18} />} tone={selectedProject.risk >= 75 ? "red" : selectedProject.risk >= 60 ? "orange" : "green"} />
            <MetricBox label="Predicted Delay" value={`${selectedProject.delay} days`} icon={<Clock3 size={18} />} tone="orange" />
            <MetricBox label="Acquisition Progress" value={`${selectedProject.progress}%`} icon={<TrendingUp size={18} />} tone="green" />
            <MetricBox label="Primary Driver" value={selectedProject.cause} icon={<AlertTriangle size={18} />} tone="violet" />
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-2xl border border-slate-200 p-5"><div className="flex items-center gap-2"><Sparkles size={18} className="text-emerald-600" /><h3 className="font-black">Why is this project at risk?</h3></div><p className="mt-2 text-sm leading-6 text-slate-500">The AI risk profile highlights the dominant operational factors that may increase the probability of acquisition delay.</p><div className="mt-5 space-y-4"><Driver label={selectedProject.cause} value={selectedProject.risk >= 75 ? 38 : 30} /><Driver label="Land ownership / verification" value={selectedProject.risk >= 75 ? 27 : 22} /><Driver label="Legal & approval dependencies" value={selectedProject.risk >= 75 ? 19 : 18} /><Driver label="Documentation / R&R" value={16} /></div></div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><div className="flex items-center gap-2 text-emerald-800"><Target size={18} /><h3 className="font-black">Recommended intervention</h3></div><p className="mt-3 text-sm leading-6 text-emerald-800">Prioritize resolution of <strong>{selectedProject.cause.toLowerCase()}</strong> and review the affected acquisition cases before the next monitoring cycle.</p><button onClick={() => { setSelectedProject(null); notify("Intervention workspace opened for this project."); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"><Target size={17} /> Create Intervention</button></div>
          </div>
          <div className="mt-5 rounded-2xl border border-slate-200 p-5"><div className="flex items-center justify-between"><h3 className="font-black">Project actions</h3><span className="text-xs font-semibold text-slate-400">Last updated {selectedProject.updated}</span></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><ActionButton icon={<Eye size={17} />} label="View full analysis" onClick={() => notify("Detailed AI analysis selected.")} /><ActionButton icon={<FileText size={17} />} label="Open documents" onClick={() => notify("Document workspace selected.")} /><ActionButton icon={<Pencil size={17} />} label="Edit project" onClick={() => { setEditingProject(selectedProject); setSelectedProject(null); }} /></div></div>
        </div>
      </ModalShell>}

      {/* ADD / EDIT MODAL */}
      {(showAddProject || editingProject) && <ModalShell onClose={() => { setShowAddProject(false); setEditingProject(null); }}>
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5"><div><p className="text-xs font-black uppercase tracking-widest text-emerald-600">Portfolio Administration</p><h2 className="mt-1 text-xl font-black">{editingProject ? "Edit Project" : "Register New Project"}</h2><p className="mt-1 text-sm text-slate-500">{editingProject ? "Update project information used by the monitoring layer." : "Register a project that is not already present in the monitored portfolio."}</p></div><button onClick={() => { setShowAddProject(false); setEditingProject(null); }} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={20} /></button></div>
        <div className="max-h-[68vh] overflow-y-auto p-6"><ProjectForm value={editingProject || form} setValue={(value) => editingProject ? setEditingProject(value) : setForm(value)} /></div>
        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4"><button onClick={() => { setShowAddProject(false); setEditingProject(null); }} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600">Cancel</button><button onClick={editingProject ? saveEdit : submitProject} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"><Plus size={17} /> {editingProject ? "Save Changes" : "Register Project"}</button></div>
      </ModalShell>}

      {/* DELETE MODAL */}
      {deleteProject && <ModalShell onClose={() => setDeleteProject(null)} small><div className="p-6"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600"><Trash2 size={21} /></div><h2 className="mt-4 text-center text-xl font-black">Remove project?</h2><p className="mt-2 text-center text-sm leading-6 text-slate-500">Remove <strong>{deleteProject.name}</strong> from this demo portfolio? This does not affect any external government system.</p><div className="mt-6 flex gap-3"><button onClick={() => setDeleteProject(null)} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600">Cancel</button><button onClick={confirmDelete} className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-700">Remove</button></div></div></ModalShell>}

      {toast && <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-3 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-2xl"><CheckCircle2 size={18} className="text-emerald-400" />{toast}</div>}
    </main>
  );
}

function SummaryCard({ icon, label, value, note, iconClass }: { icon: React.ReactNode; label: string; value: string | number; note: string; iconClass: string; accent?: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-center justify-between"><div className={`rounded-xl p-3 ${iconClass}`}>{icon}</div><ArrowUpRight size={16} className="text-slate-300" /></div><p className="mt-5 text-[11px] font-black tracking-wider text-slate-400">{label}</p><p className="mt-1 text-3xl font-black tracking-tight">{value}</p><p className="mt-1 text-xs font-medium text-slate-400">{note}</p></div>;
}

function ModalShell({ children, onClose, wide = false, small = false }: { children: React.ReactNode; onClose: () => void; wide?: boolean; small?: boolean }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" onMouseDown={onClose}><div onMouseDown={(e) => e.stopPropagation()} className={`w-full overflow-hidden rounded-2xl bg-white shadow-2xl ${small ? "max-w-md" : wide ? "max-w-4xl" : "max-w-2xl"}`}>{children}</div></div>;
}

function MetricBox({ label, value, icon, tone }: { label: string; value: string; icon: React.ReactNode; tone: string }) {
  const tones: Record<string, string> = { red: "bg-red-50 text-red-600", orange: "bg-orange-50 text-orange-600", green: "bg-emerald-50 text-emerald-600", violet: "bg-violet-50 text-violet-600" };
  return <div className="rounded-2xl border border-slate-200 p-4"><div className={`mb-3 inline-flex rounded-lg p-2 ${tones[tone] || tones.green}`}>{icon}</div><p className="text-xs font-bold text-slate-400">{label}</p><p className="mt-1 truncate text-xl font-black">{value}</p></div>;
}

function Driver({ label, value }: { label: string; value: number }) {
  return <div><div className="mb-1.5 flex justify-between text-xs"><span className="font-bold text-slate-600">{label}</span><span className="font-black text-slate-900">{value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${value}%` }} /></div></div>;
}

function ActionButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return <button onClick={onClick} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">{icon}{label}</button>;
}

function ProjectForm({ value, setValue }: { value: Project; setValue: (value: Project) => void }) {
  const update = <K extends keyof Project>(key: K, val: Project[K]) => setValue({ ...value, [key]: val });
  return <div className="grid gap-5 md:grid-cols-2"><Field label="Project ID"><input value={value.id} onChange={(e) => update("id", e.target.value)} placeholder="e.g. LP-120" className={inputClass} /></Field><Field label="Project Name"><input value={value.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Bengaluru Ring Road" className={inputClass} /></Field><Field label="District"><select value={value.location} onChange={(e) => update("location", e.target.value)} className={inputClass}>{districts.map((d) => <option key={d}>{d}</option>)}</select></Field><Field label="Primary Delay Cause"><select value={value.cause} onChange={(e) => update("cause", e.target.value)} className={inputClass}>{causes.map((c) => <option key={c}>{c}</option>)}</select></Field><Field label="Acquisition Progress (%)"><input type="number" min="0" max="100" value={value.progress} onChange={(e) => update("progress", Math.min(100, Math.max(0, Number(e.target.value))))} className={inputClass} /></Field><Field label="AI Risk Score (%)"><input type="number" min="0" max="100" value={value.risk} onChange={(e) => update("risk", Math.min(100, Math.max(0, Number(e.target.value))))} className={inputClass} /></Field><Field label="Predicted Delay (days)"><input type="number" min="0" value={value.delay} onChange={(e) => update("delay", Math.max(0, Number(e.target.value)))} className={inputClass} /></Field><Field label="Status"><select value={value.status} onChange={(e) => update("status", e.target.value as ProjectStatus)} className={inputClass}>{statuses.map((s) => <option key={s}>{s}</option>)}</select></Field><div className="md:col-span-2 rounded-xl border border-emerald-100 bg-emerald-50 p-4"><div className="flex gap-3"><Sparkles className="mt-0.5 text-emerald-600" size={18} /><div><p className="text-sm font-bold text-emerald-800">AI monitoring ready</p><p className="mt-1 text-xs leading-5 text-emerald-700">The registered project will become searchable and available to the LandPulse intelligence workflow.</p></div></div></div></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <div><label className="mb-2 block text-sm font-bold text-slate-700">{label}</label>{children}</div>; }

const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100";
