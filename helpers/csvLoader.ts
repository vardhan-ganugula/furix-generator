export default function csvLoader(table: HTMLDivElement) {
  let csv: string[] = [];
  const rows = table.querySelectorAll("tr");

  rows.forEach((row) => {
    const cols = row.querySelectorAll("td, th");
    const rowData = Array.from(cols).map((col) => `"${(col as HTMLElement).innerText}"`); // Escape inner text
    csv.push(rowData.join(","));
  });

  const res = csv.join("\n");


  const blob = new Blob([res], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "table.csv";
  link.click();
}
