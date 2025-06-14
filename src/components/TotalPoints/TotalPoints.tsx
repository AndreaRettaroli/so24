import React from "react";
import { Player } from "@Types/types";
import { Text } from "@Components/Text/Text";

interface TotalPointsProps {
  points: number;
  player: Player;
}

export const TotalPoints: React.FC<TotalPointsProps> = ({ points, player }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      width: "50px",
    }}
  >
    <Text color={points < 0 ? "penalty" : "text"} size="l" weight="regular">
      {points}
    </Text>
    <Text color={player} size="m" weight="regular">
      Score
    </Text>
  </div>
);
