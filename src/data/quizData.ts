import { LucideIcon, School, Home, Palmtree, BookOpen, Utensils, Trophy } from "lucide-react";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
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
        "내가 직접 그린 그림의 실수를 모두 지워줘요",
        "세상의 모든 그림을 똑같이 복사해줘요",
      ],
      correctIndex: 0,
      explanation:
        "인공지능은 우리가 말이나 글로 설명한 복잡한 생각을 순식간에 그림으로 만들어 주어, 표현하고 싶은 것을 마음껏 나타낼 수 있게 도와줘요.",
      hint: "AI가 우리의 '상상'을 어떻게 도와줄 수 있을지 생각해 보세요! 🎨",
    },
    badQuiz: {
      question: "이미지 생성 AI의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "너무 많은 그림을 그려서 컴퓨터의 저장 공간을 꽉 채워요",
        "다른 사람의 그림을 허락 없이 따라 그려서 저작권을 침해할 수 있어요",
        "실제 화가가 그린 그림보다 항상 더 예쁘게만 그려줘요",
      ],
      correctIndex: 1,
      explanation:
        "인공지능은 수많은 화가의 그림을 공부해서 결과물을 만들어요. 이 과정에서 원래 그린 사람의 노력을 무시하고 허락 없이 스타일을 흉내 낼 수 있어 조심해야 해요.",
      hint: "AI가 그림을 만들 때 다른 화가들의 작품을 어떻게 배우는지 생각해 보세요! ✏️",
    },
    badgeEmoji: "🎨",
    position: { x: 14, y: 48 },
    bgColor: "bg-coral",
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
        "학교 숙제를 인공지능이 대신 다 해주고 선생님께 비밀로 해줘요",
        "내가 영상을 보는 동안 가족들이 TV를 못 보게 화면을 독점해줘요",
        "내가 좋아할 만한 영상을 알아서 찾아줘서 편리해요",
      ],
      correctIndex: 2,
      explanation:
        "인공지능이 나의 취향을 분석해 맞춤형 영상을 골라주기 때문에, 수많은 정보 중에서 나에게 필요한 즐거움을 빠르게 찾을 수 있도록 도와줍니다.",
      hint: "AI가 나의 '취향'을 파악해서 어떤 도움을 줄 수 있을지 생각해 보세요! 📺",
    },
    badQuiz: {
      question: "콘텐츠 추천 AI의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "내가 좋아하는 것만 계속 보게 되어, 생각이 한쪽으로 치우치거나 좁아질 수 있어요",
        "인공지능이 내가 한 번 본 영상은 다시는 볼 수 없게 마음대로 삭제해버려요",
        "영상 추천 기능 때문에 인터넷 속도가 너무 느려져서 컴퓨터를 사용할 수 없게 돼요",
      ],
      correctIndex: 0,
      explanation:
        "인공지능은 우리가 좋아하는 것만 계속 보여주기 때문에, 다른 사람의 다양한 생각을 만날 기회를 방해해요. 마치 음식만 편식하듯 '생각의 편식'을 하게 될 수 있어요.",
      hint: "좋아하는 것만 계속 보면 어떤 문제가 생길까요? '편식'을 떠올려 보세요! 🤔",
    },
    badgeEmoji: "📺",
    position: { x: 10, y: 78 },
    bgColor: "bg-peach",
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
        "친구가 하는 말이 참말인지 거짓말인지 판별해줘요",
        "말이 통하지 않는 외국인 친구와도 즐겁게 대화하고 친구가 될 수 있어요",
        "내 목소리를 내가 원하는 연예인 목소리로 바꿔서 들려줘요",
      ],
      correctIndex: 1,
      explanation:
        "다른 나라 말을 우리말로, 우리 말을 외국어로 즉시 바꿔주어 언어의 벽을 넘어 전 세계 친구들과 마음을 나눌 수 있게 해줘요.",
      hint: "번역 AI의 가장 기본적인 역할이 무엇인지 생각해 보세요! 🌍",
    },
    badQuiz: {
      question: "실시간 번역 AI의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "번역기가 내 말을 가끔 엉뚱한 로봇 목소리로 바꿔서 말해요",
        "번역기를 사용하면 배터리가 너무 빨리 닳아서 연락이 끊겨요",
        "번역기만 너무 믿으면 내가 직접 외국어를 배우는 노력을 안 하게 돼요",
      ],
      correctIndex: 2,
      explanation:
        "기계에만 의존하다 보면 스스로 새로운 언어를 배우고 익히는 즐거움을 잊어버리고, 기계가 없으면 대화조차 할 수 없게 될 수 있어요.",
      hint: "편리한 기계에 너무 의존하면 우리가 잃을 수 있는 것이 무엇일까요? 📚",
    },
    badgeEmoji: "🌍",
    position: { x: 30, y: 42 },
    bgColor: "bg-mint",
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
        "내일 학교 시험에 나올 문제를 미리 알아내서 알려줘요",
        "내가 모르는 부분을 친절하고 자세하게 설명해 줘서 공부를 도와줘요",
        "내가 하기 싫은 숙제를 나 대신 완벽하게 끝내줘요",
      ],
      correctIndex: 1,
      explanation:
        "선생님이 곁에 없어도 궁금한 것을 물어보면 밤낮 상관없이 언제든 친절하게 가르쳐주어 부족한 공부를 스스로 채울 수 있게 도와줘요.",
      hint: "AI 튜터가 '선생님'처럼 어떤 도움을 줄 수 있을지 생각해 보세요! 👩‍🏫",
    },
    badQuiz: {
      question: "인공지능 튜터의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "인공지능이 너무 어려운 문제만 내서 공부를 포기하게 만들어요",
        "공부를 많이 시키려고 인공지능이 내 게임 시간을 강제로 줄여요",
        "스스로 생각하지 않고 AI가 주는 정답만 베끼는 습관이 생길 수 있어요",
      ],
      correctIndex: 2,
      explanation:
        "문제를 해결하는 과정은 생각하지 않고 인공지능이 주는 답만 받아 적다 보면, 정작 우리 스스로 문제를 풀 수 있는 능력은 점점 사라지게 돼요.",
      hint: "AI가 답을 다 알려주면, 우리의 '생각하는 힘'은 어떻게 될까요? 🧠",
    },
    badgeEmoji: "📚",
    position: { x: 50, y: 38 },
    bgColor: "bg-lavender",
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
        "내가 먹기 싫어하는 반찬을 친구 식판으로 몰래 옮겨줘요",
        "편식을 해도 키가 쑥쑥 크도록 음식을 마법처럼 바꿔줘요",
        "내가 먹은 영양소를 분석해 내 건강에 딱 맞는 식단을 추천해 줘요",
      ],
      correctIndex: 2,
      explanation:
        "식판 사진을 찍어 내가 어떤 영양소를 얼마나 먹었는지 확인하고, 부족한 영양소를 채울 수 있는 건강한 음식을 골라줘서 튼튼하게 자라도록 도와줘요.",
      hint: "AI가 음식 사진을 분석해서 우리 '건강'에 어떤 도움을 줄 수 있을까요? 🥗",
    },
    badQuiz: {
      question: "푸드 스캐너 AI의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "식판 사진을 찍을 때 나의 얼굴이나 식습관 같은 개인정보가 유출될 수 있어요",
        "음식을 남기면 인공지능이 경고음을 크게 울려 망신을 줘요",
        "인공지능이 분석한 식단대로 안 먹으면 다음 날 급식을 못 먹게 해요",
      ],
      correctIndex: 0,
      explanation:
        "사진 데이터가 처리되는 과정에서 내 소중한 정보가 다른 곳으로 빠져나갈 수 있고, 내가 무엇을 먹는지 누군가 훔쳐볼 수도 있어 조심해야 해요.",
      hint: "사진을 찍을 때 나의 어떤 '정보'가 함께 담길 수 있을지 생각해 보세요! 📸",
    },
    badgeEmoji: "🍽️",
    position: { x: 86, y: 48 },
    bgColor: "bg-sunshine",
  },
  {
    id: "gym",
    name: "체육관",
    icon: Trophy,
    aiType: "AI 심판",
    aiDescription: "공정한 판정을 도와주는 AI예요!",
    goodQuiz: {
      question: "AI 심판의 좋은 점은 무엇일까요? 😊",
      options: [
        "우리 팀이 점수 차이가 많이 날 때만 반칙을 선언해서 이기게 도와줘요",
        "사람의 눈으로 놓치기 쉬운 아주 작은 반칙도 정확하게 찾아내 공정해요",
        "경기가 시작되기도 전에 미리 어떤 팀이 이길지 분석해서 알려줘요",
      ],
      correctIndex: 1,
      explanation:
        "인공지능은 감정에 치우치지 않고 아주 빠른 움직임도 정확히 잡아내기 때문에, 억울한 판정 없이 누구나 인정할 수 있는 깨끗한 경기를 만들어줘요.",
      hint: "AI 심판이 사람 심판보다 더 잘할 수 있는 것은 무엇일까요? '공정함'을 생각해 보세요! ⚖️",
    },
    badQuiz: {
      question: "AI 심판의 위험한 점은 무엇일까요? ⚠️",
      options: [
        "인공지능이 잘못된 판정을 내렸을 때, 그 결과에 대해 누가 책임을 지고 문제를 바로잡아야 할지 결정하기 어려워요",
        "인공지능이 판정을 틀리면 사람이 대신 감옥에 가야 하기 때문에 무척 위험해요",
        "인공지능의 판단은 컴퓨터의 복잡한 계산이므로 우리가 틀렸다고 생각하더라도 무조건 믿고 따라야만 해요",
      ],
      correctIndex: 0,
      explanation:
        "인공지능도 기계적인 오류나 프로그램의 실수로 잘못된 판단을 할 수 있어요. 하지만 인공지능은 스스로 책임을 질 수 있는 사람이 아니기 때문에, 판정이 틀렸을 때 누가 사과를 하고 결과를 고쳐야 하는지 책임의 대상이 확실하지 않다는 문제가 있어요.",
      hint: "AI가 실수를 했을 때, 사람처럼 '책임'을 질 수 있을까요? 🤖",
    },
    badgeEmoji: "⚽",
    position: { x: 85, y: 80 },
    bgColor: "bg-sky",
  },
];

