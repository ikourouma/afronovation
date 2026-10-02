import {
  Layers,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "program-change-management": Layers,
  "technology-platform-development": MonitorSmartphone,
  "digital-transformation": Sparkles,
  "cybersecurity-digital-trust": ShieldCheck,
};

export function getPracticeAreaIcon(slug: string): LucideIcon {
  return iconMap[slug] ?? Layers;
}
