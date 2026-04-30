import fs from "fs";
import path from "path";
import Papa from "papaparse";
import QuizClient from "./QuizClient";

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{
    minutes?: string;
    seconds?: string;
    count?: string;
  }>;
}) {
  const params = await searchParams;
  const filePath = path.join(process.cwd(), "data", "questions.csv");
  const file = fs.readFileSync(filePath, "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });

  const firstQuestion = parsed.data[0] as any;

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="max-w-2xl w-full text-center">
     
<QuizClient
  questions={parsed.data as any}
  initialTimeSeconds={
 (Number(params.minutes || 0) * 60) +
Number(params.seconds || 0)
  }
  questionCount={Number(params.count || 10)}
/>
    </div>
  </main>
  );
}