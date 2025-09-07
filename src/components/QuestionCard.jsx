export default function QuestionCard({ question, selectedAnswer, onAnswer }) {
  return (
    <div className="p-5 rounded-xl shadow-lg 
    bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600">
      <h2
        className="text-lg sm:text-xl font-semibold mb-4"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      <ul className="space-y-3">
        {question.answers.map((ans, i) => {
          const isSelected = selectedAnswer === ans;
          const isCorrect = ans === question.correct_answer;
          let cls =
            "p-3 rounded-lg cursor-pointer transition bg-black/30 hover:bg-teal-500/40";

          if (selectedAnswer) {
            if (isSelected && isCorrect) cls = "p-3 rounded-lg bg-green-600 text-white";
            if (isSelected && !isCorrect) cls = "p-3 rounded-lg bg-red-600 text-white";
          }

          return (
            <li
              key={i}
              className={cls}
              onClick={() => !selectedAnswer && onAnswer(ans)}
              dangerouslySetInnerHTML={{ __html: ans }}
            />
          );
        })}
      </ul>
    </div>
  );
}
