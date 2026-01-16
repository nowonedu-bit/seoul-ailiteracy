import { locations } from "@/data/quizData";
import { Award, Star, Home } from "lucide-react";
import logo from "@/assets/logo.png";
import mapBg from "@/assets/map-bg.png";
import { BadgeIcon } from "./BadgeIcon";
import { LocationIcon } from "./LocationIcon";
import { CollectionGauge } from "./CollectionGauge";

interface MapScreenProps {
  detectiveName: string;
  solvedLocations: string[];
  onSelectLocation: (locationId: string) => void;
  onGoToFinal: () => void;
  onGoHome: () => void;
  allSolved: boolean;
  goodCollected: number;
  badCollected: number;
}

export function MapScreen({
  detectiveName,
  solvedLocations,
  onSelectLocation,
  onGoToFinal,
  onGoHome,
  allSolved,
  goodCollected,
  badCollected
}: MapScreenProps) {
  return (
    <div className="min-h-screen gradient-map">
      <header className="bg-card/90 backdrop-blur-sm shadow-soft p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <img src={logo} alt="AI 탐정단" className="h-12 md:h-14" />
          <div className="flex items-center gap-4">
            <span className="font-display text-base text-foreground">
              🔍 <span className="text-sky-dark">{detectiveName}</span> 탐정님
            </span>
            <div className="flex items-center gap-2 bg-sunshine/20 px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-sunshine-dark" />
              <span className="font-bold text-foreground">
                {solvedLocations.length}/6
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 모은 배지 */}
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
                      <BadgeIcon 
                        locationId={location.id}
                        size="sm"
                      />
                    ) : (
                      <span className="text-xl text-muted-foreground/40">?</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 탐색 지수 게이지 */}
          <CollectionGauge 
            goodCount={goodCollected} 
            badCount={badCollected} 
            totalLocations={6} 
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-6">
        <div 
          className="relative aspect-[4/3] md:aspect-[16/9] rounded-3xl shadow-card overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${mapBg})` }}
        >

          {locations.map((location) => {
            const isSolved = solvedLocations.includes(location.id);
            
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
                <div className="flex flex-col items-center">
                  {isSolved ? (
                    <BadgeIcon locationId={location.id} size="lg" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white/90 shadow-lg flex items-center justify-center border-4 border-sunshine">
                      <LocationIcon locationId={location.id} size="lg" />
                    </div>
                  )}
                </div>
                {!isSolved && (
                  <Star className="absolute -top-1 -right-1 w-5 h-5 text-sunshine animate-sparkle" />
                )}
              </button>
            );
          })}
        </div>
      </div>

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

      <div className="max-w-4xl mx-auto px-4 pb-8">
        <p className="text-center text-muted-foreground text-sm mb-4">
          반짝이는 장소를 클릭해서 사건을 해결하세요! ✨
        </p>
        <button
          onClick={onGoHome}
          className="mx-auto flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <Home className="w-4 h-4" />
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}
