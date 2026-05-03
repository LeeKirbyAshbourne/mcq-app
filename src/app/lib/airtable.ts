export async function getQuestionsFromAirtable() {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const apiKey = process.env.AIRTABLE_TOKEN;

  let allRecords: any[] = [];
  let offset = "";

  do {
    const url = `https://api.airtable.com/v0/${baseId}/tbl7JChEOMrBx4wtC${
     offset ? `?offset=${encodeURIComponent(offset)}` : ""
    }`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

const data = await res.json();
console.log("RECORDS THIS PAGE:", data.records?.length, "OFFSET:", data.offset);

    if (!data.records) {
      console.error("Airtable error response:", data);
      return [];
    }

    allRecords = [...allRecords, ...data.records];
    offset = data.offset;
  } while (offset);

  return allRecords.map((r: any) => r.fields);
}