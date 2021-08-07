import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['../../../../node_modules/material-design-icons/iconfont/material-icons.css','./error.component.scss']
})
export class ErrorComponent implements OnInit {

    message !: string;
    constructor(private snackbarService : SnackbarService, 
        @Inject(MAT_SNACK_BAR_DATA) public data: any) { 
          this.message = data;
    }

    ngOnInit(): void {
    }

    closeSnackBar() : void {
        this.snackbarService.closeSnackBar();
    }
}
