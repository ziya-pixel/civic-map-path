import * as React from "react";

export type DamageType = "Pothole" | "Cracked road" | "Broken road" | "Waterlogged road" | "Other";
export type Severity = "Low" | "Medium" | "High" | "Critical";
export type ReportStatus = "Reported" | "Verified" | "In Progress" | "Resolved" | "Rejected";

export type RoadReport = {
  id: string;
  userId: string;
  userName: string;
  damageType: DamageType;
  description: string;
  severity: Severity;
  imageURL: string;
  latitude: number;
  longitude: number;
  address: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
};

export const demoReports: RoadReport[] = [
  {
    id: "RW-2047",
    userId: "demo-user",
    userName: "M.A.Naziya Banu",
    damageType: "Pothole",
    description: "Deep pothole opening up beside the school crossing.",
    severity: "Critical",
    imageURL: "",
    latitude: 12.9719,
    longitude: 77.5948,
    address: "Marigold Avenue & 4th Street",
    status: "Verified",
    createdAt: "2026-09-09T04:20:00.000Z",
    updatedAt: "2026-09-09T04:38:00.000Z",
  },
  {
    id: "RW-2044",
    userId: "community-02",
    userName: "Anika Rao",
    damageType: "Waterlogged road",
    description: "Water collects across the full lane after moderate rain.",
    severity: "High",
    imageURL: "",
    latitude: 12.9751,
    longitude: 77.5915,
    address: "Birch Road, Ward 12",
    status: "In Progress",
    createdAt: "2026-09-09T03:42:00.000Z",
    updatedAt: "2026-09-09T04:10:00.000Z",
  },
  {
    id: "RW-2041",
    userId: "community-03",
    userName: "Rohan Das",
    damageType: "Cracked road",
    description: "Long crack crossing the lane near the bus stop.",
    severity: "Medium",
    imageURL: "",
    latitude: 12.9684,
    longitude: 77.5981,
    address: "Cedar Lane near Bus Stop 3",
    status: "Resolved",
    createdAt: "2026-09-08T22:10:00.000Z",
    updatedAt: "2026-09-09T02:00:00.000Z",
  },
  {
    id: "RW-2038",
    userId: "demo-user",
    userName: "M.A.Naziya Banu",
    damageType: "Broken road",
    description: "Surface has collapsed around a utility trench.",
    severity: "High",
    imageURL: "",
    latitude: 12.9794,
    longitude: 77.5871,
    address: "Market Street, Block C",
    status: "Reported",
    createdAt: "2026-09-08T18:30:00.000Z",
    updatedAt: "2026-09-08T18:30:00.000Z",
  },
  {
    id: "RW-2031",
    userId: "community-04",
    userName: "Sahana N",
    damageType: "Pothole",
    description: "Small pothole on the left side of the cycle lane.",
    severity: "Low",
    imageURL: "",
    latitude: 12.9658,
    longitude: 77.5902,
    address: "Palm Grove Road",
    status: "Verified",
    createdAt: "2026-09-07T12:00:00.000Z",
    updatedAt: "2026-09-08T10:12:00.000Z",
  },
];

const storageKey = "roadwatch-reports";

export function useRoadwatchReports() {
  const [reports, setReports] = React.useState<RoadReport[]>(demoReports);
  React.useEffect(() => { setReports(loadReports()); }, []);
  return [reports, setReports] as const;
}

export function loadReports(): RoadReport[] {
  if (typeof window === "undefined") return demoReports;
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as RoadReport[]) : demoReports;
  } catch {
    return demoReports;
  }
}

export function saveReports(reports: RoadReport[]) {
  if (typeof window !== "undefined") window.localStorage.setItem(storageKey, JSON.stringify(reports));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export const severityClass: Record<Severity, string> = {
  Low: "severity-low",
  Medium: "severity-medium",
  High: "severity-high",
  Critical: "severity-critical",
};

export const statusClass: Record<ReportStatus, string> = {
  Reported: "status-reported",
  Verified: "status-verified",
  "In Progress": "status-progress",
  Resolved: "status-resolved",
  Rejected: "status-rejected",
};
