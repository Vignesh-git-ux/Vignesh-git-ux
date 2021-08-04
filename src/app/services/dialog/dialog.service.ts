import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

    dialogRef !: MatDialogRef<any, any>;

    constructor(public dialog: MatDialog) { }

    openDialog(componet : any, dataTran : any, callBack : Function ) : void {

      this.dialogRef = this.dialog.open(componet, {
        width: '500px',
        data: dataTran,
        disableClose: true 
      });
  
      this.dialogRef.afterClosed().subscribe(result => {
        callBack(result);
      });
    }

    closeDialog(data : any) : void {
      this.dialogRef.close(data);
    }
}
