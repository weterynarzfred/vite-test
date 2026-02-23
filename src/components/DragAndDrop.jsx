import React, { useMemo, useRef, useState } from "react";
import DropZone from "./DropZone";

export default function DragAndDrop({ words, children }) {
  const wordList = useMemo(
    () => words.split(";").map((w) => w.trim()).filter(Boolean),
    [words]
  );

  const [zones, setZones] = useState({});
  const [available, setAvailable] = useState(wordList);
  const [isCheckingAnswers, setIsCheckingAnswers] = useState(false);

  const nextZoneId = useRef(0);

  const handleDrop = (zoneId, word) => {
    setZones(prev => ({ ...prev, [zoneId]: word }));
    setAvailable(prev => prev.filter(w => w !== word));
  };

  const enhance = node => {
    if (!React.isValidElement(node)) return node;

    const children = node.props?.children
      ? React.Children.map(node.props.children, enhance)
      : node.props.children;

    if (node.type === DropZone) {
      const id = nextZoneId.current++;
      return React.cloneElement(node, {
        zoneId: id,
        value: zones[id],
        onDrop: handleDrop,
        setAvailable: setAvailable,
        isCheckingAnswers: isCheckingAnswers,
        children,
      });
    }

    if (children !== node.props.children)
      return React.cloneElement(node, undefined, children);

    return node;
  };

  nextZoneId.current = 0;
  const enhancedTree = React.Children.map(children, enhance);

  return (
    <div className="DragAndDrop">
      <div className="words" style={{
        minHeight: '1.3rem',
        display: 'flex',
        gap: '.5rem',
      }}>
        {available.map(word => (
          <span
            key={word}
            draggable
            onDragStart={e => e.dataTransfer.setData("text/plain", word)}
            style={{
              borderBottom: "1px solid #ccc",
              minWidth: 80,
              height: '1.3em',
              display: 'inline-block',
              padding: '0 .2rem',
              backgroundColor: '#fff1',
              cursor: 'grab',
            }}
          >
            {word}
          </span>
        ))}
      </div>
      <div>{enhancedTree}</div>
      <button onClick={() => {
        setAvailable(wordList);
        setZones({});
      }}>reset</button>
      <button onClick={() => setIsCheckingAnswers(prev => !prev)}>check answers</button>
    </div>
  );
}
