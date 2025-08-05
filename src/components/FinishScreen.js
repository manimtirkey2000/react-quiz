function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const pointsPercent = (points / maxPoints) * 100;
  let emoji;
  if (pointsPercent === 100) {
    emoji = "🥳";
  } else if (pointsPercent >= 50) {
    emoji = "🙂";
  } else {
    emoji = "😢";
  }
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPoints}! ({pointsPercent.toFixed(2)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "RESTART" })}
      >
        Reset Quiz
      </button>
    </>
  );
}

export default FinishScreen;
