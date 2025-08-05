function StartScreen({ numberOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numberOfQuestions} question to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "SET_ACTIVE" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
