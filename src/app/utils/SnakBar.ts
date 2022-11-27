import { MatSnackBar } from "@angular/material/snack-bar";

export class SnakBar{

    constructor(private snackBar: MatSnackBar ){
    }

     openSnackBar(message: string) {
        this.snackBar.open(message, undefined, {
            duration: 2000,
            panelClass: ['blue-snackbar']
          });
      }
}