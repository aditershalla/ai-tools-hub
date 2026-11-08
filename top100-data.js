// Curated worldwide AI discovery list, assembled November 2026.
// Ranks are editorial positions, NOT verified traffic, revenue or user rankings.
// Maintain the URLs and descriptions before calling this a live ranking.
const top100Tools = [
  {
    "name": "ChatGPT",
    "category": "Chatbots",
    "url": "https://chatgpt.com/",
    "description": "General-purpose AI assistant for writing, analysis and ideas."
  },
  {
    "name": "Gemini",
    "category": "Chatbots",
    "url": "https://gemini.google.com/",
    "description": "Google AI assistant for tasks, learning and creative work."
  },
  {
    "name": "Claude",
    "category": "Chatbots",
    "url": "https://claude.ai/",
    "description": "AI assistant for writing, reasoning and document work."
  },
  {
    "name": "Microsoft Copilot",
    "category": "Chatbots",
    "url": "https://copilot.microsoft.com/",
    "description": "AI assistance across search and Microsoft workflows."
  },
  {
    "name": "Perplexity",
    "category": "Research",
    "url": "https://www.perplexity.ai/",
    "description": "Answer-focused AI search with source links."
  },
  {
    "name": "DeepSeek",
    "category": "Chatbots",
    "url": "https://chat.deepseek.com/",
    "description": "AI chatbot for reasoning, coding and research."
  },
  {
    "name": "Grok",
    "category": "Chatbots",
    "url": "https://grok.com/",
    "description": "xAI assistant for questions and exploration."
  },
  {
    "name": "Meta AI",
    "category": "Chatbots",
    "url": "https://www.meta.ai/",
    "description": "Meta’s AI assistant for everyday questions and creation."
  },
  {
    "name": "Qwen",
    "category": "Chatbots",
    "url": "https://chat.qwen.ai/",
    "description": "Multilingual AI chat and task assistant."
  },
  {
    "name": "Character.AI",
    "category": "Chatbots",
    "url": "https://character.ai/",
    "description": "Conversational AI characters and roleplay experiences."
  },
  {
    "name": "NotebookLM",
    "category": "Research",
    "url": "https://notebooklm.google.com/",
    "description": "Study and summarize your uploaded source materials."
  },
  {
    "name": "Google AI Studio",
    "category": "Coding",
    "url": "https://aistudio.google.com/",
    "description": "Prototype apps and prompts with Google AI models."
  },
  {
    "name": "Hugging Face",
    "category": "Coding",
    "url": "https://huggingface.co/",
    "description": "Discover open models, datasets and AI applications."
  },
  {
    "name": "Poe",
    "category": "Chatbots",
    "url": "https://poe.com/",
    "description": "Explore multiple AI models and custom bots."
  },
  {
    "name": "Mistral Le Chat",
    "category": "Chatbots",
    "url": "https://chat.mistral.ai/",
    "description": "Mistral AI’s conversational assistant."
  },
  {
    "name": "Kimi",
    "category": "Chatbots",
    "url": "https://www.kimi.com/",
    "description": "Assistant for long-form research and document tasks."
  },
  {
    "name": "Genspark",
    "category": "Research",
    "url": "https://www.genspark.ai/",
    "description": "AI search, research and productivity workspace."
  },
  {
    "name": "Manus",
    "category": "Automation",
    "url": "https://manus.im/",
    "description": "Autonomous AI agent for multi-step tasks."
  },
  {
    "name": "You.com",
    "category": "Research",
    "url": "https://you.com/",
    "description": "AI-powered web research and answers."
  },
  {
    "name": "Duck.ai",
    "category": "Chatbots",
    "url": "https://duck.ai/",
    "description": "Private AI chat from DuckDuckGo."
  },
  {
    "name": "Midjourney",
    "category": "Images",
    "url": "https://www.midjourney.com/",
    "description": "AI image creation for distinctive visual styles."
  },
  {
    "name": "Canva",
    "category": "Design",
    "url": "https://www.canva.com/",
    "description": "Design graphics and presentations with AI features."
  },
  {
    "name": "Adobe Firefly",
    "category": "Images",
    "url": "https://firefly.adobe.com/",
    "description": "Generate and edit images using Adobe AI tools."
  },
  {
    "name": "Ideogram",
    "category": "Images",
    "url": "https://ideogram.ai/",
    "description": "Generate artwork and images with strong text handling."
  },
  {
    "name": "Leonardo AI",
    "category": "Images",
    "url": "https://leonardo.ai/",
    "description": "Generate illustrations, assets and creative visuals."
  },
  {
    "name": "Recraft",
    "category": "Design",
    "url": "https://www.recraft.ai/",
    "description": "AI graphics, vector designs and illustrations."
  },
  {
    "name": "Freepik",
    "category": "Images",
    "url": "https://www.freepik.com/",
    "description": "Visual assets and AI-powered design tools."
  },
  {
    "name": "Photoroom",
    "category": "Images",
    "url": "https://www.photoroom.com/",
    "description": "Create clean product photos and remove backgrounds."
  },
  {
    "name": "remove.bg",
    "category": "Images",
    "url": "https://www.remove.bg/",
    "description": "Remove photo backgrounds automatically."
  },
  {
    "name": "Playground",
    "category": "Design",
    "url": "https://playground.com/",
    "description": "Generate and customize visual designs."
  },
  {
    "name": "OpenArt",
    "category": "Images",
    "url": "https://openart.ai/",
    "description": "AI image generation and editing workflows."
  },
  {
    "name": "NightCafe",
    "category": "Images",
    "url": "https://creator.nightcafe.studio/",
    "description": "Make and share AI-generated artworks."
  },
  {
    "name": "Civitai",
    "category": "Images",
    "url": "https://civitai.com/",
    "description": "Discover and share generative image resources."
  },
  {
    "name": "Magnific",
    "category": "Images",
    "url": "https://magnific.ai/",
    "description": "AI-powered image upscaling and enhancement."
  },
  {
    "name": "Krea",
    "category": "Images",
    "url": "https://www.krea.ai/",
    "description": "AI image generation, enhancement and video."
  },
  {
    "name": "Runway",
    "category": "Video",
    "url": "https://runwayml.com/",
    "description": "Generative AI video and creative editing."
  },
  {
    "name": "Pika",
    "category": "Video",
    "url": "https://pika.art/",
    "description": "Turn prompts and images into short AI videos."
  },
  {
    "name": "Kling AI",
    "category": "Video",
    "url": "https://klingai.com/",
    "description": "Generate cinematic video from text and images."
  },
  {
    "name": "Luma AI",
    "category": "Video",
    "url": "https://lumalabs.ai/",
    "description": "AI tools for video and 3D content creation."
  },
  {
    "name": "HeyGen",
    "category": "Video",
    "url": "https://www.heygen.com/",
    "description": "Create AI avatar videos and translate speech."
  },
  {
    "name": "Synthesia",
    "category": "Video",
    "url": "https://www.synthesia.io/",
    "description": "AI presenter videos for business and training."
  },
  {
    "name": "InVideo AI",
    "category": "Video",
    "url": "https://invideo.io/",
    "description": "Create videos from ideas or scripts."
  },
  {
    "name": "CapCut",
    "category": "Video",
    "url": "https://www.capcut.com/",
    "description": "Video editing with AI-powered creative features."
  },
  {
    "name": "Descript",
    "category": "Video",
    "url": "https://www.descript.com/",
    "description": "Edit video and audio using a text transcript."
  },
  {
    "name": "VEED",
    "category": "Video",
    "url": "https://www.veed.io/",
    "description": "Online editor with subtitles and AI video tools."
  },
  {
    "name": "OpusClip",
    "category": "Video",
    "url": "https://www.opus.pro/",
    "description": "Turn long videos into short highlight clips."
  },
  {
    "name": "Fliki",
    "category": "Video",
    "url": "https://fliki.ai/",
    "description": "Convert written content into narrated videos."
  },
  {
    "name": "Kaiber",
    "category": "Video",
    "url": "https://kaiber.ai/",
    "description": "Create stylized AI animations and video."
  },
  {
    "name": "Higgsfield",
    "category": "Video",
    "url": "https://higgsfield.ai/",
    "description": "AI-generated videos with creative camera effects."
  },
  {
    "name": "Topaz Video",
    "category": "Video",
    "url": "https://www.topazlabs.com/",
    "description": "Enhance video and image detail with AI."
  },
  {
    "name": "ElevenLabs",
    "category": "Audio",
    "url": "https://elevenlabs.io/",
    "description": "Text-to-speech and AI voice generation."
  },
  {
    "name": "Suno",
    "category": "Audio",
    "url": "https://suno.com/",
    "description": "Generate songs from text prompts."
  },
  {
    "name": "Udio",
    "category": "Audio",
    "url": "https://www.udio.com/",
    "description": "Create AI-generated music from ideas."
  },
  {
    "name": "Speechify",
    "category": "Audio",
    "url": "https://speechify.com/",
    "description": "Listen to documents and web pages with AI voices."
  },
  {
    "name": "Murf",
    "category": "Audio",
    "url": "https://murf.ai/",
    "description": "Professional AI voiceovers and narration."
  },
  {
    "name": "Adobe Podcast",
    "category": "Audio",
    "url": "https://podcast.adobe.com/",
    "description": "Enhance voice recordings and spoken audio."
  },
  {
    "name": "Auphonic",
    "category": "Audio",
    "url": "https://auphonic.com/",
    "description": "Automatic audio leveling and cleanup."
  },
  {
    "name": "Moises",
    "category": "Audio",
    "url": "https://moises.ai/",
    "description": "Split and practice music tracks using AI."
  },
  {
    "name": "Krisp",
    "category": "Audio",
    "url": "https://krisp.ai/",
    "description": "Remove background noise from online meetings."
  },
  {
    "name": "Otter.ai",
    "category": "Productivity",
    "url": "https://otter.ai/",
    "description": "Meeting transcription and AI notes."
  },
  {
    "name": "Fireflies.ai",
    "category": "Productivity",
    "url": "https://fireflies.ai/",
    "description": "Record, transcribe and summarize meetings."
  },
  {
    "name": "Cursor",
    "category": "Coding",
    "url": "https://cursor.com/",
    "description": "AI code editor for programming projects."
  },
  {
    "name": "GitHub Copilot",
    "category": "Coding",
    "url": "https://github.com/features/copilot",
    "description": "AI pair programmer in developer tools."
  },
  {
    "name": "Replit",
    "category": "Coding",
    "url": "https://replit.com/",
    "description": "Build and deploy apps with AI assistance."
  },
  {
    "name": "Windsurf",
    "category": "Coding",
    "url": "https://windsurf.com/",
    "description": "AI-powered editor and coding environment."
  },
  {
    "name": "Lovable",
    "category": "Website",
    "url": "https://lovable.dev/",
    "description": "Build websites and web apps from prompts."
  },
  {
    "name": "Bolt.new",
    "category": "Website",
    "url": "https://bolt.new/",
    "description": "Generate and edit full-stack web applications."
  },
  {
    "name": "v0",
    "category": "Website",
    "url": "https://v0.app/",
    "description": "Create interfaces and apps with AI assistance."
  },
  {
    "name": "Tabnine",
    "category": "Coding",
    "url": "https://www.tabnine.com/",
    "description": "AI code completion for development teams."
  },
  {
    "name": "Sourcegraph Cody",
    "category": "Coding",
    "url": "https://sourcegraph.com/cody",
    "description": "Codebase-aware AI programming assistant."
  },
  {
    "name": "Continue",
    "category": "Coding",
    "url": "https://www.continue.dev/",
    "description": "Open-source AI coding assistant."
  },
  {
    "name": "Zed",
    "category": "Coding",
    "url": "https://zed.dev/",
    "description": "Fast code editor with AI integrations."
  },
  {
    "name": "JetBrains AI",
    "category": "Coding",
    "url": "https://www.jetbrains.com/ai/",
    "description": "AI coding support across JetBrains IDEs."
  },
  {
    "name": "Claude Code",
    "category": "Coding",
    "url": "https://www.anthropic.com/claude-code",
    "description": "Agentic AI coding companion."
  },
  {
    "name": "Notion AI",
    "category": "Productivity",
    "url": "https://www.notion.com/product/ai",
    "description": "AI writing and knowledge work in Notion."
  },
  {
    "name": "Grammarly",
    "category": "Writing",
    "url": "https://www.grammarly.com/",
    "description": "Writing improvements and AI-powered communication."
  },
  {
    "name": "QuillBot",
    "category": "Writing",
    "url": "https://quillbot.com/",
    "description": "Paraphrase, summarize and improve text."
  },
  {
    "name": "Jasper",
    "category": "Marketing",
    "url": "https://www.jasper.ai/",
    "description": "AI content tools for marketing teams."
  },
  {
    "name": "Copy.ai",
    "category": "Marketing",
    "url": "https://www.copy.ai/",
    "description": "Marketing content and automated workflows."
  },
  {
    "name": "Writesonic",
    "category": "Writing",
    "url": "https://writesonic.com/",
    "description": "Write and optimize AI-assisted content."
  },
  {
    "name": "Wordtune",
    "category": "Writing",
    "url": "https://www.wordtune.com/",
    "description": "Rewrite sentences and polish tone."
  },
  {
    "name": "Rytr",
    "category": "Writing",
    "url": "https://rytr.me/",
    "description": "Quick AI copy for everyday writing."
  },
  {
    "name": "Sudowrite",
    "category": "Writing",
    "url": "https://www.sudowrite.com/",
    "description": "Creative writing assistant for fiction."
  },
  {
    "name": "DeepL",
    "category": "Translation",
    "url": "https://www.deepl.com/",
    "description": "AI-powered translation and writing help."
  },
  {
    "name": "Gamma",
    "category": "Presentations",
    "url": "https://gamma.app/",
    "description": "Generate slide decks and visual documents."
  },
  {
    "name": "Beautiful.ai",
    "category": "Presentations",
    "url": "https://www.beautiful.ai/",
    "description": "Design professional AI-assisted presentations."
  },
  {
    "name": "Pitch",
    "category": "Presentations",
    "url": "https://pitch.com/",
    "description": "Collaborative presentation design with AI features."
  },
  {
    "name": "SlidesAI",
    "category": "Presentations",
    "url": "https://www.slidesai.io/",
    "description": "Create slide decks from written text."
  },
  {
    "name": "Napkin AI",
    "category": "Presentations",
    "url": "https://www.napkin.ai/",
    "description": "Turn words into diagrams and visuals."
  },
  {
    "name": "Elicit",
    "category": "Research",
    "url": "https://elicit.com/",
    "description": "Find and organize scientific research papers."
  },
  {
    "name": "Consensus",
    "category": "Research",
    "url": "https://consensus.app/",
    "description": "Search academic evidence with AI."
  },
  {
    "name": "Scite",
    "category": "Research",
    "url": "https://scite.ai/",
    "description": "Evaluate research citations and context."
  },
  {
    "name": "SciSpace",
    "category": "Research",
    "url": "https://scispace.com/",
    "description": "Understand research papers using AI."
  },
  {
    "name": "ResearchRabbit",
    "category": "Research",
    "url": "https://www.researchrabbit.ai/",
    "description": "Discover connected academic literature."
  },
  {
    "name": "Jenni AI",
    "category": "Writing",
    "url": "https://jenni.ai/",
    "description": "Research and academic writing assistance."
  },
  {
    "name": "Humata",
    "category": "Research",
    "url": "https://www.humata.ai/",
    "description": "Ask questions about your PDF documents."
  },
  {
    "name": "Zapier AI",
    "category": "Automation",
    "url": "https://zapier.com/ai",
    "description": "Build AI-enhanced automation workflows."
  },
  {
    "name": "n8n",
    "category": "Automation",
    "url": "https://n8n.io/",
    "description": "Automate processes with flexible AI workflows."
  },
  {
    "name": "Bardeen",
    "category": "Automation",
    "url": "https://www.bardeen.ai/",
    "description": "Automate repetitive browser and work tasks."
  },
  {
    "name": "Durable",
    "category": "Website",
    "url": "https://durable.co/",
    "description": "AI website builder for small businesses."
  }
];
