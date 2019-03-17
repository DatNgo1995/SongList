import React from "react";
const MAX = 15;
export const Level = ({ level }) => {
  let circle1 = "0 100",
    circle2 = "0 100",
    circle3 = "0 100";
  if (level < 6) circle1 = (level / MAX) * 100 - 2 + " 100";
  else if (level < 11) {
    circle1 = "31 100";
    circle2 = ((level - 5) / MAX) * 100 - 2 + " 100";
  } else {
    circle1 = "31 100";
    circle2 = "31 100";
    circle3 = ((level - 10) / MAX) * 100 - 2 + " 100";
  }

  return (
    <svg viewBox="0 0 36 36" className="circular-chart green">
      <path
        className="circle-bg"
        strokeDasharray="31 2"
        d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        className="circle"
        htmlFor="circle1"
        strokeDasharray={circle1}
        d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        className="circle"
        htmlFor="circle2"
        strokeDasharray={circle2}
        d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        className="circle"
        htmlFor="circle3"
        strokeDasharray={circle3}
        d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" className="percentage">
        {level}
      </text>
    </svg>
  );
};
