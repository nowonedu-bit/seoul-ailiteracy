import { useState } from "react";
import { finalQuizQuestions } from "@/data/quizData";
import { ArrowRight, Trophy, Home } from "lucide-react";
import confetti from "canvas-confetti";
import logo from "@/assets/logo.png";

interface FinalQuizProps {
  onComplete: (promise: string) => void;
  onBack: () => void;
  onGoHome: () => void;
}

export function FinalQuiz({ onComplete, onBack, onGoHome }: FinalQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [promise, setPromise] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const question = finalQuizQuestions[currentQuestion];

  const handleAnswer = (answer: boolean) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct = answer === question.answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 }
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

    if (currentQuestion < finalQuizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#FFEB3B', '#81D4FA', '#4DD0E1', '#FFB74D', '#AED581']
      });
      setQuizComplete(true);
    }
  };

  const handleSubmitPromise = () => {
    if (promise.trim().length < 2) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    onComplete(promise.trim());
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-4">
        <img src={logo} alt="AI 탐정단" className="h-12 mb-4" />
        <div className={`card-detective max-w-lg w-full animate-scale-in ${isShaking ? "shake" : ""}`}>
          <div className="w-24 h-24 mx-auto mb-4 bg-sunshine rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-foreground" />
          </div>

          <h2 className="font-display text-2xl text-center text-foreground mb-2">
            최종 퀴즈 완료! 🎉
          </h2>

          <p className="text-center text-muted-foreground mb-6">
            {score}/{finalQuizQuestions.length} 문제를 맞혔어요!
          </p>

          <div className="bg-sky/20 rounded-2xl p-4 mb-6">
            <p className="text-center font-medium text-sky-dark mb-3">
              ✍️ 나의 AI 약속을 적어주세요!
            </p>
            <textarea
              value={promise}
              onChange={(e) => setPromise(e.target.value)}
              placeholder="예: AI를 사용할 때 항상 출처를 확인할게요!"
              className="w-full p-4 rounded-xl border-2 border-border bg-card text-foreground resize-none focus:outline-none focus:border-sky"
              rows={3}
              maxLength={100}
            />
          </div>

          <button
            onClick={handleSubmitPromise}
            className="btn-sunshine w-full text-xl"
          >
            🏆 인증서 받기!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-4">
      <img src={logo} alt="AI 탐정단" className="h-12 mb-4" />
      <div className={`card-detective max-w-lg w-full animate-fade-in ${isShaking ? "shake" : ""}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 돌아가기
          </button>
          <div className="flex items-center gap-2 bg-sunshine/20 px-3 py-1 rounded-full">
            <Trophy className="w-4 h-4 text-sunshine-dark" />
            <span className="font-bold text-sm">{currentQuestion + 1}/{finalQuizQuestions.length}</span>
          </div>
          <button
            onClick={onGoHome}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">처음으로</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-sunshine transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / finalQuizQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-sky/10 rounded-2xl p-4 mb-6">
          <p className="text-center text-sm text-sky-dark mb-2">O/X 퀴즈</p>
          <h3 className="font-display text-xl text-center text-foreground">
            "{question.question}"
          </h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[true, false].map((answer) => {
            let buttonClass = "py-6 rounded-2xl font-display text-2xl transition-all ";
            
            if (showResult) {
              if (isCorrect && answer === question.answer) {
                // 정답을 맞혔을 때만 정답 표시
                buttonClass += "bg-mint text-white";
              } else if (answer === selectedAnswer && !isCorrect) {
                // 오답 선택 표시
                buttonClass += "bg-destructive text-white";
              } else {
                // 나머지는 그냥 흐리게 (정답 힌트 안 줌)
                buttonClass += "bg-muted text-muted-foreground";
              }
            } else if (selectedAnswer === answer) {
              buttonClass += "bg-sky text-white";
            } else {
              buttonClass += "bg-card border-2 border-border text-foreground hover:border-sky";
            }

            return (
              <button
                key={answer.toString()}
                onClick={() => handleAnswer(answer)}
                className={buttonClass}
                disabled={showResult}
              >
                {answer ? "⭕ O" : "❌ X"}
              </button>
            );
          })}
        </div>

        {/* Result message */}
        {showResult && (
          <div className={`p-4 rounded-2xl mb-4 ${isCorrect ? "bg-mint/20" : "bg-destructive/20"}`}>
            <p className={`text-center font-bold mb-2 ${isCorrect ? "text-mint" : "text-destructive"}`}>
              {isCorrect ? "🎉 정답이에요!" : "😅 아쉬워요! 다시 도전해볼까요?"}
            </p>
            {isCorrect && question.explanation && (
              <p className="text-sm text-center text-muted-foreground mt-2 leading-relaxed">
                💡 {question.explanation}
              </p>
            )}
          </div>
        )}

        {/* Next button */}
        {showResult && (
          <button
            onClick={handleNext}
            className={`w-full ${isCorrect ? "btn-sunshine" : "btn-sky"} text-lg flex items-center justify-center gap-2`}
          >
            {isCorrect ? (
              currentQuestion < finalQuizQuestions.length - 1 ? (
                <>다음 문제 <ArrowRight className="w-5 h-5" /></>
              ) : (
                <>완료! <Trophy className="w-5 h-5" /></>
              )
            ) : (
              "다시 도전하기 💪"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
