import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StudioCursor } from "@/components/interaction/StudioCursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SectionRail } from "@/components/layout/SectionRail";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { onHashLinkClick, smoothScrollTo } from "@/lib/scroll";
import { Home } from "@/pages/Home";

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = window.setTimeout(() => {
      if (hash) {
        smoothScrollTo(hash);
        return;
      }

      window.scrollTo({ top: 0, left: 0 });
    }, 40);

    return () => window.clearTimeout(frame);
  }, [pathname, hash]);

  return null;
}

function SmoothHashLinks() {
  useEffect(() => {
    document.addEventListener("click", onHashLinkClick);
    return () => document.removeEventListener("click", onHashLinkClick);
  }, []);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <SmoothHashLinks />
      <SkipLink />
      <StudioCursor />
      <div className="film-grain" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <SectionRail />
      <Home />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
