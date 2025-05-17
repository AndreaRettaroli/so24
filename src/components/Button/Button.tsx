import React from "react";
import clsx from "clsx";

type ButtonColors =
  | "gradient"
  | "player1"
  | "player2"
  | "default"
  | "transparent"
  | "disabled";

interface SharedButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

interface NormalButtonProps extends SharedButtonProps {
  variant: "normal";
  borderOnly?: boolean; // default false
  color: ButtonColors;
  height?: "large" | "medium"; // default large
  fullWidth?: boolean;
  // icon
}

interface RotatedButtonProps extends SharedButtonProps {
  variant: "rotated";
  borderOnly?: boolean; // default false
  color: Exclude<ButtonColors, "transparent">;
  height?: "x-large" | "large" | "medium"; // default large
  // icon only
}

export const Button: React.FC<
  React.PropsWithChildren<RotatedButtonProps | NormalButtonProps>
> = (props) => (
  <button
    className={clsx(getButtonClassesArray(props), props.className)}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    <div
      className={clsx(
        "-df -a-ctr -j-c",
        props.variant === "rotated" && "-dcol"
      )}
    >
      {props.children}
    </div>
  </button>
);

function getButtonClassesArray(
  props: RotatedButtonProps | NormalButtonProps
): string[] {
  const classes = [];

  if (props.height === "medium") {
    classes.push("_medium");
  } else if (props.height === "x-large") {
    classes.push("_x-large");
  } else {
    classes.push("_large");
  }

  if (props.variant === "normal") {
    classes.push("player-button");

    if (props.fullWidth) {
      classes.push("-fw");
    }
  }

  if (props.variant === "rotated") {
    classes.push("rotated-button");
  }

  if (props.borderOnly) {
    if (props.variant === "normal") {
      classes.push("button-border");
    }
    classes.push("_border-only");
  }

  classes.push(colorTypeToClass(props.color));

  return classes;
}

function colorTypeToClass(color: ButtonColors) {
  switch (color) {
    case "player1": {
      return "_player1";
    }
    case "player2": {
      return "_player2";
    }
    case "default": {
      return "_default";
    }
    case "gradient": {
      return "_gradient-border";
    }
    case "transparent": {
      return "_transparent";
    }
    case "disabled": {
      return "_disabled";
    }
    default: {
      return "_default";
    }
  }
}
