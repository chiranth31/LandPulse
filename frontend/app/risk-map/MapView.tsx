"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

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

type MapViewProps = {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  mapStyle: string;
  showRiskZones: boolean;
  showLabels: boolean;
};

function MapController({
  selectedProject,
  projects,
}: {
  selectedProject: Project | null;
  projects: Project[];
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedProject) {
      map.flyTo(
        [selectedProject.lat, selectedProject.lng],
        11,
        {
          duration: 0.9,
        }
      );
    }
  }, [selectedProject, map]);

  useEffect(() => {
    if (!selectedProject && projects.length > 0) {
      const bounds = projects.map(
        (project) => [project.lat, project.lng] as [number, number]
      );

      map.fitBounds(bounds, {
        padding: [60, 60],
      });
    }
  }, [projects, selectedProject, map]);

  return null;
}

function getRiskColor(risk: number) {
  if (risk >= 75) return "#ef4444";
  if (risk >= 60) return "#f97316";
  if (risk >= 40) return "#f59e0b";
  return "#10b981";
}

function getRiskLabel(risk: number) {
  if (risk >= 75) return "Critical";
  if (risk >= 60) return "High Risk";
  if (risk >= 40) return "Medium";
  return "On Track";
}

function getTileConfig(style: string) {
  switch (style) {
    case "satellite":
      return {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles &copy; Esri",
      };

    case "dark":
      return {
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        attribution:
          '&copy; OpenStreetMap contributors &copy; CARTO',
      };

    case "terrain":
      return {
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        attribution:
          'Map data &copy; OpenStreetMap contributors, SRTM | Map style &copy; OpenTopoMap',
      };

    default:
      return {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: "&copy; OpenStreetMap contributors",
      };
  }
}

function MapActions({
  projects,
}: {
  projects: Project[];
}) {
  const map = useMap();

  const fitProjects = () => {
    if (!projects.length) return;

    const bounds = projects.map(
      (project) => [project.lat, project.lng] as [number, number]
    );

    map.fitBounds(bounds, {
      padding: [60, 60],
      maxZoom: 8,
    });
  };

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="pointer-events-none absolute right-4 top-4 z-[1000] flex flex-col gap-2">
      <button
        onClick={fitProjects}
        className="pointer-events-auto rounded-xl border border-white/30 bg-slate-950/85 p-3 text-white shadow-xl backdrop-blur transition hover:bg-slate-900"
        title="Fit all projects"
      >
        <span className="text-xs font-bold">FIT</span>
      </button>

      <button
        onClick={zoomIn}
        className="pointer-events-auto rounded-xl border border-white/30 bg-slate-950/85 p-3 text-white shadow-xl backdrop-blur transition hover:bg-slate-900"
        title="Zoom in"
      >
        +
      </button>

      <button
        onClick={zoomOut}
        className="pointer-events-auto rounded-xl border border-white/30 bg-slate-950/85 p-3 text-white shadow-xl backdrop-blur transition hover:bg-slate-900"
        title="Zoom out"
      >
        −
      </button>
    </div>
  );
}

export default function MapView({
  projects,
  selectedProject,
  onSelectProject,
  mapStyle,
  showRiskZones,
  showLabels,
}: MapViewProps) {
  const tile = getTileConfig(mapStyle);

  return (
    <MapContainer
      center={[15.3173, 75.7139]}
      zoom={7}
      scrollWheelZoom
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        key={mapStyle}
        attribution={tile.attribution}
        url={tile.url}
      />

      <ZoomControl position="bottomright" />

      <MapController
        selectedProject={selectedProject}
        projects={projects}
      />

      <MapActions projects={projects} />

      {projects.map((project) => {
        const color = getRiskColor(project.risk);

        return (
          <div key={project.id}>
            {/* RISK ZONE */}
            {showRiskZones && project.risk >= 60 && (
              <Circle
                center={[project.lat, project.lng]}
                radius={project.risk >= 75 ? 9000 : 6000}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.08,
                  weight: 1,
                  opacity: 0.35,
                }}
              />
            )}

            {/* PROJECT MARKER */}
            <CircleMarker
              center={[project.lat, project.lng]}
              radius={project.risk >= 75 ? 13 : 10}
              pathOptions={{
                color: "#ffffff",
                fillColor: color,
                fillOpacity: 0.95,
                weight: 3,
              }}
              eventHandlers={{
                click: () => onSelectProject(project),
              }}
            >
              <Popup>
                <div className="min-w-[250px]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    {project.id}
                  </p>

                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {project.location}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Risk
                      </p>

                      <p
                        className="mt-1 text-xl font-bold"
                        style={{ color }}
                      >
                        {project.risk}%
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Delay
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-800">
                        {project.delay}
                        <span className="ml-1 text-xs font-medium">
                          days
                        </span>
                      </p>
                    </div>
                  </div>

                  <div
                    className="mt-3 rounded-lg px-3 py-2 text-xs font-bold"
                    style={{
                      backgroundColor: `${color}15`,
                      color,
                    }}
                  >
                    {getRiskLabel(project.risk)} Risk
                  </div>
                </div>
              </Popup>
            </CircleMarker>

            {/* LABEL */}
            {showLabels && (
              <CircleMarker
                center={[project.lat, project.lng]}
                radius={0}
                pathOptions={{
                  opacity: 0,
                  fillOpacity: 0,
                }}
              >
                <Popup closeButton={false}>
                  {project.name}
                </Popup>
              </CircleMarker>
            )}
          </div>
        );
      })}
    </MapContainer>
  );
}