import { useState, useEffect } from "react";

interface ThoughtRecord {
  locationId: string;
  goodThought: string;
  badThought: string;
}

interface GameState {
  detectiveName: string;
  solvedLocations: string[];
  currentScreen: "splash" | "map" | "quiz" | "final" | "certificate";
  currentLocationId: string | null;
  quizStep: "intro" | "duality" | "good" | "bad" | "success";
  aiPromise: string;
  // 수집 카운트
  goodCollected: number;
  badCollected: number;
  // 학생들의 생각 기록
  thoughts: ThoughtRecord[];
}

const STORAGE_KEY = "ai-detective-game";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 새로운 필드가 없으면 기본값 추가
        return {
          ...getInitialState(),
          ...parsed,
        };
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
      aiPromise: "",
      goodCollected: 0,
      badCollected: 0,
      thoughts: []
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
      const steps: GameState["quizStep"][] = ["intro", "duality", "good", "bad", "success"];
      const currentIndex = steps.indexOf(prev.quizStep);
      const nextStep = steps[Math.min(currentIndex + 1, steps.length - 1)];
      
      // 수집 카운트 증가
      let goodCollected = prev.goodCollected;
      let badCollected = prev.badCollected;
      
      if (prev.quizStep === "good") {
        goodCollected = prev.goodCollected + 1;
      } else if (prev.quizStep === "bad") {
        badCollected = prev.badCollected + 1;
      }
      
      return { ...prev, quizStep: nextStep, goodCollected, badCollected };
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

  const saveThoughts = (locationId: string, goodThought: string, badThought: string) => {
    setGameState(prev => ({
      ...prev,
      thoughts: [...prev.thoughts.filter(t => t.locationId !== locationId), { locationId, goodThought, badThought }]
    }));
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
    saveThoughts,
    resetGame,
    isLocationSolved,
    allLocationsSolved
  };
}
