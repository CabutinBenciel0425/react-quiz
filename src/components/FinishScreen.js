import React from "react";

export default function FinishScreen({
  points,
  totalPoints,
  highscore,
  dispatch,
}) {
  const pointPercentage = (points / totalPoints) * 100;

  let emoji;
  if (pointPercentage === 100) emoji = "🥇";
  if (pointPercentage >= 80 && pointPercentage < 100) emoji = "🥈";
  if (pointPercentage >= 60 && pointPercentage < 80) emoji = "🥉";
  if (pointPercentage < 60) emoji = "💥";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(pointPercentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
