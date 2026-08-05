import { Metadata } from "next";
import AboutContent from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the mission, values, and community impact of GDG Campus.",
};

export default function AboutPage() {
  return <AboutContent />;
}
