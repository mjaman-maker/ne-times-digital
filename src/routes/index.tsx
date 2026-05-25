import { createFileRoute } from "@tanstack/react-router";
import { BreakingTicker } from "@/components/news/BreakingTicker";
import { Header } from "@/components/news/Header";
import { Hero } from "@/components/news/Hero";
import { SectionRow, type Story } from "@/components/news/SectionRow";
import { VideoStrip } from "@/components/news/VideoStrip";
import { Opinion } from "@/components/news/Opinion";
import { Footer } from "@/components/news/Footer";

import politicsImg from "@/assets/news-politics.jpg";
import northeastImg from "@/assets/news-northeast.jpg";
import educationImg from "@/assets/news-education.jpg";
import cultureImg from "@/assets/news-culture.jpg";
import sportsImg from "@/assets/news-sports.jpg";
import cityImg from "@/assets/news-city.jpg";
import heroImg from "@/assets/hero-assam.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NE Time Digital — The Modern Digital Voice of Northeast India" },
      { name: "description", content: "Fast, clean, mobile-first journalism from Assam and the Northeast. Breaking news, politics, education, video and ground reports." },
      { property: "og:title", content: "NE Time Digital" },
      { property: "og:description", content: "Breaking news and ground reports from Assam and Northeast India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const topStories: Story[] = [
  { tag: "Top Story", title: "Cabinet clears 12 new highway projects across Northeast worth ₹18,000 cr", time: "26m", img: politicsImg, excerpt: "Connectivity push targets Arunachal and Manipur border districts in next 18 months." },
  { tag: "Investigation", title: "Inside the Majuli erosion crisis: a river that takes a village every year", time: "1h", img: northeastImg, excerpt: "Satellite data shows 33% land loss in two decades." },
  { tag: "Education", title: "Assam announces free coaching for 50,000 students aiming JEE & NEET", time: "2h", img: educationImg, excerpt: "Programme to begin from January in district headquarters." },
  { tag: "Ground Report", title: "Why Upper Assam's tea workers haven't received their festival bonus", time: "3h", img: heroImg, excerpt: "Six-month NE Time Digital investigation." },
];

const assam: Story[] = [
  { tag: "Assam", title: "Guwahati Metro: tender for elevated corridor to be opened next week", time: "20m", img: cityImg },
  { tag: "Assam", title: "Bihu Mahotsav 2026: lineup includes Zubeen, Papon, Joi Barua", time: "55m", img: cultureImg },
  { tag: "Assam", title: "HSLC 2026 exam schedule released; practicals from Feb 5", time: "2h", img: educationImg },
  { tag: "Assam", title: "Kaziranga adds 6 new one-horned rhinos in latest census", time: "4h", img: northeastImg },
];

const northeast: Story[] = [
  { tag: "Manipur", title: "Centre forms 9-member peace committee; talks resume Monday", time: "32m", img: politicsImg },
  { tag: "Mizoram", title: "Aizawl students protest fuel price hike — third day in row", time: "1h", img: cityImg },
  { tag: "Meghalaya", title: "Shillong winter festival to open with 80-band lineup", time: "3h", img: cultureImg },
  { tag: "Arunachal", title: "New trans-border highway connects Tawang to Tezpur in 6 hours", time: "5h", img: northeastImg },
];

const india: Story[] = [
  { tag: "India", title: "Parliament winter session: 14 bills listed, opposition demands debate on inflation", time: "18m", img: politicsImg },
  { tag: "India", title: "RBI holds repo rate at 6.25%; signals long pause", time: "1h", img: cityImg },
  { tag: "Sports", title: "India beat Australia in series decider; Northeast pacer takes 5", time: "2h", img: sportsImg },
  { tag: "India", title: "Supreme Court reserves verdict on electoral bond review", time: "4h", img: politicsImg },
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BreakingTicker />
      <Header />
      <main className="flex-1">
        <Hero />
        <SectionRow id="top-stories" title="Top Stories" accent stories={topStories} />
        <SectionRow id="assam" title="Assam" stories={assam} />
        <SectionRow id="northeast" title="Northeast" stories={northeast} />
        <SectionRow id="india" title="India & Politics" stories={india} />
        <VideoStrip />
        <Opinion />
      </main>
      <Footer />
    </div>
  );
}
