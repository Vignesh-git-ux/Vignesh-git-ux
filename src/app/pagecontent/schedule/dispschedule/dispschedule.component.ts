import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayModifyScheduleResponse, DisplayScheduleData, DisplayScheduleResponse } from 'src/app/models/displaySchedul';
import { MenuService } from 'src/app/services/menus/menu.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-dispschedule',
    templateUrl: './dispschedule.component.html',
    styleUrls: ['./dispschedule.component.scss']
})
export class DispscheduleComponent implements OnInit {

    isAdd: Boolean;
    schedule !: DisplayScheduleResponse;
    deiSchedule !: DisplayScheduleResponse;
    scheduleData !: DisplayScheduleData;
    activeGrp !: string;
    flightForm!: FormGroup;
    segmentForm!: FormGroup;
    flightNumber: any = '';
    clipboard: any;
    groupId: any;
    version: any;
    check: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router,
        private scheduleService: ScheduleService, private menuService: MenuService,
        public formBuilder: FormBuilder, public flightform: FormsModule) {
        this.isAdd = this.scheduleService.IsAddSchedule;
        this.menuService.displayMenu("false");
        if (!this.isAdd) {

            this.route.params.subscribe(params => {
                this.activeGrp = params["active"];
                this.dispPSC(params["PSCItemNumber"])
            });
            this.dispDeiInfo()
        }
        else {
            this.route.params.subscribe(params => {
                this.groupId = params["GRPID"];
                this.version = params["VerNum"];
                this.activeGrp = params["active"];
                this.scheduleService.grouppId = this.groupId;
                this.scheduleService.version = this.version;
            });
            this.dispDeiInfo()
        }


    }

    dispPSC(pscItemNumber: string): void {
        this.scheduleService.pscItemNumber = pscItemNumber
        this.scheduleService.dispSchedule(pscItemNumber, this.callBackPSC.bind(this)
        )
    }

    dispDeiInfo(): void {
        this.scheduleService.fetchDeiInfo(this.callBackDeiInfo.bind(this))
    }

    callBackPSC(response: DisplayScheduleResponse) {
        this.schedule = response;
        this.scheduleData = response.Data[0][0];
        this.scheduleService.airlineScheduleData = this.scheduleData;
        this.flightNumber = this.scheduleData.AirlineCC + ' ' + this.scheduleData.FltNum;

    }

    callBackDeiInfo(response: DisplayModifyScheduleResponse): void {
        this.deiSchedule = response;
        this.scheduleService.airlineDeiInfo = this.deiSchedule;
    }

    cancel(): void {
        this.menuService.displayMenu("true");
        window.history.back();
    }

    ngOnInit(): void {
    }

    copyToClip($event: Event) {
        console.log($event)
        this.clipboard = this.schedule.Header.getGRPID()
        console.log(this.clipboard)
        this.copyMessage(this.clipboard)
    }

    copyMessage(val: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.innerText = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    ngOnDestroy() {
        this.scheduleService.IsAddSchedule = false;
    }
}
