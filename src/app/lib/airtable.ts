export async function getQuestionsFromAirtable() {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const apiKey = process.env.AIRTABLE_TOKEN;
 console.log("TOKEN LENGTH:", apiKey?.length);
console.log("TOKEN START:", apiKey?.slice(0, 8));
console.log("TOKEN EXISTS:", !!apiKey);
console.log("BASE ID USED:", baseId);

  const url = `https://api.airtable.com/v0/${baseId}/tbl7JChEOMrBx4wtC`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const data = await res.json();

  console.log("AIRTABLE RAW RESPONSE:", data);
console.log("BASE ID USED:", baseId);
console.log("TOKEN EXISTS:", !!apiKey);
if (!data.records) {
  console.error("Airtable error response:", data);
  return [];
}
return data.records?.map((r: any) => r.fields) || [];
}