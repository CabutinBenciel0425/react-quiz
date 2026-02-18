import React from "react";
import Options from "./Options";
import { useQuiz } from "../contexts/QuizContext";

export default function Questions() {
  const { questions, curIndex } = useQuiz();
  const question = questions.at(curIndex);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
