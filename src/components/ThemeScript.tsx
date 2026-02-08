"use client";

import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    const flyClick = () => {
      const wrap = document.getElementById("mvp-fly-wrap");
      const but = document.querySelectorAll(".mvp-fly-but-click");
      const fade = document.querySelector(".mvp-fly-fade");
      if (wrap) {
        wrap.classList.toggle("mvp-fly-menu");
        wrap.classList.toggle("mvp-fly-shadow");
      }
      but.forEach((el) => el.querySelector(".mvp-fly-but-wrap")?.classList.toggle("mvp-fly-open"));
      fade?.classList.toggle("mvp-fly-fade-trans");
    };

    const searchClick = () => {
      document.getElementById("mvp-search-wrap")?.classList.toggle("mvp-search-toggle");
    };

    const backToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    document.querySelectorAll(".mvp-fly-but-click").forEach((el) => {
      el.addEventListener("click", flyClick);
    });
    document.querySelectorAll(".mvp-search-click").forEach((el) => {
      el.addEventListener("click", searchClick);
    });
    document.querySelector(".back-to-top")?.addEventListener("click", (e) => {
      e.preventDefault();
      backToTop();
    });
    document.querySelector(".mvp-fly-fade.mvp-fly-but-click")?.addEventListener("click", flyClick);

    return () => {
      document.querySelectorAll(".mvp-fly-but-click").forEach((el) => {
        el.removeEventListener("click", flyClick);
      });
      document.querySelectorAll(".mvp-search-click").forEach((el) => {
        el.removeEventListener("click", searchClick);
      });
      document.querySelector(".back-to-top")?.removeEventListener("click", backToTop);
      document.querySelector(".mvp-fly-fade.mvp-fly-but-click")?.removeEventListener("click", flyClick);
    };
  }, []);

  return null;
}
