import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@Components/Button/Button";
import { Text } from "@Components/Text/Text";
import { TotalPoints } from "@Components/TotalPoints/TotalPoints";
import { PointHistory } from "@Components/PointHistory/PointHistory";
import { Icon } from "@Components/Icon/Icon";
import {
  useGameStateCurrentPlayer,
  useGameStatePlayer1,
  useGameStatePlayer2,
  useGameStateCurrentPlayerTurn,
  useGameStateCountdown,
} from "@Hooks/useGameStateStore";
import { useGameStateContext } from "@Hooks/useGameStateContext";
import clsx from "clsx";

export const GameScreen: React.FC = () => {
  const { t } = useTranslation();
  const currentPlayer = useGameStateCurrentPlayer();
  const currentPlayerTurn = useGameStateCurrentPlayerTurn();
  const { addPoints, undoPoints, stopGame, nextTurn, toggleNoDice } =
    useGameStateContext();
  const { value: seconds } = useGameStateCountdown();
  const player1 = useGameStatePlayer1();
  const player2 = useGameStatePlayer2();

  return (
    <div className="-h-100vh">
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: "100",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="dice"
          color="player2"
          className="-t-r180dg"
          onClick={() => toggleNoDice("player2")}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {player2.noDice ? (
              <Icon icon="die" alt={t("noDice")} width="16px" height="16px" />
            ) : (
              <Icon
                icon="dieDisabled"
                alt={t("noDice")}
                width="16px"
                height="16px"
              />
            )}
            <Text color="text" size="xxs" weight="regular">
              {player2.noDice ? t("haveDice") : t("noDice")}
            </Text>
          </div>
        </Button>

        <div className="-t-r180dg">
          <TotalPoints points={player2.points} player="player2" />
        </div>
      </div>
      <div
        style={{ position: "relative", width: "100vw", height: "100vh" }}
        className={clsx(currentPlayer === "player2" && "-t-r180dg")}
      >
        <div>
          <div
            style={{
              position: "absolute",
              top: "14%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
              width: "100vw",
              zIndex: "-1", // this is required because of width
            }}
          >
            <Text size="xxs" color="text" weight="regular">
              {t("turn")}{" "}
              <Text size="xs" color="text" weight="regular">
                {currentPlayerTurn} / 24
              </Text>
            </Text>
          </div>
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Button
              variant="rotated"
              color={currentPlayer}
              height="x-large"
              borderOnly
              onClick={() => stopGame()}
            >
              <Icon icon="pause" alt="Pause" />
              <Text color="text" size="xxl" weight="regular">
                {seconds.toString()}
              </Text>
            </Button>
          </div>
          <div
            style={{
              position: "absolute",
              top: "calc(88% + 1px)",
              zIndex: "1000",
              left: "50%",
              transform: "translateX(-50%)",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              variant="rotated"
              color={currentPlayer}
              borderOnly
              onClick={() => nextTurn()}
            >
              <Text color="text" size="m" weight="regular">
                {t("pass")}
              </Text>
            </Button>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "45%",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100vw",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <PointHistory
              pointHistory={
                currentPlayer === "player1"
                  ? player1.pointHistory
                  : player2.pointHistory
              }
            />
            <div style={{ position: "absolute", left: "60%" }}>
              <Button
                height="medium"
                variant="rotated"
                color="default"
                borderOnly
                onClick={() => undoPoints(currentPlayer)}
              >
                <Icon icon="annul" alt="Annul" />
              </Button>
            </div>
          </div>
        </div>
        <div
          id="button-container"
          style={{
            position: "absolute",
            top: "calc(60% + 20px)",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "80%",
              margin: "0 auto",
            }}
          >
            <Button
              height="medium"
              variant="normal"
              color={currentPlayer}
              borderOnly
              onClick={() => addPoints(currentPlayer, 1)}
            >
              <Text color="text" size="l" weight="regular">
                1
              </Text>
            </Button>

            <Button
              height="medium"
              variant="normal"
              color={currentPlayer}
              borderOnly
              onClick={() => addPoints(currentPlayer, 2)}
            >
              <Text color="text" size="l" weight="regular">
                2
              </Text>
            </Button>

            <Button
              height="medium"
              variant="normal"
              color={currentPlayer}
              borderOnly
              onClick={() => addPoints(currentPlayer, 3)}
            >
              <Text color="text" size="l" weight="regular">
                3
              </Text>
            </Button>

            <Button
              height="medium"
              variant="normal"
              color={currentPlayer}
              borderOnly
              onClick={() => addPoints(currentPlayer, 4)}
            >
              <Text color="text" size="l" weight="regular">
                4
              </Text>
            </Button>

            <Button
              height="medium"
              variant="normal"
              color={currentPlayer}
              borderOnly
              onClick={() => addPoints(currentPlayer, 5)}
            >
              <Text color="text" size="l" weight="regular">
                5
              </Text>
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="dice"
          color="player1"
          onClick={() => toggleNoDice("player1")}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {player1.noDice ? (
              <Icon icon="die" alt={t("noDice")} width="16px" height="16px" />
            ) : (
              <Icon
                icon="dieDisabled"
                alt={t("noDice")}
                width="16px"
                height="16px"
              />
            )}
            <Text color="text" size="xxs" weight="regular">
              {player1.noDice ? t("haveDice") : t("noDice")}
            </Text>
          </div>
        </Button>

        <TotalPoints points={player1.points} player="player1" />
      </div>
    </div>
  );
};
