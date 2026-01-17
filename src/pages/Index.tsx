import { useGameState } from "@/hooks/useGameState";
import { SplashScreen } from "@/components/SplashScreen";
import { MapScreen } from "@/components/MapScreen";
import { QuizModal } from "@/components/QuizModal";
import { FinalQuiz } from "@/components/FinalQuiz";
import { Certificate } from "@/components/Certificate";

const Index = () => {
  const {
    gameState,
    setDetectiveName,
    startGame,
    selectLocation,
    advanceQuizStep,
    completeLocation,
    goToMap,
    goToFinal,
    setAiPromise,
    goToCertificate,
    saveThoughts,
    resetGame,
    allLocationsSolved
  } = useGameState();

  const handleSplashStart = (name: string) => {
    setDetectiveName(name);
    startGame();
  };

  const handleFinalComplete = (promise: string) => {
    setAiPromise(promise);
    goToCertificate();
  };

  // Render based on current screen
  if (gameState.currentScreen === "splash" || !gameState.detectiveName) {
    return <SplashScreen onStart={handleSplashStart} />;
  }

  if (gameState.currentScreen === "final") {
    return <FinalQuiz onComplete={handleFinalComplete} onBack={goToMap} onGoHome={resetGame} />;
  }

  if (gameState.currentScreen === "certificate") {
    return (
      <Certificate
        detectiveName={gameState.detectiveName}
        aiPromise={gameState.aiPromise}
        thoughts={gameState.thoughts}
        onReset={resetGame}
      />
    );
  }

  // Map screen with potential quiz overlay
  return (
    <>
      <MapScreen
        detectiveName={gameState.detectiveName}
        solvedLocations={gameState.solvedLocations}
        onSelectLocation={selectLocation}
        onGoToFinal={goToFinal}
        onGoHome={resetGame}
        allSolved={allLocationsSolved}
        goodCollected={gameState.goodCollected}
        badCollected={gameState.badCollected}
      />
      
      {gameState.currentScreen === "quiz" && gameState.currentLocationId && (
        <QuizModal
          locationId={gameState.currentLocationId}
          quizStep={gameState.quizStep as "intro" | "duality" | "good" | "bad" | "success"}
          onAdvance={advanceQuizStep}
          onComplete={completeLocation}
          onBack={goToMap}
          onSaveThoughts={saveThoughts}
        />
      )}
    </>
  );
};

export default Index;
