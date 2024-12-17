export default function csvLoader(divRef: React.MutableRefObject<null>) {
  const table = divRef.current
    ? (divRef.current as HTMLElement).querySelector("table")
    : null;
  if (!table) {
    console.error("No table found in the content");
    return;
  }

  let csv = [];
  const rows = table.querySelectorAll("tr");
  for (const row of rows) {
    const cols = row.querySelectorAll("td, th");
    const rowData = [];
    for (const col of cols) {
      let cellText = (col as HTMLElement).innerText;
      // Escape any double quotes in the data by replacing them with two double quotes
      cellText = cellText.replace(/"/g, '""');
      // Enclose the data in double quotes to handle commas within values
      rowData.push(`"${cellText}"`);
    }
    csv.push(rowData.join(","));
  }

  const csvContent = "data:text/csv;charset=utf-8," + csv.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "table.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
