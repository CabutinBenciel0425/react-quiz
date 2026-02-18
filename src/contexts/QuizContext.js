import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const secs_per_question = 10;

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  curIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: secs_per_question * state.questions.length,
      };
    case "newAnswer":
      const question = state.questions.at(state.curIndex);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        curIndex: state.curIndex + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      // return {
      //   ...state,
      //   curIndex: 0,
      //   answer: null,
      //   points: 0,
      //   status: "ready",
      // };
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "time":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unknown Action");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      curIndex,
      answer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, [dispatch]);

  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  const numQuestions = questions.length;

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        curIndex,
        answer,
        points,
        highscore,
        secondsRemaining,
        totalPoints,
        numQuestions,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext have been used outside the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
