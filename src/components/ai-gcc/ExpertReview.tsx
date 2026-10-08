"use client";

import React from "react";
import { AI_GCC_EXPERT_REVIEW } from "@/data/aiGcc";
import { ShieldCheck } from "lucide-react";

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

export interface ExpertReviewData {
  name: string;
  role?: string;
  profileUrl: string;
  reviewedOn: string;
}

/** Editorial review line shown at the end of each section page. */
export default function ExpertReview({
  review = AI_GCC_EXPERT_REVIEW,
}: {
  review?: ExpertReviewData;
}) {
  return null;
}
