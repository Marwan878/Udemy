"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/general/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-white text-[#1c1d1f] font-sans px-4"
      style={{ fontFamily: "var(--font-stack-text)" }}
    >
      <h1 className="heading-3xl mb-4 text-center text-[#2d2f31]">Something went wrong</h1>
      <p className="mb-8 text-lg text-center max-w-xl text-[#6a6f73]">
        {error?.message || "An unexpected error occurred."}
      </p>
      <div className="flex gap-4 mb-4">
        <Button variant="primary" height="lg" onClick={() => reset()}>
          Try Again
        </Button>
        <Link href="/" passHref>
          <Button as="a" variant="secondary" height="lg">
            Go Home
          </Button>
        </Link>
      </div>
      {error?.digest && (
        <pre className="mt-8 text-sm text-[#6a6f73] bg-[#f7f9fa] rounded p-4 border border-[#e4e8eb]">
          Error reference: {error.digest}
        </pre>
      )}
    </div>
  );
}
