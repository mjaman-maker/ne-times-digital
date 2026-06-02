import politicsImg from "@/assets/news-politics.jpg";
import northeastImg from "@/assets/news-northeast.jpg";
import educationImg from "@/assets/news-education.jpg";
import cultureImg from "@/assets/news-culture.jpg";
import sportsImg from "@/assets/news-sports.jpg";
import cityImg from "@/assets/news-city.jpg";
import heroImg from "@/assets/hero-assam.jpg";

export type Story = {
  tag: string;
  title: string;
  time: string;
  img: string;
  excerpt?: string;
  slug?: string;
  content?: string;
};

export const allStories: Story[] = [
  {
    tag: "Top Story",
    title: "Cabinet clears 12 new highway projects across Northeast worth ₹18,000 cr",
    time: "26m",
    img: politicsImg,
    excerpt: "Connectivity push targets Arunachal and Manipur border districts in next 18 months.",
    slug: "cabinet-clears-12-new-highway-projects",
    content: "The Union Cabinet has approved a massive infrastructure push for the Northeast..."
  },
  {
    tag: "Investigation",
    title: "Inside the Majuli erosion crisis: a river that takes a village every year",
    time: "1h",
    img: northeastImg,
    excerpt: "Satellite data shows 33% land loss in two decades.",
    slug: "inside-the-majuli-erosion-crisis",
    content: "A detailed investigation into the shrinking landmass of Majuli island..."
  },
  {
    tag: "Education",
    title: "Assam announces free coaching for 50,000 students aiming JEE & NEET",
    time: "2h",
    img: educationImg,
    excerpt: "Programme to begin from January in district headquarters.",
    slug: "assam-announces-free-coaching",
    content: "In a major boost to medical and engineering aspirants..."
  },
  {
    tag: "Ground Report",
    title: "Why Upper Assam's tea workers haven't received their festival bonus",
    time: "3h",
    img: heroImg,
    excerpt: "Six-month NE Time Digital investigation.",
    slug: "why-upper-assams-tea-workers-havent-received-bonus",
    content: "Thousands of tea garden workers in Upper Assam are facing a bleak festival season..."
  },
  {
    tag: "Assam",
    title: "Guwahati Metro: tender for elevated corridor to be opened next week",
    time: "20m",
    img: cityImg,
    slug: "guwahati-metro-tender",
    content: "The long-awaited Guwahati Metro project is finally seeing some movement..."
  },
  {
    tag: "Assam",
    title: "Bihu Mahotsav 2026: lineup includes Zubeen, Papon, Joi Barua",
    time: "55m",
    img: cultureImg,
    slug: "bihu-mahotsav-2026",
    content: "The cultural extravaganza of the year has announced its star-studded lineup..."
  },
  {
    tag: "Assam",
    title: "HSLC 2026 exam schedule released; practicals from Feb 5",
    time: "2h",
    img: educationImg,
    slug: "hslc-2026-exam-schedule",
    content: "SEBA has officially released the exam dates for the upcoming High School Leaving Certificate exams..."
  },
  {
    tag: "Assam",
    title: "Kaziranga adds 6 new one-horned rhinos in latest census",
    time: "4h",
    img: northeastImg,
    slug: "kaziranga-adds-6-new-rhinos",
    content: "Good news for conservationists as the latest rhino census in Kaziranga National Park shows an increase..."
  },
  {
    tag: "Manipur",
    title: "Centre forms 9-member peace committee; talks resume Monday",
    time: "32m",
    img: politicsImg,
    slug: "centre-forms-peace-committee",
    content: "In a bid to restore normalcy, the central government has constituted a new peace committee..."
  },
  {
    tag: "Mizoram",
    title: "Aizawl students protest fuel price hike — third day in row",
    time: "1h",
    img: cityImg,
    slug: "aizawl-students-protest-fuel-price",
    content: "Student bodies in Mizoram have intensified their protests against the recent hike in petrol and diesel prices..."
  },
  {
    tag: "Meghalaya",
    title: "Shillong winter festival to open with 80-band lineup",
    time: "3h",
    img: cultureImg,
    slug: "shillong-winter-festival",
    content: "The much-anticipated Shillong Winter Festival is set to be the biggest yet..."
  },
  {
    tag: "Arunachal",
    title: "New trans-border highway connects Tawang to Tezpur in 6 hours",
    time: "5h",
    img: northeastImg,
    slug: "new-trans-border-highway-tawang",
    content: "A major milestone in border infrastructure has been achieved with the opening of the new highway..."
  },
  {
    tag: "India",
    title: "Parliament winter session: 14 bills listed, opposition demands debate on inflation",
    time: "18m",
    img: politicsImg,
    slug: "parliament-winter-session-14-bills",
    content: "The winter session of Parliament began today with a stormy start..."
  },
  {
    tag: "India",
    title: "RBI holds repo rate at 6.25%; signals long pause",
    time: "1h",
    img: cityImg,
    slug: "rbi-holds-repo-rate",
    content: "The Reserve Bank of India has decided to keep the repo rate unchanged..."
  },
  {
    tag: "Sports",
    title: "India beat Australia in series decider; Northeast pacer takes 5",
    time: "2h",
    img: sportsImg,
    slug: "india-beat-australia-series-decider",
    content: "A thrilling finish to the series saw India emerge victorious against Australia..."
  },
  {
    tag: "India",
    title: "Supreme Court reserves verdict on electoral bond review",
    time: "4h",
    img: politicsImg,
    slug: "supreme-court-reserves-verdict-electoral-bond",
    content: "The Supreme Court constitution bench has concluded hearings and reserved its verdict..."
  },
  {
    tag: "Politics",
    title: "New Delhi summit: Northeast CMs push for infrastructure parity",
    time: "12m",
    img: politicsImg,
    slug: "new-delhi-summit-northeast-cms-push",
    content: "Chief Ministers from the Northeast gathered in New Delhi today..."
  },
  {
    tag: "Northeast",
    title: "Brahmaputra erosion displaces 4,000 in Majuli — relief delayed",
    time: "38m",
    img: northeastImg,
    slug: "brahmaputra-erosion-displaces-4000",
    content: "Continuing erosion by the Brahmaputra river has caused massive displacement..."
  },
  {
    tag: "Education",
    title: "Assam to introduce coding curriculum from Class 6 next session",
    time: "1h",
    img: educationImg,
    slug: "assam-coding-curriculum-class-6",
    content: "In a major educational reform, the state government announced coding classes..."
  }
];

export const topStories = allStories.slice(0, 4);
export const assamStories = allStories.filter(s => s.tag === "Assam").slice(0, 4);
export const northeastStories = allStories.filter(s => ["Manipur", "Mizoram", "Meghalaya", "Arunachal"].includes(s.tag)).slice(0, 4);
export const indiaStories = allStories.filter(s => ["India", "Sports"].includes(s.tag)).slice(0, 4);
