import { useRef } from "react";
import { Download, RotateCcw, Star } from "lucide-react";
import html2canvas from "html2canvas";
import { locations } from "@/data/quizData";
import logo from "@/assets/logo.png";
import { BadgeIcon } from "./BadgeIcon";

interface CertificateProps {
  detectiveName: string;
  aiPromise: string;
  onReset: () => void;
}

export function Certificate({ detectiveName, aiPromise, onReset }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#FFFDE7",
        useCORS: true
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
    day: "numeric"
  });

  return (
    <div className="min-h-screen gradient-hero flex flex-col p-4">
      <img src={logo} alt="AI 탐정단" className="h-12 md:h-14 object-contain mb-6" />
      <div className="flex-1 flex flex-col items-center justify-center">
      {/* Certificate */}
      <div
        ref={certificateRef}
        className="bg-[#FFFDE7] rounded-3xl p-8 max-w-lg w-full shadow-2xl border-8 border-sunshine"
        style={{ minHeight: "500px" }}
      >
        {/* Header decorations */}
        <div className="flex justify-center gap-2 mb-4">
          <Star className="w-6 h-6 text-sunshine-dark" />
          <Star className="w-8 h-8 text-sunshine" />
          <Star className="w-6 h-6 text-sunshine-dark" />
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="font-display text-3xl text-foreground mb-1">
            🏆 일등 탐정 인증서 🏆
          </h1>
          <p className="text-sky-dark font-medium mb-3">AI 탐정단 - 두 얼굴의 도시를 구해라!</p>
          <img src={logo} alt="AI 탐정단" className="h-12 mx-auto" />
        </div>

        {/* Name */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground mb-1">이 인증서를 다음 분께 수여합니다</p>
          <p className="font-display text-3xl text-sky-dark border-b-4 border-sunshine inline-block px-4 pb-1">
            {detectiveName}
          </p>
          <p className="text-lg text-foreground mt-2">탐정님</p>
        </div>

        {/* Badges */}
        <div className="bg-white/60 rounded-2xl p-4 mb-4">
          <p className="text-sm text-muted-foreground text-center mb-2">획득한 배지</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {locations.map((location) => (
              <BadgeIcon
                key={location.id}
                locationId={location.id}
                size="md"
              />
            ))}
          </div>
        </div>

        {/* Promise */}
        <div className="bg-sky/20 rounded-2xl p-4 mb-6">
          <p className="text-sm text-sky-dark text-center mb-1">✍️ 나의 AI 약속</p>
          <p className="text-center text-foreground font-medium">"{aiPromise}"</p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{today}</p>
          <p className="text-xs text-muted-foreground mt-1">AI 탐정단 본부</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDownload}
          className="btn-sunshine flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          이미지 저장
        </button>
        <button
          onClick={onReset}
          className="btn-sky flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          처음부터
        </button>
      </div>

      {/* 비판적 피드백 리포트 */}
      <div className="mt-6 max-w-lg w-full bg-card/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg">
        <h3 className="font-display text-lg text-center text-foreground mb-3">
          📋 {detectiveName} 탐정님의 성찰 리포트
        </h3>
        
        <div className="space-y-3">
          <div className="bg-mint/10 border border-mint/30 rounded-xl p-3">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-bold text-mint">💡 이로움 탐색:</span> {detectiveName} 탐정님은 AI가 우리 생활을 
              <span className="font-semibold text-mint"> 편리하게 만들어주는 점</span>을 아주 잘 찾아냈어요! 
              번역, 추천, 학습 도우미 등 다양한 AI의 도움을 이해했어요.
            </p>
          </div>
          
          <div className="bg-coral/10 border border-coral/30 rounded-xl p-3">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-bold text-coral">⚠️ 해로움 탐색:</span> 특히 <span className="font-semibold text-coral">저작권 침해, 개인정보 유출, 
              생각의 편식</span> 같은 위험한 점도 꼼꼼하게 살피는 모습이 인상적이었어요!
            </p>
          </div>
          
          <div className="bg-sunshine/20 rounded-xl p-3 text-center">
            <p className="text-sm text-foreground leading-relaxed font-medium">
              ✨ 앞으로도 AI를 만날 때마다 <span className="text-sunshine-dark font-bold">두 가지 면을 모두 살펴보는</span> 
              멋진 비판적 사고를 가진 어린이가 되어봐요!
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
