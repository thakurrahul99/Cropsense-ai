// Utility functions
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  return `${diffDays}d ago`;
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case "critical":
      return "#EF4444";
    case "high":
      return "#F59E0B";
    case "moderate":
    case "medium":
      return "#F59E0B";
    case "low":
      return "#00E5A0";
    default:
      return "#7A9E8A";
  }
}

export function getRiskBgClass(risk: string): string {
  switch (risk) {
    case "critical":
      return "badge-crimson";
    case "high":
    case "medium":
      return "badge-amber";
    case "low":
      return "badge-jade";
    default:
      return "badge-neutral";
  }
}

export function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "verified":
    case "confirmed":
    case "resolved":
      return "badge-jade";
    case "pending":
    case "needs_review":
      return "badge-amber";
    case "flagged":
    case "rejected":
      return "badge-crimson";
    default:
      return "badge-neutral";
  }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
