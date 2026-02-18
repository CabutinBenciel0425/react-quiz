import React from "react";

export default function Progress({
  curIndex,
  numQuestions,
  points,
  totalPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={curIndex + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{curIndex + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}
