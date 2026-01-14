"use client";

import { useEffect } from "react";
import { supabase } from "@/util/supabase";

export const ViewCounter = ({
  slug,
  noCount = false,
  trackView = false,
}: {
  slug: string;
  noCount?: boolean;
  trackView?: boolean;
}) => {
  useEffect(() => {
    const incrementView = async () => {
      if (!trackView || noCount) return;

      try {
        await supabase.rpc("increment_view", { page_slug: slug });
      } catch (e) {
        console.error("Error incrementing view count", e);
      }
    };

    incrementView();
  }, [slug, noCount, trackView]);

  return null;
};
