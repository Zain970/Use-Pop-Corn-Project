import React, { useState } from "react";

function TestExpander({
  children,
  CollapseNumWords,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor,
  expanded = true,
  className = "",
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: buttonColor,
  };

  const text = isExpanded
    ? children
    : children.split(" ").slice(0, CollapseNumWords).join(" ") + "...";

  return (
    <div className={className}>
      <p>{text}</p>
      <button
        style={buttonStyle}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}

export default TestExpander;
