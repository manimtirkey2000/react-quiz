function Options({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswered
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "NEW_ANSWER", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
