"use client";

import { fetchVideoSource } from "@/actions/courses";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Controls from "./controls";
import { useVideoTimestamp } from "@/contexts/video-timestamp";

export default function VideoPlayer({
  courseId,
  curriculumItemId,
}: {
  courseId: string;
  curriculumItemId: string;
}) {
  const { setCurrentTimestamp } = useVideoTimestamp();
  const [videoSrc, setVideoSrc] = useState<undefined | string>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function togglePlay() {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }

    setIsPlaying((prev) => !prev);
  }

  function handleTimeUpdate() {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setCurrentTimestamp(videoRef.current.currentTime);
    }
  }

  function handleLoadedMetadata() {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }

  function handleSeek(newValue: string) {
    if (videoRef.current) {
      videoRef.current.currentTime = Number(newValue);
      setCurrentTime(Number(newValue));
    }
  }

  function handleVolumeChange(e: ChangeEvent<HTMLInputElement>) {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  }

  function toggleMute() {
    setIsMuted(!isMuted);
  }

  function handlePlaybackRate(rate: number) {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  }

  function toggleFullscreen() {
    if (!videoRef.current) return;
    const videoContainer = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      videoContainer?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  function handleFullscreenChange() {
    if (!document.fullscreenElement) {
      setIsFullscreen(false);
    } else {
      setIsFullscreen(true);
    }
  }

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // Safari
    document.addEventListener("mozfullscreenchange", handleFullscreenChange); // Firefox
    document.addEventListener("MSFullscreenChange", handleFullscreenChange); // IE/Edge

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    const handleVideoLoad = async () => {
      const videoSrc = await fetchVideoSource(courseId, curriculumItemId);
      setVideoSrc(videoSrc);
    };
    handleVideoLoad();
  }, [courseId, curriculumItemId]);

  if (!videoSrc) return null;

  return (
    <div className="relative h-80 md:h-[40rem] max-w-full bg-[#000]">
      <video
        ref={videoRef}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        muted={isMuted}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Controls
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        currentTime={currentTime}
        duration={duration}
        handleSeek={handleSeek}
        playbackRate={playbackRate}
        setPlaybackRate={handlePlaybackRate}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        isMuted={isMuted}
        toggleMute={toggleMute}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />
    </div>
  );
}
