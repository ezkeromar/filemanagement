"use client";
import { profileSchema } from "@/schemas/user";
import React, { useState, useEffect } from "react";
import { z } from "zod";

interface RadialProgressBarProps {
  progress: number;
  value?: number;
  type?: string;
  message?: string;
  className?: string;
}

const RadialProgressBar: React.FC<RadialProgressBarProps> = ({
  progress,
  value,
  type,
  message,
  className,
}) => {

  return (
    <div
      className={`bg-[#8487c3b2] rounded-lg p-5 flex justify-center flex-col gap-4 font-semibold w-[16rem] ${className}`}
    >
      <div className="relative w-48 h-48"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-full h-full text-gray-300"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-blue-500 dark:text-gray-700"
              strokeWidth="2"
            ></circle>
            <g className="origin-center transform -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-gray-200 dark:text-blue-500"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset={progress}
              ></circle>
            </g>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-38a169  ">
            <div className="grid text-center">
              <span>
                {value ?? progress} {type ?? ""}{" "}
              </span>
              {message && <span className="text-sm px-5">{message}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadialProgressBar;
