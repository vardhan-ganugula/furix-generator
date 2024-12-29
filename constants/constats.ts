import {
  MegaphoneIcon,
  Pen,
  NotebookPen,
  Lightbulb,
  WandSparklesIcon,
  AtSign,
  Activity,
  Megaphone,
} from "lucide-react";
import { Topic } from "@/types/customTypes";
export const categories = [
  "all",
  "social media",
  "writing",
  "plan",
  "case studies",
];

export let populateCategories = [
  {
    title: "Social Media",
    description: "Perfect for creators looking to shine online. 🚀✨",
    color: "#7f48fb",
    icon: MegaphoneIcon,
  },
  {
    title: "Writing",
    description: "Create content that resonates with your audience. 📝",
    color: "#fb4848",
    icon: Pen,
  },
  {
    title: "Case Studies",
    description: "Learn from real-world examples and success stories.",
    color: "#4881fb",
    icon: NotebookPen,
  },
];

export const allTopics: Array<Topic> = [
  {
    title: "Case Study for Marketing",
    url: "/ai/case-study-marketing",
    icon: Megaphone,
    description: "Generate an effective marketing case study using AI.",
    category: ["writing", "case studies"],
  },
  {
    title: "Social Media Calendar",
    url: "/ai/social-media-calendar",
    icon: WandSparklesIcon,
    description: "Create 7-day engaging content schedule with the power of AI.",
    category: ["social media", "plan"],
  },
  {
    title: "Personalized Quotes",
    url: "/ai/personalized-motivational-quotes",
    icon: Activity,
    description: "Generate personalized motivational quotes using AI.",
    category: ["social media", "writing"],
  },
  {
    title: "Creative Story Generation",
    url: "/ai/content-story-generation",
    icon: Lightbulb,
    description:
      "Inspire audience with uplifting stories of overcoming challenges and finding breakthroughs.",
    category: ["writing"],
  },
  {
    title: "Blogger Outreach Email",
    url: "/ai/blogger-outreach-email",
    icon: AtSign,
    description:
      "Generate effective Professional email for collaboration using AI.",
    category: ["social media", "writing"],
  },
  {
    title: "Content Plan Monthly",
    description:
      "Plan a 30-day blog content strategy with trending topics, SEO insights, and detailed outlines.",
    icon: NotebookPen,
    category: ["social media", "plan"],
    url: "/ai/content-plan-monthly",
  },
];
