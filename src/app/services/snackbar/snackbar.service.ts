import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

    constructor(private snackBar : MatSnackBar) { }

    openSnackBar(component : any, message : string) {

        this.snackBar.openFromComponent(component, {
            duration: undefined,
            verticalPosition: "top", 
            horizontalPosition : "right",
            panelClass : "customsnackbar",
            data : message
        });
    }

    openSuccessSnackBar(component : any, message : string) {

        this.snackBar.openFromComponent(component, {
            duration: undefined,
            verticalPosition: "top", 
            horizontalPosition : "right",
            panelClass : "successSnackbar",
            data : message
        });
    }

    closeSnackBar() : void {
        this.snackBar.dismiss();
    }
}
