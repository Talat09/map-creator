import React from "react";
import { Button } from "../ui/button";

const CtaSection = () => {
  return (
    <section className="py-20 my-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Start Creating Your Maps Today
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
              Join thousands of users who trust Polygon Map Creator for their
              mapping needs.
            </p>
          </div>
          <Button size="lg" className="mt-4 bg-green-400 text-white rounded">
            Get Started for Free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
