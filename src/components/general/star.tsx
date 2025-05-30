import { SVGProps } from "react";

export default function Star({
  filledBy,
  color = "#8b4309",
  size = 15,
  ...props
}: {
  filledBy: 0 | 0.5 | 1;
  color?: string;
  size?: number;
} & SVGProps<SVGSVGElement>) {
  return (
    <>
      {filledBy === 0 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={`${size}px`}
          height={`${size}px`}
          viewBox="0 0 36 36"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          stroke={color}
          {...props}
        >
          <path
            className="clr-i-solid clr-i-solid-path-1"
            d="M34,16.78a2.22,2.22,0,0,0-1.29-4l-9-.34a.23.23,0,0,1-.2-.15L20.4,3.89a2.22,2.22,0,0,0-4.17,0l-3.1,8.43a.23.23,0,0,1-.2.15l-9,.34a2.22,2.22,0,0,0-1.29,4l7.06,5.55a.23.23,0,0,1,.08.24L7.35,31.21a2.22,2.22,0,0,0,3.38,2.45l7.46-5a.22.22,0,0,1,.25,0l7.46,5a2.2,2.2,0,0,0,2.55,0,2.2,2.2,0,0,0,.83-2.4l-2.45-8.64a.22.22,0,0,1,.08-.24Z"
          />
        </svg>
      ) : filledBy === 1 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          width={`${size}px`}
          height={`${size}px`}
          viewBox="0 0 36 36"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          {...props}
        >
          <path
            className="clr-i-solid clr-i-solid-path-1"
            d="M34,16.78a2.22,2.22,0,0,0-1.29-4l-9-.34a.23.23,0,0,1-.2-.15L20.4,3.89a2.22,2.22,0,0,0-4.17,0l-3.1,8.43a.23.23,0,0,1-.2.15l-9,.34a2.22,2.22,0,0,0-1.29,4l7.06,5.55a.23.23,0,0,1,.08.24L7.35,31.21a2.22,2.22,0,0,0,3.38,2.45l7.46-5a.22.22,0,0,1,.25,0l7.46,5a2.2,2.2,0,0,0,2.55,0,2.2,2.2,0,0,0,.83-2.4l-2.45-8.64a.22.22,0,0,1,.08-.24Z"
          />
          <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          width={`${size}px`}
          height={`${size}px`}
          viewBox="0 0 36 36"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          {...props}
        >
          <path
            className="clr-i-solid clr-i-solid-path-1"
            d="M34,16.78a2.22,2.22,0,0,0-1.29-4l-9-.34a.23.23,0,0,1-.2-.15L20.4,3.89a2.22,2.22,0,0,0-4.17,0l-3.1,8.43a.23.23,0,0,1-.2.15l-9,.34a2.22,2.22,0,0,0-1.29,4l7.06,5.55a.23.23,0,0,1,.08.24L7.35,31.21a2.22,2.22,0,0,0,3.38,2.45l7.46-5a.22.22,0,0,1,.25,0l7.46,5a2.2,2.2,0,0,0,2.55,0,2.2,2.2,0,0,0,.83-2.4l-2.45-8.64a.22.22,0,0,1,.08-.24ZM24.9,23.11l2.45,8.64A.22.22,0,0,1,27,32l-7.46-5a2.21,2.21,0,0,0-1.24-.38h0V4.44h0a.2.2,0,0,1,.21.15L21.62,13a2.22,2.22,0,0,0,2,1.46l9,.34a.22.22,0,0,1,.13.4l-7.06,5.55A2.21,2.21,0,0,0,24.9,23.11Z"
          />
          <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
        </svg>
      )}
    </>
  );
}
