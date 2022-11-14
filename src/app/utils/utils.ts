import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
export class Utils {

    static EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    static EXCEL_EXTENSION = '.xlsx';

    constructor() { }

    public static exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }
    
    static saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        fileSaver.saveAs(data, fileName + ' ' + dd + '/' + mm + '/' + yyyy + this.EXCEL_EXTENSION);
    }
}