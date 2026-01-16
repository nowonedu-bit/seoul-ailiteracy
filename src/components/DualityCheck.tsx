import { useState } from "react";
import { Lightbulb, AlertTriangle, ArrowRight, CheckCircle } from "lucide-react";
import type { Location } from "@/data/quizData";

interface DualityCheckProps {
  location: Location;
  onComplete: () => void;
}

export function DualityCheck({ location, onComplete }: DualityCheckProps) {
  const [goodChecked, setGoodChecked] = useState(false);
  const [badChecked, setBadChecked] = useState(false);
  const [showGoodContent, setShowGoodContent] = useState(false);
  const [showBadContent, setShowBadContent] = useState(false);

  const bothChecked = goodChecked && badChecked;

  const handleGoodClick = () => {
    setShowGoodContent(true);
    setGoodChecked(true);
  };

  const handleBadClick = () => {
    setShowBadContent(true);
    setBadChecked(true);
  };

  // 이로움/해로움 설명 텍스트 (퀴즈 explanation 기반)
  const goodExplanation = location.goodQuiz.explanation;
  const badExplanation = location.badQuiz.explanation;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="font-display text-xl text-foreground mb-2">
          🤔 잠깐! 먼저 생각해볼까요?
        </h3>
        <p className="text-muted-foreground text-sm">
          <span className="text-foreground font-semibold">{location.aiType}</span>의 두 얼굴을 확인하세요!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* 이로움 버튼 */}
        <button
          onClick={handleGoodClick}
          className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
            goodChecked 
              ? "border-mint bg-mint/20" 
              : "border-border bg-card hover:border-mint hover:bg-mint/5"
          }`}
        >
          {goodChecked && (
            <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-mint" />
          )}
          <Lightbulb className={`w-10 h-10 mx-auto mb-2 ${goodChecked ? "text-mint" : "text-muted-foreground"}`} />
          <p className={`font-bold text-sm ${goodChecked ? "text-mint" : "text-foreground"}`}>
            💡 이로움
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            편리해지는 점은?
          </p>
        </button>

        {/* 해로움 버튼 */}
        <button
          onClick={handleBadClick}
          className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
            badChecked 
              ? "border-coral bg-coral/20" 
              : "border-border bg-card hover:border-coral hover:bg-coral/5"
          }`}
        >
          {badChecked && (
            <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-coral" />
          )}
          <AlertTriangle className={`w-10 h-10 mx-auto mb-2 ${badChecked ? "text-coral" : "text-muted-foreground"}`} />
          <p className={`font-bold text-sm ${badChecked ? "text-coral" : "text-foreground"}`}>
            ⚠️ 해로움
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            피해가 생길 수 있을까?
          </p>
        </button>
      </div>

      {/* 이로움 내용 */}
      {showGoodContent && (
        <div className="bg-mint/10 border-2 border-mint/30 rounded-2xl p-4 mb-3 animate-fade-in">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-mint text-sm mb-1">이 기술 덕분에 편리해지는 점!</p>
              <p className="text-sm text-foreground leading-relaxed">{goodExplanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* 해로움 내용 */}
      {showBadContent && (
        <div className="bg-coral/10 border-2 border-coral/30 rounded-2xl p-4 mb-3 animate-fade-in">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-coral text-sm mb-1">조심해야 할 점!</p>
              <p className="text-sm text-foreground leading-relaxed">{badExplanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* 진행 버튼 */}
      {bothChecked ? (
        <div className="animate-fade-in">
          <div className="bg-sunshine/20 rounded-2xl p-3 mb-4 text-center">
            <p className="text-sm text-sunshine-dark font-medium">
              ✨ 훌륭해요! 이제 두 가지 면을 모두 확인했어요!
            </p>
          </div>
          <button
            onClick={onComplete}
            className="btn-sunshine w-full text-lg flex items-center justify-center gap-2"
          >
            퀴즈 시작하기! <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="bg-muted rounded-2xl p-3 text-center">
          <p className="text-sm text-muted-foreground">
            {!goodChecked && !badChecked && "💡 이로움과 ⚠️ 해로움 둘 다 확인해주세요!"}
            {goodChecked && !badChecked && "⚠️ 해로움도 확인해주세요!"}
            {!goodChecked && badChecked && "💡 이로움도 확인해주세요!"}
          </p>
        </div>
      )}
    </div>
  );
}
