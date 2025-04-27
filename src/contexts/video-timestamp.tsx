"use client";

import React, { createContext, useContext, useState } from "react";

type VideoTimestampContextType = {
  currentTimestamp: number;
  setCurrentTimestamp: (t: number) => void;
};

const VideoTimestampContext = createContext<
  VideoTimestampContextType | undefined
>(undefined);

export function VideoTimestampProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  return (
    <VideoTimestampContext.Provider
      value={{ currentTimestamp, setCurrentTimestamp }}
    >
      {children}
    </VideoTimestampContext.Provider>
  );
}

export function useVideoTimestamp() {
  const context = useContext(VideoTimestampContext);
  if (!context)
    throw new Error(
      "useVideoTimestamp must be used within VideoTimestampProvider"
    );
  return context;
}
