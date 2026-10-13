"use client";

import Image from "next/image";
import { type MouseEvent, useState } from "react";

type Tilt = { x: number; y: number };

/** Decorative, photorealistic GCC headquarters visual for the NewHome preview. */
export default function RealGccBuilding() {
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 3, y: y * -2.5 });
  }

  return (
    <div
      className="relative mx-auto h-[350px] w-full max-w-[660px] cursor-default select-none sm:h-[430px] lg:mx-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      aria-hidden="true"
      style={{ perspective: "1400px" }}
    >
      <div className="absolute inset-x-[12%] bottom-[7%] h-[26%] rounded-full bg-[#1096bf]/15 blur-[46px]" />
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.01)`, transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-[2%] overflow-hidden rounded-[2.5rem] bg-white shadow-[0_32px_65px_-40px_rgba(16,150,191,0.48)]">
          <Image
            src="/images/gcc-campus-hero-b.webp"
            alt=""
            fill
            sizes="(max-width: 1024px) 92vw, 650px"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.10),rgba(255,255,255,0)_43%,rgba(16,150,191,0.07))]" />
          <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-[#1096bf]/15" />
        </div>
        <div className="absolute -right-1 top-[14%] h-3 w-3 rounded-full bg-[#1096bf]/80 shadow-[0_0_0_7px_rgba(16,150,191,0.11),0_0_22px_rgba(16,150,191,0.4)]" />
        <div className="absolute -left-2 bottom-[26%] h-2.5 w-2.5 rounded-full bg-[#1096bf]/65 shadow-[0_0_16px_rgba(16,150,191,0.38)]" />
      </div>
    </div>
  );
}
