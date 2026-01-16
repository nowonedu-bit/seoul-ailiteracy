import { LucideIcon, School, Home, Palmtree, BookOpen, Utensils, Trophy } from "lucide-react";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Location {
  id: string;
  name: string;
  icon: LucideIcon;
  aiType: string;
  aiDescription: string;
  goodQuiz: QuizQuestion;
  badQuiz: QuizQuestion;
  badgeEmoji: string;
  position: { x: number; y: number };
  bgColor: string;
}

export const locations: Location[] = [
  {
    id: "classroom",
    name: "교실",
    icon: School,
    aiType: "이미지 생성 AI",
    aiDescription: "그림을 뚝딱 만들어주는 AI예요!",
    goodQuiz: {
      question: "이미지 생성 AI의 좋은 점은 무엇일까요? 😊",
      options: [
        "내 머릿속 상상을 멋진 그림으로 뚝딱 그려줘요",
        "친구의 비밀 일기장을 몰래 훔쳐볼 수 있어요",
        "모든 사람들이 그림 그리는 것을 금지시켜요"
      ],
      correctIndex: 0
    },
    badQuiz: {
      question: "이미지 생성 AI의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "AI를 사용하면 컴퓨터가 너무 뜨거워져서 고장나요",
        "다른 사람의 그림을 허락 없이 따라 그려서 저작권을 침해할 수 있어요",
        "AI는 검은색으로만 그림을 그릴 수 있어요"
      ],
      correctIndex: 1
    },
    badgeEmoji: "🎨",
    position: { x: 15, y: 20 },
    bgColor: "bg-coral"
  },
  {
    id: "home",
    name: "우리 집",
    icon: Home,
    aiType: "콘텐츠 추천 AI",
    aiDescription: "내가 좋아할 영상을 찾아주는 AI예요!",
    goodQuiz: {
      question: "콘텐츠 추천 AI의 좋은 점은 무엇일까요? 😊",
      options: [
        "AI가 숙제를 대신 해줘서 놀 시간이 많아져요",
        "일부러 내가 싫어하는 영상만 골라서 보여줘요",
        "내가 좋아할 만한 영상을 알아서 찾아줘서 편리해요"
      ],
      correctIndex: 2
    },
    badQuiz: {
      question: "콘텐츠 추천 AI의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "내가 좋아하는 영상만 보게 되어서 생각이 좁아질 수 있어요",
        "AI가 우리 집 TV를 가져가서 영상을 못 봐요",
        "AI가 갑자기 나에게 화를 내면서 소리를 질러요"
      ],
      correctIndex: 0
    },
    badgeEmoji: "📺",
    position: { x: 75, y: 15 },
    bgColor: "bg-peach"
  },
  {
    id: "playground",
    name: "놀이터",
    icon: Palmtree,
    aiType: "실시간 번역 AI",
    aiDescription: "다른 나라 말을 척척 번역해주는 AI예요!",
    goodQuiz: {
      question: "실시간 번역 AI의 좋은 점은 무엇일까요? 😊",
      options: [
        "사람들이 하는 거짓말을 모두 찾아내서 알려줘요",
        "말이 통하지 않는 외국인 친구와도 즐겁게 대화하고 친구가 될 수 있어요",
        "내가 하는 말을 마음대로 다른 뜻으로 바꿔버려요"
      ],
      correctIndex: 1
    },
    badQuiz: {
      question: "실시간 번역 AI의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "번역기를 쓰면 외국인 친구가 나를 무서워해서 도망가요",
        "번역기를 사용하면 내 목소리가 로봇 소리로 바뀌어요",
        "번역기의 잘못된 번역을 그대로 믿고 대화하면 대화가 잘 안될 수도 있어요"
      ],
      correctIndex: 2
    },
    badgeEmoji: "🌍",
    position: { x: 50, y: 45 },
    bgColor: "bg-mint"
  },
  {
    id: "academy",
    name: "학원",
    icon: BookOpen,
    aiType: "인공지능 튜터",
    aiDescription: "공부를 도와주는 선생님 AI예요!",
    goodQuiz: {
      question: "인공지능 튜터의 좋은 점은 무엇일까요? 😊",
      options: [
        "시험 문제의 정답을 미리 몰래 알려줘서 100점을 받을 수 있어요",
        "내가 모르는 부분을 친절하고 자세하게 설명해 줘서 공부를 도와줘요",
        "공부를 전혀 안 해도 마법처럼 똑똑해지게 만들어줘요"
      ],
      correctIndex: 1
    },
    badQuiz: {
      question: "인공지능 튜터의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "AI 튜터가 화가 나면 내 연필을 모두 부러뜨려요",
        "AI 튜터가 밤새도록 잠을 못 자게 공부시켜요",
        "스스로 생각하지 않고 AI가 주는 정답만 베끼는 습관이 생길 수 있어요"
      ],
      correctIndex: 2
    },
    badgeEmoji: "📚",
    position: { x: 20, y: 65 },
    bgColor: "bg-lavender"
  },
  {
    id: "cafeteria",
    name: "급식실",
    icon: Utensils,
    aiType: "푸드 스캐너 & 식단 AI",
    aiDescription: "건강한 식단을 추천해주는 AI예요!",
    goodQuiz: {
      question: "푸드 스캐너 AI의 좋은 점은 무엇일까요? 😊",
      options: [
        "맛없는 채소를 달콤한 초콜릿 맛으로 바꿔줘요",
        "음식을 남겨도 선생님께 혼나지 않게 해줘요",
        "내가 먹은 영양소를 분석해 내 건강에 딱 맞는 식단을 추천해 줘요"
      ],
      correctIndex: 2
    },
    badQuiz: {
      question: "푸드 스캐너 AI의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "식판 사진을 찍을 때 나의 얼굴이나 식습관 같은 개인정보가 유출될 수 있어요",
        "AI가 배가 고파서 내 반찬을 몰래 뺏어 먹어요",
        "AI를 사용하면 급식실 밥이 갑자기 맛없어져요"
      ],
      correctIndex: 0
    },
    badgeEmoji: "🍽️",
    position: { x: 80, y: 55 },
    bgColor: "bg-sunshine"
  },
  {
    id: "gym",
    name: "체육관",
    icon: Trophy,
    aiType: "AI 심판 (VAR, 호크아이)",
    aiDescription: "공정한 판정을 도와주는 AI예요!",
    goodQuiz: {
      question: "AI 심판의 좋은 점은 무엇일까요? 😊",
      options: [
        "우리 팀이 무조건 이기도록 편파 판정을 해줘요",
        "사람의 눈으로 놓치기 쉬운 작은 반칙도 정확하게 찾아내 공정해요",
        "경기 시작 전에 어느 팀이 이길지 미리 정해줘요"
      ],
      correctIndex: 1
    },
    badQuiz: {
      question: "AI 심판의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "AI 심판이 선수들과 같이 운동장에서 공을 차요",
        "AI 심판이 화가 나면 축구공을 모두 터뜨려버려요",
        "판정은 정확해지지만, 경기 속의 따뜻한 감동이나 이해가 부족해질 수 있어요"
      ],
      correctIndex: 2
    },
    badgeEmoji: "⚽",
    position: { x: 50, y: 80 },
    bgColor: "bg-sky"
  }
];

export const finalQuizQuestions = [
  {
    question: "AI가 만든 그림도 저작권이 있을 수 있다",
    answer: true
  },
  {
    question: "AI가 추천하는 영상만 보면 다양한 생각을 할 수 있다",
    answer: false
  },
  {
    question: "AI를 사용할 때는 개인정보 보호에 주의해야 한다",
    answer: true
  }
];
