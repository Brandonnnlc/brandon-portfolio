import {
    Briefcase,
    Smartphone,
    ShoppingBag,
    Rocket,
    Palette,
    PenTool,
    Layers,
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
};

export function getIcon(name: string): LucideIcon {
    return iconMap[name] || Layers;
}
