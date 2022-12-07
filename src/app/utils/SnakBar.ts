import { MatSnackBar } from "@angular/material/snack-bar";

export class SnakBar {

    constructor(private snackBar: MatSnackBar) {
    }

    openSnackBar(message: string, type: string) {
        let cssClass = type == "error" ? 'red-snackbar' : 'green-snackbar';
        this.snackBar.open(message, '', {
            duration: 2000,
            panelClass: [cssClass, 'my-custom-snackbar']
        });
    }
}