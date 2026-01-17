import { useRef } from "react";
import { Download, RotateCcw, Star } from "lucide-react";
import html2canvas from "html2canvas";
import { locations } from "@/data/quizData";
import logo from "@/assets/logo.png";
import { BadgeIcon } from "./BadgeIcon";

interface ThoughtRecord {
  locationId: string;
  goodThought: string;
  badThought: string;
}

interface CertificateProps {
  detectiveName: string;
  aiPromise: string;
  thoughts: ThoughtRecord[];
  onReset: () => void;
}

export function Certificate({ detectiveName, aiPromise, thoughts, onReset }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#FFFDE7",
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `AI탐정_인증서_${detectiveName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Failed to download certificate:", error);
    }
  };

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen gradient-hero flex flex-col p-4 overflow-auto">
      <img src={logo} alt="AI 탐정단" className="h-12 md:h-14 object-contain mb-4 flex-shrink-0" />
      <div className="flex-1 flex flex-col items-center pb-8">
        {/* Certificate */}
        <div
          ref={certificateRef}
          className="bg-[#FFFDE7] rounded-3xl p-6 max-w-lg w-full shadow-2xl border-8 border-sunshine"
        >
          {/* Header decorations */}
          <div className="flex justify-center gap-2 mb-3">
            <Star className="w-5 h-5 text-sunshine-dark" />
            <Star className="w-7 h-7 text-sunshine" />
            <Star className="w-5 h-5 text-sunshine-dark" />
          </div>

          {/* Title */}
          <div className="text-center mb-3">
            <h1 className="font-display text-2xl text-foreground mb-1">🕵️ 명예 AI 탐정 인증서 🕵️</h1>
            <p className="text-sky-dark font-medium text-sm">AI 탐정단 - 두 얼굴의 도시를 구해라!</p>
          </div>

          {/* Name */}
          <div className="text-center mb-4">
            <p className="text-muted-foreground text-sm mb-1">AI의 두 얼굴을 밝혀낸</p>
            <p className="font-display text-2xl text-sky-dark border-b-4 border-sunshine inline-block px-4 pb-1">
              {detectiveName}
            </p>
            <p className="text-foreground mt-1">탐정님께 수여합니다</p>
          </div>

          {/* Badges */}
          <div className="bg-white/60 rounded-2xl p-3 mb-3">
            <p className="text-xs text-muted-foreground text-center mb-2">🔍 수집한 증거 배지</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {locations.map((location) => (
                <BadgeIcon key={location.id} locationId={location.id} size="sm" />
              ))}
            </div>
          </div>

          {/* Detective Report */}
          {thoughts.length > 0 && (
            <div className="bg-lavender/20 rounded-2xl p-3 mb-3">
              <p className="text-xs text-lavender-dark text-center mb-2 font-bold">📋 탐정 수첩 기록</p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {thoughts.slice(0, 3).map((thought) => {
                  const loc = locations.find(l => l.id === thought.locationId);
                  return (
                    <div key={thought.locationId} className="text-xs bg-white/50 rounded-lg p-2">
                      <p className="font-bold text-lavender-dark mb-1">{loc?.badgeEmoji} {loc?.name}</p>
                      <p className="text-mint">💡 {thought.goodThought}</p>
                      <p className="text-coral">⚠️ {thought.badThought}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Promise */}
          <div className="bg-sky/20 rounded-2xl p-3 mb-3">
            <p className="text-xs text-sky-dark text-center mb-1">🤝 탐정의 AI 사용 약속</p>
            <p className="text-center text-foreground font-medium text-sm">"{aiPromise}"</p>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">{today}</p>
            <p className="text-xs text-muted-foreground">AI 탐정단 본부장 🏛️</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button onClick={handleDownload} className="btn-sunshine flex items-center gap-2">
            <Download className="w-5 h-5" />
            이미지 저장
          </button>
          <button onClick={onReset} className="btn-sky flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            처음부터
          </button>
        </div>

        {/* Congratulations message */}
        <div className="mt-6 text-center max-w-md bg-white/80 rounded-2xl p-4">
          <p className="text-foreground font-bold mb-2">🎉 축하합니다, {detectiveName} 탐정님!</p>
          <p className="text-sm text-muted-foreground">
            AI의 이로운 점과 해로운 점을 균형있게 파악하는 능력을 갖추셨습니다.
            앞으로도 AI를 사용할 때 항상 두 얼굴을 살피는 현명한 탐정이 되어주세요! 🕵️✨
          </p>
        </div>
      </div>
    </div>
  );
}
