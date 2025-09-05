import { useState, useEffect } from "react";

const useViewMode = () => {
  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem("view");
    return saved === "card" || saved === "table" ? saved : "card";
  });

  useEffect(() => {
    localStorage.setItem("view", viewMode);
  }, [viewMode]);

  const toggleView = () => {
    setViewMode((mode) => (mode === "card" ? "table" : "card"));
  };

  return { viewMode, toggleView };
};

export default useViewMode;
