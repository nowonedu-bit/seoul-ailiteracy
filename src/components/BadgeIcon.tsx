import classroomBadge from "@/assets/badges/classroom.png";
import homeBadge from "@/assets/badges/home.png";
import playgroundBadge from "@/assets/badges/playground.png";
import academyBadge from "@/assets/badges/academy.png";
import cafeteriaBadge from "@/assets/badges/cafeteria.png";
import gymBadge from "@/assets/badges/gym.png";

const badgeImages: Record<string, string> = {
  classroom: classroomBadge,
  home: homeBadge,
  playground: playgroundBadge,
  academy: academyBadge,
  cafeteria: cafeteriaBadge,
  gym: gymBadge,
};

interface BadgeIconProps {
  locationId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BadgeIcon({ locationId, size = "md", className = "" }: BadgeIconProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const badgeImage = badgeImages[locationId];

  if (!badgeImage) {
    return null;
  }

  return (
    <img
      src={badgeImage}
      alt={`${locationId} badge`}
      className={`${sizeClasses[size]} ${className} object-contain`}
    />
  );
}
