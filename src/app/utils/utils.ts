import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
export class Utils {

    static EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    static EXCEL_EXTENSION = '.xlsx';

    constructor() { }

    public static exportAsExcelFile(json: any[], excelFileName: string): void {

        const header = ["الرمز التعريفي للطلب", "SKU", "الكمية", "سعر التكلفة", "سعر البيع", "اجمالي التكلفة", "اجمالي البيع", "تكلفة المنتج على دروبفاي",
            "اجمالي سعر تكلفة المنتجات", "البريد الإلكتروني", "اسم المسوق", "رقم تلفون المسوق", "اسم الزبون", "رقم تلفون الزبون", "الدولة", "المدينة",
            "العنوان التفصيلي", "رابط الشحنة", "حالة الشحنة", "تاريخ شراء الطلب", "تاريخ تسليم الطلب"];

        var templateToExcel: string[][] = [header, json];

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, { skipHeader: true })
        const workbook: XLSX.WorkBook = { Workbook: { Views: [{ RTL: true }] }, Sheets: { 'الطلبات': worksheet }, SheetNames: ['الطلبات'] };
        XLSX.utils.sheet_add_json(worksheet, json);
        this.adjustCellsWidth(worksheet)
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

    static adjustCellsWidth(worksheet: XLSX.WorkSheet) {
        var wds = [{ 'width': 13 }, { 'width': 13 }, { 'width': 10 }, { 'width': 12 }, { 'width': 13 }, { 'width': 14 },
        { 'width': 13 }, { 'width': 15 }, { 'width': 13 }, { 'width': 14 }, { 'width': 16 }, { 'width': 15 },
        { 'width': 15 }, { 'width': 20 }, { 'width': 13 }, { 'width': 10 }, { 'width': 10 }, { 'width': 20 },
        { 'width': 20 }, { 'width': 12 }, { 'width': 12 }, { 'width': 15 }, { 'width': 15 }, { 'width': 15 }];
        worksheet["!cols"] = wds;
    }

    static refreshFterOneSecond() {
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    static getCountryNameArabic(country: string): string {
        if (country == "Jordan")
            return "الأردن";
        else
            return "";
    }
}