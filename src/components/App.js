import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
const SECS_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, questions: action.payload, status: "ready" };
    case "FETCH_ERROR":
      return { ...state, status: "error" };
    case "SET_ACTIVE":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "SET_FINISHED":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "NEW_ANSWER":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          state.points +
          (action.payload === question.correctOption ? question.points : 0),
      };
    case "NEXT_QUESTION":
      const nextIndex = state.index + 1;
      return {
        ...state,
        index: nextIndex,
        answer: null,
      };
    case "RESTART":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };
    case "TICK":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numberOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((error) => dispatch({ type: "FETCH_ERROR" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              numberOfQuestions={numberOfQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numberOfQuestions={numberOfQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            maxPoints={maxPoints}
            points={points}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
