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
  const [goodThought, setGoodThought] = useState("");
  const [badThought, setBadThought] = useState("");

  const bothChecked = goodChecked && badChecked;

  const handleGoodClick = () => {
    setShowGoodContent(true);
  };

  const handleBadClick = () => {
    setShowBadContent(true);
  };

  const handleGoodThoughtSubmit = () => {
    if (goodThought.trim().length >= 1) {
      setGoodChecked(true);
    }
  };

  const handleBadThoughtSubmit = () => {
    if (badThought.trim().length >= 1) {
      setBadChecked(true);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* 사건 시나리오 표시 */}
      <div className="bg-lavender/20 border-2 border-lavender/40 rounded-2xl p-4 mb-4">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-xl">🔍</span>
          <p className="font-bold text-lavender-dark text-sm">발생한 사건</p>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {location.scenario}
        </p>
      </div>

      <div className="text-center mb-4">
        <h3 className="font-display text-lg text-foreground mb-1">
          🤔 사건을 해결하기 전에!
        </h3>
        <p className="text-muted-foreground text-sm">
          이 <span className="text-foreground font-semibold">{location.aiType}</span>의 두 얼굴을 먼저 생각해보세요
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* 이로움 버튼 */}
        <button
          onClick={handleGoodClick}
          className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
            goodChecked 
              ? "border-mint bg-mint/20" 
              : showGoodContent
                ? "border-mint/50 bg-mint/10"
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
              : showBadContent
                ? "border-coral/50 bg-coral/10"
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

      {/* 이로움 질문 및 입력 */}
      {showGoodContent && !goodChecked && (
        <div className="bg-mint/10 border-2 border-mint/30 rounded-2xl p-4 mb-3 animate-fade-in">
          <div className="flex items-start gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-mint text-sm mb-1">생각해보세요! 🤔</p>
              <p className="text-sm text-foreground leading-relaxed">
                이 기술 덕분에 우리가 <span className="font-semibold text-mint">편리해지는 점</span>은 무엇일까요?
              </p>
            </div>
          </div>
          <textarea
            value={goodThought}
            onChange={(e) => setGoodThought(e.target.value)}
            placeholder="내 생각을 적어보세요..."
            className="w-full p-3 rounded-xl border-2 border-mint/30 bg-white text-foreground text-sm resize-none focus:outline-none focus:border-mint"
            rows={2}
            maxLength={100}
          />
          <button
            onClick={handleGoodThoughtSubmit}
            disabled={goodThought.trim().length < 1}
            className="mt-2 w-full py-2 rounded-xl bg-mint text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            ✅ 생각 완료!
          </button>
        </div>
      )}

      {/* 이로움 완료 표시 */}
      {goodChecked && (
        <div className="bg-mint/20 border-2 border-mint rounded-2xl p-3 mb-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-mint" />
            <p className="text-sm text-mint font-medium">이로움에 대해 생각했어요!</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1 ml-7">"{goodThought}"</p>
        </div>
      )}

      {/* 해로움 질문 및 입력 */}
      {showBadContent && !badChecked && (
        <div className="bg-coral/10 border-2 border-coral/30 rounded-2xl p-4 mb-3 animate-fade-in">
          <div className="flex items-start gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-coral text-sm mb-1">생각해보세요! 🤔</p>
              <p className="text-sm text-foreground leading-relaxed">
                이 기술 때문에 <span className="font-semibold text-coral">어떤 피해가 생길까요?</span>
              </p>
            </div>
          </div>
          <textarea
            value={badThought}
            onChange={(e) => setBadThought(e.target.value)}
            placeholder="내 생각을 적어보세요..."
            className="w-full p-3 rounded-xl border-2 border-coral/30 bg-white text-foreground text-sm resize-none focus:outline-none focus:border-coral"
            rows={2}
            maxLength={100}
          />
          <button
            onClick={handleBadThoughtSubmit}
            disabled={badThought.trim().length < 1}
            className="mt-2 w-full py-2 rounded-xl bg-coral text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            ✅ 생각 완료!
          </button>
        </div>
      )}

      {/* 해로움 완료 표시 */}
      {badChecked && (
        <div className="bg-coral/20 border-2 border-coral rounded-2xl p-3 mb-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-coral" />
            <p className="text-sm text-coral font-medium">해로움에 대해 생각했어요!</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1 ml-7">"{badThought}"</p>
        </div>
      )}

      {/* 진행 버튼 */}
      {bothChecked ? (
        <div className="animate-fade-in">
          <div className="bg-sunshine/20 rounded-2xl p-3 mb-4 text-center">
            <p className="text-sm text-sunshine-dark font-medium">
              ✨ 훌륭해요! 두 가지 면을 모두 생각했어요!
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
            {!showGoodContent && !showBadContent && "💡 이로움과 ⚠️ 해로움 버튼을 클릭해주세요!"}
            {showGoodContent && !goodChecked && !showBadContent && "💡 이로움에 대한 생각을 적어주세요!"}
            {showBadContent && !badChecked && !showGoodContent && "⚠️ 해로움에 대한 생각을 적어주세요!"}
            {goodChecked && !showBadContent && "⚠️ 해로움도 생각해주세요!"}
            {badChecked && !showGoodContent && "💡 이로움도 생각해주세요!"}
            {showGoodContent && !goodChecked && showBadContent && !badChecked && "두 가지 모두 생각을 적어주세요!"}
            {showGoodContent && !goodChecked && badChecked && "💡 이로움에 대한 생각을 적어주세요!"}
            {goodChecked && showBadContent && !badChecked && "⚠️ 해로움에 대한 생각을 적어주세요!"}
          </p>
        </div>
      )}
    </div>
  );
}
