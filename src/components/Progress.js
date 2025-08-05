function Progress({ index, answer, numberOfQuestions, points, maxPoints }) {
  return (
    <header className="progress">
      <progress
        className="progress-bar"
        max={numberOfQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> /{maxPoints}
      </p>
    </header>
  );
}

export default Progress;
