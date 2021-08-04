import { Component, Inject, OnInit } from '@angular/core';
import { DialogRole, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PSCItem } from 'src/app/models/displayGroup';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-confirm-delete-psc',
  templateUrl: './confirm-delete-psc.component.html',
  styleUrls: ['../../../../../node_modules/material-design-icons/iconfont/material-icons.css', './confirm-delete-psc.component.scss']
})
export class ConfirmDeletePSCComponent implements OnInit {

    schedule !: PSCItem;

    constructor(private dialogService : DialogService, 
          @Inject(MAT_DIALOG_DATA) public data: any) { 
            this.schedule = data;
      }

    ngOnInit(): void {
    }

    cancel() : void {
        this.dialogService.closeDialog(undefined);
    }
    delete() : void {
        this.dialogService.closeDialog(this.schedule);
    }
}
