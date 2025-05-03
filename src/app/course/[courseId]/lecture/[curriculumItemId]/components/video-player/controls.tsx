import { Button } from "@/components/general";
import { formatVideoTime } from "@/lib/utils";
import {
  Expand,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2Icon,
  VolumeOff,
} from "lucide-react";
import { ChangeEvent } from "react";
import ControlTooltip from "./control-tooltip";
import PlaybackControl from "./playback-control";

export default function Controls({
  isPlaying,
  togglePlay,
  currentTime,
  duration,
  handleSeek,
  playbackRate,
  setPlaybackRate,
  volume,
  handleVolumeChange,
  isMuted,
  toggleMute,
  isFullscreen,
  toggleFullscreen,
}: {
  isPlaying: boolean;
  togglePlay: () => void;
  currentTime: number;
  duration: number;
  handleSeek: (newValue: string) => void;
  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
  volume: number;
  handleVolumeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isMuted: boolean;
  toggleMute: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}) {
  return (
    <div className="absolute flex h-8 md:h-[6.4rem] items-center justify-between bottom-0 inset-x-0 p-1 md:p-3 bg-[linear-gradient(to_top,rgba(20,23,28,0.9)_0%,rgba(20,23,28,0.738)_19%,rgba(20,23,28,0.541)_34%,rgba(20,23,28,0.382)_47%,rgba(20,23,28,0.278)_56.5%,rgba(20,23,28,0.194)_65%,rgba(20,23,28,0.126)_73%,rgba(20,23,28,0.075)_80.2%,rgba(20,23,28,0.042)_86.1%,rgba(20,23,28,0.021)_91%,rgba(20,23,28,0.008)_95.2%,rgba(20,23,28,0.002)_98.2%,rgba(20,23,28,0)_100%)]">
      {/* Left controls */}
      <div className="flex items-center gap-x-1 md:gap-x-3">
        <Button
          className="md:p-1 w-3 h-3 md:w-8 md:h-8"
          variant="ghost"
          height="sm"
          onClick={togglePlay}
          aria-label={isPlaying ? "Play video" : "Pause video"}
        >
          {isPlaying ? (
            <Pause color="#d1d2e0" />
          ) : (
            <Play fill="#d1d2e0" color="#d1d2e0" />
          )}
          <ControlTooltip text={isPlaying ? "Pause" : "Play"} />
        </Button>
        <Button
          className="md:p-1 w-3 h-3 md:w-8 md:h-8"
          variant="ghost"
          height="sm"
          onClick={() => handleSeek(Math.max(currentTime - 5, 0).toString())}
          aria-label="Rewind by 5 seconds."
        >
          <RotateCcw color="#d1d2e0" />
          <ControlTooltip text="Rewind 5s" />
        </Button>
        <Button
          className="md:p-1 w-3 h-3 md:w-8 md:h-8"
          variant="ghost"
          height="sm"
          onClick={() => handleSeek(Math.max(currentTime + 5, 0).toString())}
          aria-label="Forward by 5 seconds"
        >
          <RotateCw color="#d1d2e0" />
          <ControlTooltip text="Forward 5s" />
        </Button>
        {/* Playback Rate */}
        <PlaybackControl
          playbackRate={playbackRate}
          setPlaybackRate={setPlaybackRate}
        />
      </div>
      {/* Center controls: Progress bar */}
      <div className="flex items-center gap-x-2 flex-1 mx-4">
        <span className="text-xs text-white w-12 text-right">
          {formatVideoTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={(e) => handleSeek(e.target.value)}
          className="w-full h-1 accent-purple-500 bg-gray-300 rounded-lg cursor-pointer"
        />
        <span className="text-xs text-white w-12">
          {formatVideoTime(duration)}
        </span>
      </div>
      {/* Right controls: Volume, Fullscreen */}
      <div className="flex items-center gap-x-1 md:gap-x-3">
        <Button
          variant="ghost"
          height="sm"
          onClick={toggleMute}
          className="md:p-1 w-3 h-3 md:w-8 md:h-8"
          aria-label={volume === 0 ? "Unmute video" : "Mute video"}
        >
          {volume === 0 ? (
            <VolumeOff color="#d1d2e0" />
          ) : (
            <Volume2Icon color="#d1d2e0" />
          )}
          <ControlTooltip text={isMuted ? "Unmute" : "Mute"} />
        </Button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 accent-purple-500"
        />
        <Button
          variant="ghost"
          height="sm"
          onClick={toggleFullscreen}
          className="md:p-1 w-3 h-3 md:w-8 md:h-8 ms-1"
          aria-label={isFullscreen ? "Minimize video." : "Expand video."}
        >
          {isFullscreen ? (
            <Minimize color="#d1d2e0" />
          ) : (
            <Expand color="#d1d2e0" />
          )}
          <ControlTooltip
            text={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          />
        </Button>
      </div>
    </div>
  );
}
