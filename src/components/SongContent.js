import React from "react";
import Rating from "./Rating";
import { Level } from "./Level";
import circleDot from "../svg/circle-dot.svg";
export const SongContent = ({
  title,
  artist,
  rating,
  number,
  level,
  released
}) => {
  return (
    <div className="list">
      <div className="left">
        <div className="logo-img">
          <img alt="logo" src="./img/fingerprint-white.png" />
        </div>
        <div className="level">
          <Level level={level} />
        </div>
      </div>
      <div className="song-content">
        <span className="title">
          {title} - {released}
        </span>
        <div className="lower">
          <Rating rate={rating} number={number} />
          <span className="artist">{artist}</span>
        </div>
      </div>

      <img src={circleDot} className="circle-dot" alt="circle-dot" />
    </div>
  );
};
