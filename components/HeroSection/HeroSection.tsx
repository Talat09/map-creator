import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="container bg-gradient-to-b from-gray-50 to-white my-20 py-24 mx-auto">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Polygon Map Creator
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Create, customize, and export map polygons with ease. The perfect
              tool for geographic data visualization and analysis.
            </p>
          </div>
          <div className="space-x-4">
            <Button
              size="lg"
              className="hover:bg-green-600 bg-black text-white rounded"
            >
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="rounded">
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
