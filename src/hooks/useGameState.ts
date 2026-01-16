import { useState, useEffect } from "react";

interface GameState {
  detectiveName: string;
  solvedLocations: string[];
  currentScreen: "splash" | "map" | "quiz" | "final" | "certificate";
  currentLocationId: string | null;
  quizStep: "intro" | "good" | "bad" | "success";
  aiPromise: string;
}

const STORAGE_KEY = "ai-detective-game";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return getInitialState();
      }
    }
    return getInitialState();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  function getInitialState(): GameState {
    return {
      detectiveName: "",
      solvedLocations: [],
      currentScreen: "splash",
      currentLocationId: null,
      quizStep: "intro",
      aiPromise: ""
    };
  }

  const setDetectiveName = (name: string) => {
    setGameState(prev => ({ ...prev, detectiveName: name }));
  };

  const startGame = () => {
    setGameState(prev => ({ ...prev, currentScreen: "map" }));
  };

  const selectLocation = (locationId: string) => {
    setGameState(prev => ({
      ...prev,
      currentLocationId: locationId,
      currentScreen: "quiz",
      quizStep: "intro"
    }));
  };

  const advanceQuizStep = () => {
    setGameState(prev => {
      const steps: GameState["quizStep"][] = ["intro", "good", "bad", "success"];
      const currentIndex = steps.indexOf(prev.quizStep);
      const nextStep = steps[Math.min(currentIndex + 1, steps.length - 1)];
      return { ...prev, quizStep: nextStep };
    });
  };

  const completeLocation = () => {
    setGameState(prev => ({
      ...prev,
      solvedLocations: prev.currentLocationId 
        ? [...prev.solvedLocations, prev.currentLocationId]
        : prev.solvedLocations,
      currentScreen: "map",
      currentLocationId: null,
      quizStep: "intro"
    }));
  };

  const goToMap = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: "map",
      currentLocationId: null,
      quizStep: "intro"
    }));
  };

  const goToFinal = () => {
    setGameState(prev => ({ ...prev, currentScreen: "final" }));
  };

  const setAiPromise = (promise: string) => {
    setGameState(prev => ({ ...prev, aiPromise: promise }));
  };

  const goToCertificate = () => {
    setGameState(prev => ({ ...prev, currentScreen: "certificate" }));
  };

  const resetGame = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGameState(getInitialState());
  };

  const isLocationSolved = (locationId: string) => {
    return gameState.solvedLocations.includes(locationId);
  };

  const allLocationsSolved = gameState.solvedLocations.length >= 6;

  return {
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
    resetGame,
    isLocationSolved,
    allLocationsSolved
  };
}
