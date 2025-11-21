type historyDatasType = {
  id: number;
  from: string;
  to: string;
  amount: number;
}[];

export const reminder = async () => {
  const historyApiUrl = "http://localhost:8787/api/history";

  const response = await fetch(historyApiUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const historyData = await response.json<historyDatasType>();

  const message = historyData.map((v) => `返金の流れ: ${v.to} -> ${v.from}\n\t金額: ${v.amount}\n`).join("\n");

  return `========================================\n現在残っている返金\n${message}\n========================================`;
};