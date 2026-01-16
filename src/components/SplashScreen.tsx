import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";

interface SplashScreenProps {
  onStart: (name: string) => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  const [name, setName] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 1) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    onStart(name.trim());
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6">
      {/* Floating decorations */}
      <div className="absolute top-10 left-10 animate-float">
        <Sparkles className="w-8 h-8 text-sunshine-dark opacity-60" />
      </div>
      <div className="absolute top-20 right-16 animate-float" style={{ animationDelay: "0.5s" }}>
        <Search className="w-10 h-10 text-sky-dark opacity-60" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: "1s" }}>
        <Sparkles className="w-6 h-6 text-coral opacity-60" />
      </div>

      {/* Main content */}
      <div className="card-detective max-w-md w-full text-center animate-scale-in">
        {/* Logo */}
        <img 
          src={logo} 
          alt="AI 탐정단 - 두 얼굴의 도시를 구해라!" 
          className="w-80 md:w-96 mx-auto mb-8"
        />

        {/* Description */}
        <p className="text-muted-foreground mb-8 leading-relaxed">
          AI의 좋은 점과 위험한 점을 찾아<br />
          6개의 사건을 해결하고<br />
          <span className="text-foreground font-semibold">일등 탐정</span>이 되어보세요!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              멋진 탐정의 이름을 입력해줘! ✨
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 똑똑이, 용감이"
              className={`w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground text-center text-lg font-medium focus:outline-none focus:border-sunshine transition-colors ${isShaking ? "shake" : ""}`}
              maxLength={10}
            />
          </div>

          <button
            type="submit"
            className="btn-sunshine w-full text-xl"
          >
            🕵️ 탐정 시작하기!
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-8 text-sm text-foreground/60">
        초등학교 3학년 AI 리터러시 교육
      </p>
    </div>
  );
}
