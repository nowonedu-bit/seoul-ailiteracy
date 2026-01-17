import { useState } from "react";
import { locations } from "@/data/quizData";
import type { Location } from "@/data/quizData";
import { ArrowRight, CheckCircle, XCircle, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { LocationIcon } from "./LocationIcon";
import { BadgeIcon } from "./BadgeIcon";
import { DualityCheck } from "./DualityCheck";
import logo from "@/assets/logo.png";

interface QuizModalProps {
  locationId: string;
  quizStep: "intro" | "duality" | "good" | "bad" | "success";
  onAdvance: () => void;
  onComplete: () => void;
  onBack: () => void;
  onSaveThoughts: (locationId: string, goodThought: string, badThought: string) => void;
}

export function QuizModal({
  locationId,
  quizStep,
  onAdvance,
  onComplete,
  onBack,
  onSaveThoughts
}: QuizModalProps) {
  const location = locations.find(l => l.id === locationId) as Location;
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const currentQuiz = quizStep === "good" ? location.goodQuiz : location.badQuiz;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    const correct = index === currentQuiz.correctIndex;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFEB3B', '#81D4FA', '#4DD0E1', '#FFB74D']
      });
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleNext = () => {
    if (!isCorrect) {
      setSelectedAnswer(null);
      setShowResult(false);
      return;
    }

    if (quizStep === "good") {
      setSelectedAnswer(null);
      setShowResult(false);
      onAdvance();
    } else if (quizStep === "bad") {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FFEB3B', '#81D4FA', '#4DD0E1', '#FFB74D', '#AED581']
      });
      onAdvance();
    }
  };

  if (quizStep === "intro") {
    return (
      <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50">
        <img src={logo} alt="AI 탐정단" className="h-16 md:h-20 object-contain mb-4" />
        <div className="card-detective max-w-lg w-full animate-scale-in">
          <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
            <LocationIcon locationId={location.id} size="lg" className="w-28 h-28" />
          </div>
          
          <h2 className="font-display text-2xl text-center text-foreground mb-2">
            {location.name}에서 사건 발생! 🚨
          </h2>
          
          <div className="bg-sky/20 rounded-2xl p-4 mb-6">
            <p className="text-center font-medium text-sky-dark mb-1">
              {location.aiType}
            </p>
            <p className="text-center text-muted-foreground">
              {location.aiDescription}
            </p>
          </div>

          <p className="text-center text-foreground mb-6">
            이 AI의 좋은 점과 위험한 점을<br />
            찾아서 사건을 해결하세요!
          </p>

          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-3 px-6 rounded-2xl border-2 border-border text-muted-foreground font-bold hover:bg-muted transition-colors"
            >
              돌아가기
            </button>
            <button
              onClick={onAdvance}
              className="flex-1 btn-sky flex items-center justify-center gap-2"
            >
              시작! <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizStep === "duality") {
    return (
      <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50">
        <img src={logo} alt="AI 탐정단" className="h-12 md:h-16 object-contain mb-2 flex-shrink-0" />
        <div className="card-detective max-w-lg w-full animate-scale-in overflow-hidden flex flex-col max-h-[80vh]">
          <div className="overflow-y-auto flex-1 px-1">
            <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
              <LocationIcon locationId={location.id} size="lg" className="w-16 h-16" />
            </div>
            
            <DualityCheck 
              location={location} 
              onComplete={(goodThought, badThought) => {
                onSaveThoughts(location.id, goodThought, badThought);
                onAdvance();
              }} 
            />
          </div>
        </div>
      </div>
    );
  }

  if (quizStep === "success") {
    return (
      <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50">
        <img src={logo} alt="AI 탐정단" className="h-16 md:h-20 object-contain mb-4" />
        <div className="card-detective max-w-lg w-full animate-bounce-in text-center">
          <div className="w-28 h-28 mx-auto mb-4 flex items-center justify-center">
            <BadgeIcon locationId={location.id} size="lg" />
          </div>
          
          <h2 className="font-display text-3xl text-foreground mb-2">
            사건 해결! 🎉
          </h2>
          
          <p className="text-lg text-muted-foreground mb-2">
            {location.name}의 AI 비밀을 밝혀냈어요!
          </p>

          <div className="bg-sunshine/20 rounded-2xl p-4 mb-6">
            <p className="font-display text-xl text-sunshine-dark">
              {location.badgeEmoji} 배지 획득!
            </p>
          </div>

          <button
            onClick={onComplete}
            className="btn-sunshine w-full text-xl flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            지도로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50">
      <img src={logo} alt="AI 탐정단" className="h-12 md:h-16 object-contain mb-2 flex-shrink-0" />
      <div className={`card-detective max-w-lg w-full animate-fade-in overflow-hidden flex flex-col max-h-[85vh] ${isShaking ? "shake" : ""}`}>
        <div className="overflow-y-auto flex-1 px-1">
          <div className="flex justify-center gap-2 mb-3">
            <div className={`w-3 h-3 rounded-full ${quizStep === "good" ? "bg-sunshine" : "bg-mint"}`} />
            <div className={`w-3 h-3 rounded-full ${quizStep === "bad" ? "bg-sunshine" : "bg-muted"}`} />
          </div>

          <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-3 ${quizStep === "good" ? "bg-mint/20 text-mint" : "bg-coral/20 text-coral"}`}>
            {quizStep === "good" ? "🔎 단서 1: 이로운 점 찾기" : "🔎 단서 2: 해로운 점 찾기"}
          </div>

          {/* 사건 내용 요약 */}
          <div className="bg-lavender/10 border border-lavender/30 rounded-xl p-3 mb-4">
            <p className="text-xs text-muted-foreground">
              <span className="font-bold text-lavender-dark">📋 사건:</span> {location.scenario}
            </p>
          </div>

          <h3 className="font-display text-lg text-foreground mb-4">
            {currentQuiz.question}
          </h3>

        <div className="space-y-3 mb-6">
          {currentQuiz.options.map((option, index) => {
            let buttonClass = "w-full p-4 rounded-2xl border-2 text-left transition-all ";
            
            if (showResult) {
              if (isCorrect && index === currentQuiz.correctIndex) {
                // 정답을 맞혔을 때만 정답 표시
                buttonClass += "border-mint bg-mint/10 text-foreground";
              } else if (index === selectedAnswer && !isCorrect) {
                // 오답 선택 표시
                buttonClass += "border-destructive bg-destructive/10 text-foreground";
              } else {
                // 나머지는 그냥 흐리게 (정답 힌트 안 줌)
                buttonClass += "border-border bg-muted/50 text-muted-foreground";
              }
            } else if (selectedAnswer === index) {
              buttonClass += "border-sky bg-sky/10 text-foreground";
            } else {
              buttonClass += "border-border bg-card text-foreground hover:border-sky hover:bg-sky/5";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={buttonClass}
                disabled={showResult}
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </span>
                  <span className="flex-1 pt-1">{option}</span>
                  {showResult && isCorrect && index === currentQuiz.correctIndex && (
                    <CheckCircle className="w-6 h-6 text-mint flex-shrink-0" />
                  )}
                  {showResult && index === selectedAnswer && !isCorrect && (
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={`p-4 rounded-2xl mb-4 ${isCorrect ? "bg-mint/20" : "bg-amber-100"}`}>
            <p className={`text-center font-bold mb-2 ${isCorrect ? "text-mint" : "text-amber-700"}`}>
              {isCorrect ? "🎉 단서를 찾았어요!" : "😅 아쉬워요! 다시 추리해볼까요?"}
            </p>
            <p className="text-sm text-muted-foreground text-center">
              {isCorrect ? `🔍 탐정 수첩: ${currentQuiz.explanation}` : `💡 힌트: ${currentQuiz.hint}`}
            </p>
          </div>
        )}

        {showResult && (
          <button
            onClick={handleNext}
            className={`w-full ${isCorrect ? "btn-sunshine" : "btn-sky"} text-lg flex items-center justify-center gap-2`}
          >
            {isCorrect ? (
              <>다음으로 <ArrowRight className="w-5 h-5" /></>
            ) : (
              "🔍 다시 추리하기"
            )}
          </button>
        )}
        </div>
      </div>
    </div>
  );
}
