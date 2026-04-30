import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">MCQ Maths Quiz</h1>
        <p className="text-lg text-gray-600 mb-8">
          Practise topic-based maths questions with instant feedback.
        </p>
        <Link
          href="/setup"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg text-lg"
        >
          Start Quiz
        </Link>
      </div>
    </main>
  );
}