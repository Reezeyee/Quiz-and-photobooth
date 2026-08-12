// Quiz Questions Dataset & Flower Reveal Pool

export const questions = [
  {
    id: 1,
    question: "Where did we first meet? 👀",
    answers: ["Facebook", "Instagram", "TikTok", "Other"],
    correctAnswer: "Facebook",
    reactionMessage: "Aww, back where our awesome story started! ✨",
    petReaction: "happyCat",
    themeColor: "mint"
  },
  {
    id: 2,
    question: "What was one of the first things you noticed about me? 👀",
    answers: ["My personality", "My sense of humor", "My messages", "My appearance", "Something else"],
    correctAnswer: "My personality",
    reactionMessage: "You noticed the real me right away! 💖",
    petReaction: "happyDog",
    themeColor: "lavender"
  },
  {
    id: 3,
    question: "Who is more likely to send a random message at 2 AM? 🌙",
    answers: ["Me", "You", "Both of us", "Neither of us 😂"],
    correctAnswer: "Both of us",
    reactionMessage: "2 AM random late-night thoughts are the best! 🌙✨",
    petReaction: "happyCat",
    themeColor: "babyBlue"
  },
  {
    id: 4,
    question: "What do you think we have the most fun doing together? ✨",
    answers: ["Talking", "Playing games", "Sharing random things", "Going somewhere", "Everything 😂"],
    correctAnswer: "Everything 😂",
    reactionMessage: "Honestly, anything we do together becomes super fun!",
    petReaction: "happyDog",
    themeColor: "peach"
  },
  {
    id: 5,
    question: "Who is more chaotic? 😂",
    answers: ["Me", "You", "Both of us", "Depends on the day"],
    correctAnswer: "Both of us",
    reactionMessage: "Double the chaos, double the fun! 🤪✨",
    petReaction: "happyCat",
    themeColor: "softYellow"
  },
  {
    id: 6,
    question: "What kind of place would we probably enjoy going to together? 🌸",
    answers: ["Café", "Beach", "Park", "Somewhere completely random", "Anywhere as long as we're together"],
    correctAnswer: "Anywhere as long as we're together",
    reactionMessage: "The destination doesn't matter, it's about the company! 🌸",
    petReaction: "happyDog",
    themeColor: "mint"
  },
  {
    id: 7,
    question: "What animal fits our vibe best? 🐱🐶",
    answers: ["Cats", "Dogs", "Bunnies", "Capybaras", "A completely random animal 😂"],
    correctAnswer: "Cats",
    reactionMessage: "Cozy, playful, chaotic, and adorable! 🐱🐶🐰🦫",
    petReaction: "happyCat",
    themeColor: "lavender"
  },
  {
    id: 8,
    question: "What do you think makes our bond special? 💗",
    answers: ["The random conversations", "The jokes", "The memories", "Being comfortable around each other", "All of the above"],
    correctAnswer: "All of the above",
    reactionMessage: "Every single detail makes everything truly one of a kind! 💕",
    petReaction: "happyDog",
    themeColor: "pink"
  }
];

// Pool of Random Flower Reveal Results
export const flowerResultsList = [
  {
    id: 'sakura',
    name: "Soft Sakura Cherry Blossom",
    emoji: "🌸✨",
    color: "#FFB7C5",
    centerColor: "#FFF5BA",
    tagline: "Gentle, Sweet & Full of Wonder!",
    description: "Like cherry blossoms dancing in a soft spring breeze, you bring sweetness, grace, and pure magic to every moment!",
    meaning: "A symbol of cherished memories, shared laughter, and blooming happiness."
  },
  {
    id: 'sunflower',
    name: "Radiant Sunlit Sunflower",
    emoji: "🌻💛",
    color: "#FFD700",
    centerColor: "#8B4513",
    tagline: "Bright, Cheerful & Always Glowing!",
    description: "Just like a sunflower reaching for the golden sun, your energy brings positivity, warmth, and smiles everywhere you go!",
    meaning: "A symbol of vibrant joy, positivity, and uplifting companionship."
  },
  {
    id: 'lavender',
    name: "Enchanted Lavender Field",
    emoji: "🪻💜",
    color: "#A29BFE",
    centerColor: "#FFF5BA",
    tagline: "Calming, Cozy & Deeply Special!",
    description: "Comforting and soothing like a field of blooming lavender, you make every conversation feel peaceful and unforgettable.",
    meaning: "A symbol of cozy warmth, deep understanding, and sweet peace."
  },
  {
    id: 'tulip',
    name: "Romantic Pink Tulip",
    emoji: "🌷💖",
    color: "#FF7B9C",
    centerColor: "#FFF5BA",
    tagline: "Charming, Playful & Full of Joy!",
    description: "Fresh and vibrant like a spring tulip blooming in the sun, you fill every single day with excitement and happiness!",
    meaning: "A symbol of genuine affection, bright laughs, and sweet moments."
  },
  {
    id: 'daisy',
    name: "Golden Daisy Bouquet",
    emoji: "🌼✨",
    color: "#FFF5BA",
    centerColor: "#FFB7C5",
    tagline: "Joyful, Loyal & Eternally Cute!",
    description: "Pure and happy like golden daisies in a sunny meadow, you make even the simplest moments shine brightly!",
    meaning: "A symbol of innocent fun, bright smiles, and cheerful memories."
  },
  {
    id: 'rose',
    name: "Pastel Velvet Rose",
    emoji: "🌹💗",
    color: "#FF5E85",
    centerColor: "#FFF5BA",
    tagline: "Elegant, Caring & Warm-Hearted!",
    description: "Classic and timeless, your warmth, kindness, and humor make every memory together feel extra special.",
    meaning: "A symbol of heartfelt bond, deep care, and eternal sweetness."
  }
];

export const getRandomFlowerResult = () => {
  const randomIndex = Math.floor(Math.random() * flowerResultsList.length);
  return flowerResultsList[randomIndex];
};

export const flowerResultData = flowerResultsList[0];
