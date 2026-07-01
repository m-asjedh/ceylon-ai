export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

export interface Chat {
  id: string;
  title: string;
  updatedAt: string;
}

export const MOCK_CHATS: Chat[] = [
  {
    id: "1",
    title: "Trip planning in Kandy",
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    title: "Sinhala translation help",
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Tea export market research",
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      role: "user",
      content: "What are the best places to visit in Kandy?",
    },
    {
      id: "m2",
      role: "assistant",
      content:
        "Kandy is home to the Temple of the Sacred Tooth Relic, the Royal Botanical Gardens in Peradeniya, and the scenic Kandy Lake. For a quieter experience, visit the Bahirawakanda Vihara Buddha statue for panoramic views of the city.",
    },
  ],
  "2": [
    {
      id: "m3",
      role: "user",
      content: 'How do I say "good morning" in Sinhala?',
    },
    {
      id: "m4",
      role: "assistant",
      content:
        'You can say "Suba udesanak" (සුබ උදෑසනක්) for good morning. A simpler everyday greeting is "Ayubowan" (ආයුබෝවන්), which means "may you live long" and works any time of day.',
    },
  ],
  "3": [
    {
      id: "m5",
      role: "user",
      content: "Give me an overview of Ceylon tea export trends.",
    },
    {
      id: "m6",
      role: "assistant",
      content:
        "Sri Lanka remains one of the world's top tea exporters. Key markets include Russia, Iran, Turkey, and the UAE. Premium single-estate and organic Ceylon teas are growing segments, especially in EU and North American specialty markets.",
    },
  ],
};

export const SUGGESTED_PROMPTS = [
  "Plan a weekend trip to Ella",
  "Explain quantum computing simply",
  "Write a business email in Sinhala",
  "Best local foods to try in Colombo",
];

export const MOCK_REPLY =
  "This is a placeholder response from Ceylon AI. Connect the backend API for real replies.";
