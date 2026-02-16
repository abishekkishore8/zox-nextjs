"use client";

import { useState, useEffect } from "react";
import { BannerCarousel } from "./BannerCarousel";
import type { Banner } from "@/modules/banners/domain/types";

export function BannerCarouselClient() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await fetch("/api/banners");
        if (!response.ok) {
          console.error("Banner API error:", response.status, response.statusText);
          setLoading(false);
          return;
        }
        const data = await response.json();
        if (data.success) {
          setBanners(data.data || []);
          if (data.data && data.data.length === 0) {
            console.log("No active banners found. Create banners in admin panel at /admin/banners");
          }
        } else {
          console.error("Banner API returned error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBanners();
  }, []);

  if (loading || banners.length === 0) {
    return null;
  }

  return <BannerCarousel banners={banners} />;
}

