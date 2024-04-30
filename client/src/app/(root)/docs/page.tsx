"use client";

import ApiTypes from "./components/ApiTypes";
import { Animation } from "@/components/shared/Animation";
import GetStarted from "./components/GetStarted";
import CopyCodeSource from "@/components/CopyCodeSource";

export default function SuccessPage() {
  return (
    <Animation className="snap-end pt-10 px-10">
      <ApiTypes />
      <GetStarted/>
    </Animation>
  );
}
