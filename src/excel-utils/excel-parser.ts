import xlsx from 'node-xlsx';

export function parseXlsx(filePath: string): string[][] {
  // Parse a file
  const workSheetsFromFile = xlsx.parse(filePath);
  const targetWorkSheet = workSheetsFromFile[0];

  const validRows = targetWorkSheet.data.filter(row => row.length > 0);
  const validColumns = validRows.filter(column => column.length > 0);

  return validColumns;
}

