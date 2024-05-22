import { Animation } from "@/components/shared/Animation";
import Hero from "./components/Hero";
import Uploadwidget from "./components/Uploadwidget";
import ProcessingAPIs from "./components/ProcessingAPIs";
import Efficient from "./components/Efficient";
import PublicPrivate from "./components/PublicPrivate";
import WorldWide from "./components/WorldWide";
import Details from "./components/Details";
import Performance from "./components/Performance";
import BlurHash from "./components/BlurHash";
import CDN from "./components/CDN";

export default function HomePage() {
  const sectionStyles = "min-h-screen snap-center";

  return (
    <>
      
      <Animation className="snap-end">
        <Hero className="h-[calc(100vh-60px)] snap-end max-xs:max-h-[500px]" />
      </Animation>
      <Animation>
        <Uploadwidget className={sectionStyles} />
      </Animation>
      <Animation>
        <ProcessingAPIs className={sectionStyles} />
      </Animation>
      <Animation>
        <Efficient className={sectionStyles} />
      </Animation>
      <Animation>
        <BlurHash className={sectionStyles} />
      </Animation>
      <Animation>
        <CDN className={sectionStyles} />
      </Animation>
      <Animation>
        <PublicPrivate className={sectionStyles} />
      </Animation>
      <Animation>
        <Performance className={sectionStyles} />
      </Animation>
      <Animation>
        <WorldWide className={sectionStyles} />
      </Animation>
      <Animation>
        <Details className={sectionStyles} />
      </Animation>
      
    </>
  );
}
