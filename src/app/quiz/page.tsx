import { getQuestionsFromAirtable } from "../lib/airtable";
import QuizClient from "./QuizClient";

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{
    topics?: string;
    minutes?: string;
    seconds?: string;
    count?: string;
  }>;
}) {
  const params = await searchParams;

  const selectedTopics = (params.topics || "")
    .split(",")
    .map((topic) => topic.trim())
    .filter(Boolean);

  const rows = await getQuestionsFromAirtable();

  const filteredQuestions = rows
  .filter((row: any) => {
    const value = row["Combined Topics"];

    const rowTopics = Array.isArray(value)
      ? value
      : typeof value === "string"
      ? value.split(",").map((t) => t.trim())
      : [];

    return rowTopics.some((topic) => selectedTopics.includes(topic));
  })
  .sort(() => Math.random() - 0.5);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="max-w-2xl w-full text-center">
        <QuizClient
          questions={filteredQuestions as any}
          initialTimeSeconds={
            Number(params.minutes || 0) * 60 + Number(params.seconds || 0)
          }
          questionCount={Number(params.count || 10)}
        />
      </div>
    </main>
  );
}