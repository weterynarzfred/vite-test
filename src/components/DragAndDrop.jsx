import React, { useState } from "react";

export default function DragAndDrop({ words, children }) {
  console.log(children);

  const wordList = words.split(",").map(w => w.trim());
  const parts = children.split("___");

  const [filled, setFilled] = useState(
    Array(parts.length - 1).fill(null)
  );

  function onDrop(index, word) {
    setFilled(prev => {
      const next = [...prev];
      next[index] = word;
      return next;
    });
  }

  function onDragStart(e, word) {
    e.dataTransfer.setData("text/plain", word);
  }

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {wordList.map(word => (
          <div
            key={word}
            draggable
            onDragStart={e => onDragStart(e, word)}
            style={{
              padding: "6px 10px",
              border: "1px solid #333",
              cursor: "grab",
              background: "#f0f0f0"
            }}
          >
            {word}
          </div>
        ))}
      </div>

      <div>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < filled.length && (
              <span
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  const word = e.dataTransfer.getData("text/plain");
                  onDrop(i, word);
                }}
                style={{
                  display: "inline-block",
                  minWidth: 60,
                  minHeight: '2rem',
                  padding: "2px 6px",
                  margin: "0 4px",
                  borderBottom: "2px solid black",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                {filled[i] || ""}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
