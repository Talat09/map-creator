"use client";
import CtaSection from "@/components/CtaSection/CtaSection";
import HeroSection from "@/components/HeroSection/HeroSection";
// import MapComponent from "@/components/MapComponent";
import PolygonList from "@/components/PolygonList";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
});
export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <HeroSection />{" "}
      <div className="container flex flex-col md:flex-row gap-8 mx-auto my-8">
        <div className="w-full md:w-2/3">{isClient && <MapComponent />}</div>
        <div className="w-full md:w-1/3">
          <PolygonList />
        </div>
      </div>
    </main>
  );
}
