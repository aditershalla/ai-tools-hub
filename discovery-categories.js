// Editorial cross-tags derived exclusively from the existing 100 directory entries.
// One tool may appear in several discovery groups. A zero count is intentional when
// the current directory lacks suitable entries; never invent categories or figures.
(function(global){
  'use strict';
  const groups = [
  {
    "slug": "chatbots-ai-assistants",
    "label": "Chatbots & AI Assistants",
    "icon": "✳",
    "categories": [
      "Chatbots"
    ],
    "names": [],
    "description": "Ask, reason and brainstorm"
  },
  {
    "slug": "image-generation",
    "label": "Image Generation",
    "icon": "✦",
    "categories": [
      "Images",
      "Design"
    ],
    "names": [],
    "description": "Create and edit visuals"
  },
  {
    "slug": "video-ai",
    "label": "Video AI",
    "icon": "▷",
    "categories": [
      "Video"
    ],
    "names": [],
    "description": "Generate and edit video"
  },
  {
    "slug": "code-dev-tools",
    "label": "Code & Dev Tools",
    "icon": "{ }",
    "categories": [
      "Coding",
      "Website"
    ],
    "names": [],
    "description": "Build software and websites"
  },
  {
    "slug": "voice-audio",
    "label": "Voice & Audio",
    "icon": "♫",
    "categories": [
      "Audio"
    ],
    "names": [
      "Descript",
      "Fliki",
      "Otter.ai",
      "Fireflies.ai"
    ],
    "description": "Speech, music and sound"
  },
  {
    "slug": "writing-content",
    "label": "Writing & Content",
    "icon": "Aa",
    "categories": [
      "Writing"
    ],
    "names": [
      "Jasper",
      "Copy.ai",
      "Notion AI",
      "DeepL"
    ],
    "description": "Draft and refine writing"
  },
  {
    "slug": "data-analytics",
    "label": "Data & Analytics",
    "icon": "▥",
    "categories": [],
    "names": [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Google AI Studio",
      "Hugging Face"
    ],
    "description": "Explore data and models"
  },
  {
    "slug": "marketing-ai",
    "label": "Marketing AI",
    "icon": "↗",
    "categories": [
      "Marketing"
    ],
    "names": [
      "Canva",
      "Photoroom",
      "OpusClip",
      "InVideo AI",
      "HeyGen"
    ],
    "description": "Campaigns and creative assets"
  },
  {
    "slug": "education-learning",
    "label": "Education & Learning",
    "icon": "◈",
    "categories": [],
    "names": [
      "NotebookLM",
      "Elicit",
      "Consensus",
      "Scite",
      "SciSpace",
      "ResearchRabbit",
      "Jenni AI",
      "Speechify",
      "QuillBot"
    ],
    "description": "Study and research"
  },
  {
    "slug": "ai-search-engines",
    "label": "AI Search Engines",
    "icon": "⌕",
    "categories": [],
    "names": [
      "Perplexity",
      "Genspark",
      "You.com",
      "Elicit",
      "Consensus",
      "Scite",
      "SciSpace"
    ],
    "description": "Find answers and sources"
  },
  {
    "slug": "health-wellness",
    "label": "Health & Wellness",
    "icon": "♡",
    "categories": [],
    "names": [],
    "description": "No dedicated picks yet"
  },
  {
    "slug": "business-productivity",
    "label": "Business & Productivity",
    "icon": "▦",
    "categories": [
      "Productivity",
      "Automation",
      "Presentations"
    ],
    "names": [
      "Microsoft Copilot",
      "Manus",
      "Durable",
      "Synthesia"
    ],
    "description": "Organize work and teams"
  }
];
  function matches(tool, group){
    return group.categories.includes(tool.category) || group.names.includes(tool.name);
  }
  global.AI_DISCOVERY_GROUPS=groups;
  global.aiDiscoveryMatches=matches;
})(window);
