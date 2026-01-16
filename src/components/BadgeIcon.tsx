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
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-28 h-28",
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
