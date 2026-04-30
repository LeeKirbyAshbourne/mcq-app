import fs from "fs";
import path from "path";
import Papa from "papaparse";
import SetupClient from "./SetupClient";

export default function SetupPage() {
  const filePath = path.join(process.cwd(), "data", "questions.csv");
  const file = fs.readFileSync(filePath, "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = parsed.data as any[];
  console.log(rows.map(r => r["Combined Topics"]));

  const topics = Array.from(
    new Set(
      rows
        .flatMap((row) =>
          String(row["Combined Topics"] || "")
            .split(",")
            .map((topic) => topic.trim())
        )
        .filter(Boolean)
    )
  ).sort();

  return <SetupClient topics={topics} />;
}