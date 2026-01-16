import { useRef } from "react";
import { Download, RotateCcw, Award, Star } from "lucide-react";
import html2canvas from "html2canvas";
import { locations } from "@/data/quizData";
import logo from "@/assets/logo.png";

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
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-4">
      <img src={logo} alt="AI 탐정단" className="h-12 mb-4" />
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
        <div className="text-center mb-6">
          <h1 className="font-display text-3xl text-foreground mb-1">
            🏆 일등 탐정 인증서 🏆
          </h1>
          <p className="text-sky-dark font-medium">AI 탐정단 - 두 얼굴의 도시를 구해라!</p>
        </div>

        {/* Award icon */}
        <div className="w-20 h-20 mx-auto mb-4 bg-sunshine rounded-full flex items-center justify-center">
          <Award className="w-10 h-10 text-foreground" />
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
          <div className="flex justify-center gap-2 flex-wrap">
            {locations.map((location) => (
              <span key={location.id} className="text-2xl" title={location.name}>
                {location.badgeEmoji}
              </span>
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

      {/* Congratulations message */}
      <p className="mt-6 text-center text-foreground/80 max-w-md">
        🎉 축하해요! AI의 좋은 점과 위험한 점을 모두 알게 되었어요!<br />
        앞으로도 AI를 현명하게 사용하는 멋진 탐정이 되세요! 🕵️
      </p>
    </div>
  );
}
