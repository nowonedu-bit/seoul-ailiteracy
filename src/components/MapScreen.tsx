import { locations } from "@/data/quizData";
import { Award, Star } from "lucide-react";

interface MapScreenProps {
  detectiveName: string;
  solvedLocations: string[];
  onSelectLocation: (locationId: string) => void;
  onGoToFinal: () => void;
  allSolved: boolean;
}

export function MapScreen({
  detectiveName,
  solvedLocations,
  onSelectLocation,
  onGoToFinal,
  allSolved
}: MapScreenProps) {
  return (
    <div className="min-h-screen gradient-map">
      {/* Header */}
      <header className="bg-card/90 backdrop-blur-sm shadow-soft p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔍</span>
            <span className="font-display text-lg text-foreground">
              반가워요, <span className="text-sky-dark">{detectiveName}</span> 탐정님!
            </span>
          </div>
          <div className="flex items-center gap-2 bg-sunshine/20 px-4 py-2 rounded-full">
            <Award className="w-5 h-5 text-sunshine-dark" />
            <span className="font-bold text-foreground">
              {solvedLocations.length}/6
            </span>
          </div>
        </div>
      </header>

      {/* Badge collection */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="card-detective">
          <p className="text-sm text-muted-foreground mb-3 text-center font-medium">모은 배지</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {locations.map((location) => {
              const isSolved = solvedLocations.includes(location.id);
              return (
                <div
                  key={location.id}
                  className={`badge-slot ${isSolved ? "earned" : ""}`}
                  title={location.name}
                >
                  {isSolved ? (
                    <span className="text-2xl">{location.badgeEmoji}</span>
                  ) : (
                    <span className="text-xl text-muted-foreground/40">?</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map area */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <div className="relative aspect-[4/3] md:aspect-[16/9] bg-card rounded-3xl shadow-card overflow-hidden">
          {/* Map background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2381D4FA' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Decorative clouds */}
          <div className="absolute top-4 left-8 w-20 h-8 bg-white/60 rounded-full blur-sm" />
          <div className="absolute top-8 left-16 w-16 h-6 bg-white/40 rounded-full blur-sm" />
          <div className="absolute top-6 right-12 w-24 h-10 bg-white/50 rounded-full blur-sm" />

          {/* Location markers */}
          {locations.map((location) => {
            const isSolved = solvedLocations.includes(location.id);
            const Icon = location.icon;
            
            return (
              <button
                key={location.id}
                onClick={() => !isSolved && onSelectLocation(location.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isSolved ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
                style={{
                  left: `${location.position.x}%`,
                  top: `${location.position.y}%`
                }}
                disabled={isSolved}
              >
                <div className={`location-marker ${isSolved ? "solved" : "unsolved"} ${location.bgColor}`}>
                  {isSolved ? (
                    <span className="text-3xl">{location.badgeEmoji}</span>
                  ) : (
                    <Icon className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="mt-2 text-center">
                  <span className={`text-sm font-bold px-2 py-1 rounded-full ${isSolved ? "bg-mint text-white" : "bg-card text-foreground"}`}>
                    {location.name}
                  </span>
                </div>
                {!isSolved && (
                  <Star className="absolute -top-1 -right-1 w-5 h-5 text-sunshine animate-sparkle" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Final challenge button */}
      {allSolved && (
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <button
            onClick={onGoToFinal}
            className="btn-sunshine w-full text-xl animate-bounce-in flex items-center justify-center gap-2"
          >
            🏆 최종 퀴즈왕 도전하기!
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <p className="text-center text-muted-foreground text-sm">
          반짝이는 장소를 클릭해서 사건을 해결하세요! ✨
        </p>
      </div>
    </div>
  );
}
