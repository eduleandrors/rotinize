import React, { useState, useEffect } from "react";

const Category = ({ categoria }) => {
  const [cor, setCor] = useState("");
  const [emoji, setEmoji] = useState("");
  useEffect(() => {
    if (categoria === "Studies") {
      setCor("rgba(106, 90, 205, 0.7)");
      setEmoji("📚");
    } else if (categoria === "Work") {
      setCor("rgba(30, 144, 255, 0.7)");
      setEmoji("💼");
    } else if (categoria === "Food") {
      setCor("rgba(255, 140, 0, 0.7)");
      setEmoji("🍝");
    } else if (categoria === "Personal") {
      setCor("rgba(255, 105, 180, 0.7)");
      setEmoji("👤");
    } else if (categoria === "Home") {
      setCor("rgba(240, 230, 140, 0.7)");
      setEmoji("🏠");
    } else {
      setCor("rgba(50, 205, 50, 0.7)");
      setEmoji("💊");
    }
  }, [categoria]);

  return (
    <div
      className="flex gap-1 py-1 px-[.4rem] bg-opacity-70 w-max rounded-md"
      style={{ backgroundColor: cor }}
    >
      <p>{emoji}</p>
      <p style={{ textShadow: "3px 1px 5px black" }}>{categoria}</p>
    </div>
  );
};

export default Category;
