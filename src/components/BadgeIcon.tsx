import badgesSprite from "@/assets/badges-sprite.png";

interface BadgeIconProps {
  row: number;
  col: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BadgeIcon({ row, col, size = "md", className = "" }: BadgeIconProps) {
  // Sprite is 3 columns x 2 rows
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  // Calculate background position (each badge is ~33.33% width, 50% height)
  const xPos = col * 33.33;
  const yPos = row * 50;

  return (
    <div
      className={`${sizeClasses[size]} ${className} rounded-lg overflow-hidden`}
      style={{
        backgroundImage: `url(${badgesSprite})`,
        backgroundSize: "300% 200%",
        backgroundPosition: `${xPos}% ${yPos}%`,
      }}
    />
  );
}
