import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error/error.component';
import { AgentGroupData, AgentGroupresponse } from 'src/app/models/agentGroup';
import { GroupResponse } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group/group.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
    selector: 'app-creategroup',
    templateUrl: './creategroup.component.html',
    styleUrls: ['../../../../../node_modules/material-design-icons/iconfont/material-icons.css', './creategroup.component.scss']
})


export class CreategroupComponent {

    displayedColumns: string[] = ['Status', 'GRPID', 'VerNum', 'CreatedBy', 'ModifiedBy', 'CreDteTime', 'ModifiedTime', 'initBtn'];
    dataSource = new MatTableDataSource<AgentGroupData>();
    grpFilter = new FormControl('');
    filterValues = {filter : ''};

    @ViewChild(MatTable) table !: MatTable<any>;
    
    selectedGroup !: AgentGroupData;
    errorMessage !: string;
    param !: string;

    constructor(private groupService : GroupService, private route: ActivatedRoute, 
        private router: Router, private snackbarService : SnackbarService) { 
        
        this.route.params.subscribe(params => {
            this.param = params['dispOption'];
            this.grpFilter.setValue("");
            this.getGroups();
        });
        
        this.grpFilter.valueChanges.subscribe(search => {
            this.filterValues.filter = search;
            this.dataSource.filter = JSON.stringify(this.filterValues);
        });
    }

    getGroups() : void {
        this.groupService.getAgentGroup(this.param, this.callBackAgtGroup.bind(this));
    }


    createNewGroup() : void {
        this.errorMessage="";
        this.groupService.createNewGroup(this.callBackGroup.bind(this));
    }

    dispGroup(row:AgentGroupData) : void {
        this.errorMessage="";
        this.router.navigate(["/scmlanding/dispgrp", {"GRPID" : row.getGRPID(), "VerNum"  : row.VerNum}]);
    }

    initGroup(row:AgentGroupData) : void {
        this.groupService.initGroup(row, this.callBackGroup.bind(this));
    }

  
    callBackAgtGroup(group:AgentGroupresponse): void {

     //   this.snackbarService.closeSnackBar();
        if (group.Header.ResponseText != "SUCCESS") {
            this.snackbarService.openSnackBar(ErrorComponent, group.Header.ResponseText);
            return;
        }
        if (group.Data && group.Data.length > 0) {
            this.dataSource.data = this.sortArray(group);
            this.dataSource.filterPredicate = this.createFilter();
        }  else {
            this.snackbarService.openSnackBar(ErrorComponent, "No Groups created.");
            return;
        }
    }

    sortArray(group:AgentGroupresponse) : AgentGroupData[] {
    
        return group.Data.sort((n1,n2) => {
          return n2.getGRPID().localeCompare(n1.getGRPID());
       });
    }
  
    createFilter(): (data: any, filter: string) => boolean {
      
        let filterFunction = function(data : AgentGroupData, filter : any): boolean {
            let searchTerms = JSON.parse(filter);
            let grpId = data.getGRPID() && data.getGRPID().toLowerCase();
            let ver = data.VerNum && data.VerNum.toLowerCase();
            let createAgnt = data.CreAgntID && data.CreAgntID.toLowerCase();
            let modifyAgent = (data.ModAgntID && data.ModAgntID.toLowerCase()) || "";
            let searchTerm = (searchTerms.filter as string).toLowerCase();
            return grpId.indexOf(searchTerm) !== -1
            || ver.indexOf(searchTerm) !== -1
            || createAgnt.indexOf(searchTerm) !== -1
            || modifyAgent.indexOf(searchTerm) !== -1;
        }
        return filterFunction;
    }
  
    callBackGroup(resp:GroupResponse): void {
        
      //  this.snackbarService.closeSnackBar();
        if (resp.ResponseText != "SUCCESS") {
            this.snackbarService.openSnackBar(ErrorComponent, resp.ResponseText);
            return;
        }
        
        this.getGroups();
    }

    selectGroup(row:AgentGroupData) : void{
        
        this.errorMessage="";
        this.selectedGroup = row;
    }
}