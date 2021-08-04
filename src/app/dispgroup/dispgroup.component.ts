import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayGroupresponse } from '../models/displayGroup';
import { Group } from '../models/group';
import { GroupService } from '../services/group/group.service';

@Component({
  selector: 'app-dispgroup',
  templateUrl: './dispgroup.component.html',
  styleUrls: ['./dispgroup.component.scss']
})
export class DispgroupComponent implements OnInit {

  group !: DisplayGroupresponse;
  // displayedColumns: string[] = ['GRPID', 'VerNum', 'TransactionType', 'AgentID', 'initBtn'];
  // dataSource = new Array<DisplayGroupresponse>();
  // @ViewChild(MatTable) table !: MatTable<any>;
  
  
  constructor(private route: ActivatedRoute, private router: Router, private groupService : GroupService  ) {
    this.route.params.subscribe(params => this.dispGroup(params["GRPID"], params["VerNum"]));
  }

  ngOnInit(): void {
    
  }

  dispGroup(grpId : string, verNum : string):void {
    let group1 = new Group("DISPGRP",verNum, grpId,"");
    this.groupService.sendPostRequest(group1, this.callBackGroup.bind(this));
  }

  callBackGroup(group:DisplayGroupresponse) {
    this.group = group;
    // this.dataSource.push(this.group);
    // this.table.renderRows();
  }

}


