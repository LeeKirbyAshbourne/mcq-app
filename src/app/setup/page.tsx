import { getQuestionsFromAirtable } from "../lib/airtable";
import fs from "fs";
import path from "path";
import Papa from "papaparse";
import SetupClient from "./SetupClient";


export default async function SetupPage() {
  const filePath = "AIRTABLE";
const file = "";

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });

 const rows = await getQuestionsFromAirtable();
 console.log("FIRST AIRTABLE ROW:", rows[0]);

if (!rows || !Array.isArray(rows)) {
  return <SetupClient topics={[]} />;
}

const topics = Array.from(
  new Set(
    rows
  .flatMap((row) => {
    const value = row["Combined Topics"];

    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "string") {
      return value.split(",").map((t) => t.trim());
    }

    return [];
  })
  .filter(Boolean)
  )
).sort();

  return <SetupClient topics={topics} />;
}