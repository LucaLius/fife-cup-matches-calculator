import xlsx from 'node-xlsx';
import XLSX, { WorkBook } from 'xlsx';

export function parseXlsx(buffer: Buffer): string[][] {
  // Parse a file

  const workSheetsFromFile = xlsx.parse(buffer);
  const targetWorkSheet = workSheetsFromFile[0];

  const validRows = targetWorkSheet.data.filter(row => row.length > 0);
  const validColumns = validRows.filter(column => column.length > 0);

  return validColumns;
}

export function openXlsxWorkbook(filePath: string): WorkBook {
  const workbook = XLSX.readFile(filePath);
  return workbook;
}
