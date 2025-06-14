import React from "react";
import { useTranslation } from "react-i18next";
import { Background } from "@Components/Background/Background";
import { Button } from "@Components/Button/Button";
import { Text } from "@Components/Text/Text";
import { Icon } from "@Components/Icon/Icon";
import { useGameStateContext } from "@Hooks/useGameStateContext";
import { TotalPoints } from "@Components/TotalPoints/TotalPoints";

export const EndingScreen: React.FC = () => {
  const { t } = useTranslation();
  const { calculateWinnerAndPoints, newGame } = useGameStateContext();

  const { player1, player2, winner } = calculateWinnerAndPoints(); // handle draw

  return (
    <div className="-h-100v">
      <Button variant="normal" color={winner} fullWidth disabled>
        <Text color="text" size="s" weight="regular">
          {t("playerWins", { player: winner === "player1" ? 1 : 2 })}
        </Text>
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "15vh 50px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px 0px",
          }}
        >
          <TotalPoints points={player1.totalPoints} player="player1" />
          <Icon icon="die" alt="So24 Logo" height="41px" width="41px" />
          <TotalPoints points={player2.totalPoints} player="player2" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px 20px",
          }}
        >
          <div>{player1.points}</div>
          <Text size="xs" color="text" weight="regular">
            {t("points")}
          </Text>
          <div>{player2.points}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px 15px",
          }}
        >
          <Text size="xs" color="penalty" weight="regular">
            - {player1.penalty}
          </Text>
          <Text size="xs" color="text" weight="regular">
            {t("penalty")}
          </Text>
          <Text size="xs" color="penalty" weight="regular">
            - {player2.penalty}
          </Text>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "calc(75% - 67px)",
          left: "calc(50% - 67px)",
        }}
      >
        {/* TODO: redirect to landingScreen */}
        <Button variant="normal" color="gradient" borderOnly onClick={() => {}}>
          <Icon icon="plus" alt={t("newGame")} />
          <Text color="text" size="xs" weight="regular">
            {t("newGame")}
          </Text>
        </Button>
      </div>
      <Background />
    </div>
  );
};
