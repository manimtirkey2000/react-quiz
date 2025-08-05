function NextButton({ dispatch, answer, numberOfQuestions, index }) {
  if (answer === null) return null;
  if (index + 1 >= numberOfQuestions) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "SET_FINISHED" })}
      >
        Finish
      </button>
    );
  }
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "NEXT_QUESTION" })}
    >
      Next
    </button>
  );
}

export default NextButton;
