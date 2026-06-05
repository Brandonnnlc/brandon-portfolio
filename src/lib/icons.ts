import {
    Briefcase,
    Smartphone,
    ShoppingBag,
    Rocket,
    Palette,
    PenTool,
    Layers,
    Calendar,
    type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Briefcase,
    Smartphone,
    ShoppingBag,
    Rocket,
    Palette,
    PenTool,
    Layers,
    Calendar,
};

export function getIcon(name: string): LucideIcon {
    return iconMap[name] || Layers;
}
