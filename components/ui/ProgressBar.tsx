"use client";

import { FC } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type ProssgressBarProps = {
  value: number;
};

const ProgressBar: FC<ProssgressBarProps> = ({ value }) => {
  return (
    <>
      <CircularProgressbar
        className="flex justify-center p-10"
        value={value}
        text={`${value}% spent`}
        styles={buildStyles({
          pathColor: value >= 100 ? "#DC2626" : "#f59E0B",
          trailColor: "#e1e1e1",
          textColor: value >= 100 ? "#DC2626" : "#f59E0B",
          textSize: 8,
        })}
      />
    </>
  );
};

export default ProgressBar;
