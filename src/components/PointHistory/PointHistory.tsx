import React from "react";
import { Text, FontSize } from "@Components/Text/Text";

interface PointHistoryProps {
  pointHistory: number[];
}

export const PointHistory: React.FC<PointHistoryProps> = ({ pointHistory }) => (
  <div
    style={{
      display: "flex",
      alignItems: "end",
      gap: "8px",
    }}
  >
    {/* {FIXED: points history visualization, just last point} */}
    {pointHistory.slice(-1).map((points, index) => (
      <Text
        color="text"
        weight="regular"
        size={"l"}
        key={`point-history-${index}-${points}`}
      >
        +{points.toString()}
      </Text>
    ))}
  </div>
);

function getSizeFromIndex(index: number): FontSize {
  if (index === 0) {
    return "s";
  }

  if (index === 1) {
    return "m";
  }

  return "l";
}
