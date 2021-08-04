import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DialogRole } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
// import { threadId } from 'node:worker_threads';
import { ErrorComponent } from 'src/app/error/error/error.component';
import { DisplayScheduleData, DisplayScheduleResponse } from 'src/app/models/displaySchedul';
import { DeleteSchRequest, DelSchHeader } from 'src/app/models/schedule';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { DisplayGroupresponse, PSCItem } from '../../../models/displayGroup';
import { GroupService } from '../../../services/group/group.service';
import { ConfirmDeletePSCComponent } from '../../schedule/confirm-delete-psc/confirm-delete-psc.component';

@Component({
  selector: 'app-dispgroup',
  templateUrl: './dispgroup.component.html',
  styleUrls: ['../../../../../node_modules/material-design-icons/iconfont/material-icons.css', './dispgroup.component.scss']
})
export class DispgroupComponent {

    groupId !: string;
    version !: string;
    deleteMode = false;
    group = new DisplayGroupresponse();

    displayedColumns: string[] = ['chkBox', 'Flight', 'Date', 'Origin', 'Des', 'Act', 'DteDis', 'edit', 'delete', 'copy'];
    dataSource = new MatTableDataSource<PSCItem>();
    @ViewChild(MatTable) table !: MatTable<any>;
    
    grpFilter = new FormControl('');
    filterValues = {filter : ''};
    
    constructor(private route: ActivatedRoute, private router: Router, 
        private groupService : GroupService, private scheduleService : ScheduleService,
        private snackbarService : SnackbarService, private dialogService : DialogService) {
      
        this.route.params.subscribe(params => {
            
            this.grpFilter.setValue("");
            this.groupId = params["GRPID"];
            this.version = params["VerNum"];
            this.dispGroup( );
        });

        this.grpFilter.valueChanges.subscribe(search => {
            this.filterValues.filter = search;
            this.dataSource.filter = JSON.stringify(this.filterValues);
        });
    }

    createFilter(): (data: any, filter: string) => boolean {
      
        let filterFunction = function(data : PSCItem, filter : any): boolean {
           
            let searchTerms = JSON.parse(filter);
            let grpId = data.getCarrierCode() && data.getCarrierCode().toLowerCase();
            let flightNo = data.getFlightNo() && data.getFlightNo().toLowerCase();
            let origin = data.getOrigin() && data.getOrigin().toLowerCase();
            let destination = data.getDestination() && data.getDestination().toLowerCase();
            let action = data.getAction() && data.getAction().toLowerCase();
            let searchTerm = (searchTerms.filter as string).toLowerCase();
            let effDate = data.getEffectiveDate() && data.getEffectiveDate().toLowerCase();
            let disDate = data.getDateDiscontinue() && data.getDateDiscontinue().toLowerCase();
            
            return grpId.indexOf(searchTerm) !== -1
                || flightNo.indexOf(searchTerm) !== -1
                || origin.indexOf(searchTerm) !== -1
                || destination.indexOf(searchTerm) !== -1
                || action.indexOf(searchTerm) !== -1
                || effDate.indexOf(searchTerm) !== -1
                || disDate.indexOf(searchTerm) !== -1;
        }

        return filterFunction;
    }

    dispGroup():void {        
        this.groupService.dispGroup(this.groupId, this.version, this.callBackGroup.bind(this));
    }

    callBackGroup(grp : DisplayGroupresponse) {

        if (!this.deleteMode) {
            this.snackbarService.closeSnackBar();
        }
        if (grp.Header.ResponseText != "SUCCESS") {
            this.snackbarService.openSnackBar(ErrorComponent, grp.Header.ResponseText);
            return;
        }

        this.group = grp;
        this.displaySchedules();
    }

    dispPSC(row:PSCItem) : void {
        this.router.navigate(["/scmlanding/disppsc", {"PSCItemNumber" : row.PSCItemNumber, "active": this.group.Data[0].VERStatus}]);
    }

    displaySchedules() : void {
    
        if (!this.deleteMode) {
            this.snackbarService.closeSnackBar();
        }
        if (this.group.Data && this.group.Data.length > 0) {
            
            this.group.Data.forEach(data => {
                
              if (data.PSCItems && data.PSCItems.length > 0) {
                    this.dataSource.data = data.PSCItems;
                    this.dataSource.filterPredicate = this.createFilter();
                } else {
                    this.snackbarService.openSnackBar(ErrorComponent, "No Schedules under the group.");
                    return;
                }
            });
        } else {

            this.snackbarService.openSnackBar(ErrorComponent, "No Schedules under the group.");
            return;
        }
    }

    confirmDeletePSC(row : PSCItem) : void {
        this.dialogService.openDialog(ConfirmDeletePSCComponent, row, this.deletePsc.bind(this));
    }

    deletePsc(pSCItem : PSCItem) {
        
        if (pSCItem) {

            let Header = new DelSchHeader("DELPSC", this.version, this.groupId, "0001");
            let data = [{"PSCID" : pSCItem.PSCItemNumber}];
            let req = new DeleteSchRequest(Header, data);            
            this.scheduleService.deletePSC(req, this.callBackDelPSC.bind(this));
        }
    }  
    
    callBackDelPSC(resp : DisplayScheduleResponse) : void  {

        this.snackbarService.closeSnackBar();
        if (resp.Header.ResponseText != "Success") {
            this.snackbarService.openSnackBar(ErrorComponent, resp.Header.ResponseText);
            return;
        } 
        
        this.snackbarService.openSnackBar(ErrorComponent, "Schedule deleted Successfully");
        this.deleteMode = true;
        this.dispGroup();
    }
}