export const finalQuizQuestions = [
  {
    question: "인공지능은 우리가 모르는 어려운 문제를 친절하게 설명해 주는 똑똑한 공부 도우미가 될 수 있어요.",
    answer: true,
    explanation: "인공지능은 복잡한 내용을 이해하기 쉽게 풀어서 설명해 주어 우리의 학습을 도와주는 이로운 점이 있어요.",
  },
  {
    question:
      "인공지능이 만든 그림이나 글은 다른 사람이 정성껏 만든 작품을 허락 없이 따라 해서 창작자의 저작권을 침해할 위험이 있어요.",
    answer: true,
    explanation:
      "인공지능은 많은 데이터를 공부하며 만들어지는데, 이 과정에서 원래 만든 사람의 권리(저작권)를 지키지 못하는 경우가 생길 수 있어 주의해야 해요.",
  },
  {
    question:
      "인공지능은 우리 삶을 편리하게 해주는 '이로운 점'과 조심해서 사용해야 할 '위험한 점'이라는 두 얼굴을 동시에 가지고 있어요.",
    answer: true,
    explanation:
      "인공지능의 좋은 점만 믿기보다는, 해로운 점은 없는지 항상 두 가지 면을 함께 생각하며 올바르게 사용하는 태도가 필요해요.",
  },
  {
    question: "인공지능이 알려주는 정보는 언제나 100% 정답이기 때문에 우리가 맞는지 다시 확인할 필요는 없어요.",
    answer: false,
    explanation:
      "인공지능도 가끔 잘못된 정보를 진짜처럼 말할 때가 있어요. 인공지능의 대답이 정말 사실인지 우리가 스스로 꼭 확인해 봐야 해요.",
  },
  {
    question:
      "인공지능 서비스를 이용할 때 나의 얼굴 사진이나 이름 같은 소중한 개인정보를 함부로 알려주지 않도록 조심해야 해요.",
    answer: true,
    explanation:
      "나의 정보가 나쁜 일에 이용되지 않도록, 인공지능을 사용할 때도 내 정보를 스스로 지키는 습관이 중요해요.",
  },
];
