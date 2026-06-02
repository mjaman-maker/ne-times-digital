import { useEffect, useState } from "react";
import { Hero } from "@/components/news/Hero";
import { SectionRow } from "@/components/news/SectionRow";
import { VideoStrip } from "@/components/news/VideoStrip";
import { Opinion } from "@/components/news/Opinion";
import { getTopStories, getAssamStories, getNortheastStories, getIndiaStories } from "@/lib/api";
import type { Story } from "@/data/mock";

export function Home() {
  const [topStories, setTopStories] = useState<Story[]>([]);
  const [assam, setAssam] = useState<Story[]>([]);
  const [northeast, setNortheast] = useState<Story[]>([]);
  const [india, setIndia] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [top, a, ne, ind] = await Promise.all([
        getTopStories(),
        getAssamStories(),
        getNortheastStories(),
        getIndiaStories()
      ]);
      setTopStories(top);
      setAssam(a);
      setNortheast(ne);
      setIndia(ind);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="flex-1 flex items-center justify-center min-h-[50vh]">Loading stories...</div>;
  }

  return (
    <>
      <Hero />
      <SectionRow id="top-stories" title="Top Stories" accent stories={topStories} />
      <SectionRow id="assam" title="Assam" stories={assam} />
      <SectionRow id="northeast" title="Northeast" stories={northeast} />
      <SectionRow id="india" title="India & Politics" stories={india} />
      <VideoStrip />
      <Opinion />
    </>
  );
}
