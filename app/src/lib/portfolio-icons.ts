import {
  ChartLine,
  Globe,
  Landmark,
  Link2,
  Plane,
  Shield,
  TrendingUp,
  Users,
  Vote,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  landmark: Landmark,
  "trending-up": TrendingUp,
  users: Users,
  plane: Plane,
  "line-chart": ChartLine,
  globe: Globe,
  vote: Vote,
  link: Link2,
  shield: Shield,
};

export function getPortfolioIcon(name: string): LucideIcon {
  return iconMap[name] ?? Landmark;
}
