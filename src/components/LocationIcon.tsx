import classroomLocation from "@/assets/locations/classroom.png";
import homeLocation from "@/assets/locations/home.png";
import playgroundLocation from "@/assets/locations/playground.png";
import academyLocation from "@/assets/locations/academy.png";
import cafeteriaLocation from "@/assets/locations/cafeteria.png";
import gymLocation from "@/assets/locations/gym.png";

const locationImages: Record<string, string> = {
  classroom: classroomLocation,
  home: homeLocation,
  playground: playgroundLocation,
  academy: academyLocation,
  cafeteria: cafeteriaLocation,
  gym: gymLocation,
};

interface LocationIconProps {
  locationId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LocationIcon({ locationId, size = "md", className = "" }: LocationIconProps) {
  const sizeClasses = {
    sm: "w-14 h-14",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  };

  const locationImage = locationImages[locationId];

  if (!locationImage) {
    return null;
  }

  return (
    <img
      src={locationImage}
      alt={`${locationId} location`}
      className={`${sizeClasses[size]} ${className} object-contain`}
    />
  );
}
