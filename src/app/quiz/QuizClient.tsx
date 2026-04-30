"use client";

import MathText from "@/components/MathText";
import { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

type Question = {
  Question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  Answer: string;
};

export default function QuizClient({
  questions,
  initialTimeSeconds,
  questionCount,
}: {
  questions: Question[];
  initialTimeSeconds: number;
  questionCount: number;
}) {
  const [timeLeft, setTimeLeft] = useState(initialTimeSeconds);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalTimeTaken, setFinalTimeTaken] = useState<number | null>(null);
  

  const quizQuestions = questions.slice(0, questionCount);
  const timeTaken = initialTimeSeconds - timeLeft;
const percentage = Math.round((score / quizQuestions.length) * 100);
const currentQuestion = quizQuestions[currentQuestionIndex];

function getButtonClass(option: string) {
  if (!selectedAnswer) {
    return "w-full py-3 border rounded-lg";
  }

  if (option === currentQuestion.Answer.trim()) {
    return "w-full py-3 border rounded-lg bg-green-200 border-green-500";
  }

  if (option === selectedAnswer) {
    return "w-full py-3 border rounded-lg bg-yellow-200 border-yellow-500";
  }

  return "w-full py-3 border rounded-lg bg-gray-50";
}

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((current) => current > 0 ? current - 1 : 0);
  }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (quizFinished) {
  return (
    <div className="max-w-2xl w-full text-center">
      <h1 className="text-3xl font-bold mb-6">Quiz Complete</h1>

      <p className="text-xl mb-3">
        Score: {score} out of {quizQuestions.length}
      </p>

      <p className="text-xl mb-3">
        {percentage}% correct
      </p>

      <p className="text-xl">
      Time taken: {Math.floor((finalTimeTaken ?? 0) / 60)}m {(finalTimeTaken ?? 0) % 60}s
      </p>

<button
  onClick={() => window.location.href = "/"}
  className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
>
  Try Another Quiz
</button>

    </div>
  );
}
  return (
    <div className="max-w-2xl w-full text-center">
      <div className="mb-6">
        <p className="mb-4 text-sm text-gray-500">
  Question {currentQuestionIndex + 1} of {questionCount}
</p>
        <p className="text-sm text-gray-500">Time remaining</p>
        <p className="text-3xl font-bold">
  {Math.floor(timeLeft / 60)}m {(timeLeft % 60).toString().padStart(2, "0")}s
</p>
      </div>

      <h1 className="text-2xl font-bold mb-6">
  <MathText text={currentQuestion.Question} />
</h1>

      <div className="space-y-4">
  {(["A", "B", "C", "D"] as const).map((option) => (
    <button
      key={option}
      className={getButtonClass(option)}
      onClick={() => {
  setSelectedAnswer(option);

  if (
    option === currentQuestion.Answer.trim() &&
    !selectedAnswer
  ) {
    setScore(score + 1);
  }
}}

    >
   <MathText text={currentQuestion[option]} />
   {selectedAnswer && currentQuestion.Answer.trim() === option && (
  <span className="ml-3 text-2xl font-bold">✔</span>
)}

{selectedAnswer === option && currentQuestion.Answer.trim() !== option && (
  <span className="ml-3 text-2xl font-bold">✖</span>
)}
    </button>
  ))}
</div>
      <button
  className={`mt-6 px-6 py-3 rounded-lg ${
    selectedAnswer
      ? "bg-black text-white"
      : "bg-gray-200 text-gray-400 cursor-not-allowed"
  }`}
  disabled={!selectedAnswer}
  onClick={() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
  setCurrentQuestionIndex(currentQuestionIndex + 1);
  setSelectedAnswer(null);
} else {
  setFinalTimeTaken(initialTimeSeconds - timeLeft);
    setQuizFinished(true);
    }
  }}
>
 {currentQuestionIndex === quizQuestions.length - 1 ? "End Quiz" : "Next Question"}
  
</button>
    </div>
  );
}