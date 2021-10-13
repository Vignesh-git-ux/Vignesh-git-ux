import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { DisplayScheduleData, DisplayScheduleResponse } from '../models/displaySchedul';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Console } from 'console';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MenuService } from '../services/menus/menu.service';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { ErrorComponent } from '../error/error/error.component';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.scss'],
  providers: [DatePipe]
})
export class AirlineDetailsComponent implements OnInit {

  flightForm!: FormGroup;
  segmentForm!: FormGroup;
  i = 0;
  airlineDeiInfo!: any;
  updatedDEIInformation: any = [];
  showBox = true;
  schedule !: DisplayScheduleResponse;
  scheduleData !: DisplayScheduleData;
  FltNum: any = '';
  dropdownList: any = [];
  selectedItems: any = [];
  active = 1;
  clipboard = '';
  dropdownData = [];
  DEITableData: any = [];
  DEITableText: any = [];
  count = 0;
  deletedRowCount = 0;
  addRowCount = 0;
  searchBarData = {
    id: '',
    key: '',
    DEI: '',
    DEIText: ''
  }
  tablearray: any = []
  datacount: number = 0;
  DEIData: any = {
    id: '',
    key: '',
    DEI: '',
    DEIText: ''
  }
  showEditTable: boolean = false
  EditRowId: any = '';
  dropdownSettings!: IDropdownSettings;
  deiText: string = '';
  updatedData: string = '';

  model!: NgbDateStruct;
  date!: { year: number; month: number; };
  message: any;

  isDisabled = true;
  isAdd = true;

  constructor(public formBuilder: FormBuilder, private scheduleService: ScheduleService,
    private calendar: NgbCalendar, private menuService: MenuService,
    private snackbarService: SnackbarService,
    private datePipe: DatePipe
  ) {

    // this.message = data;
  }
  ngOnInit(): void {
    this.isAdd = this.scheduleService.isAddSchedule;
    this.isDisabled = !this.isAdd;
    this.flightForm = this.formBuilder.group({
      PSCAction: [{ value: '', disabled: this.isDisabled }],
      AirlineCC: [{ value: '', disabled: this.isDisabled }],
      FltNum: [{ value: '', disabled: this.isDisabled }],
      DepartureCity: [{ value: '', disabled: this.isDisabled }],
      SchEffDate: [{ value: '', disabled: this.isDisabled }],
      SchDisDate: [{ value: '', disabled: this.isDisabled }],
      SchFrequency: [{ value: '', disabled: this.isDisabled }],
      ArrivalCity: [{ value: '', disabled: this.isDisabled }]
    })

    this.segmentForm = this.formBuilder.group({
      TimeMode: [''],
      AircraftSTA: [''],
      PaxSTA: [''],
      DepTerminal: [''],
      ArrTerminal: [''],
      AircraftConfig: [''],
      AircraftType: [''],
      FreqRate: [''],
      AircraftSTD: [''],
      PaxSTD: [''],
      deptimevarfromutc: [''],
      arrtimevarfromutc: [''],
      InFltAdj: [''],
      EqpSerType: ['']
    })
    if (!this.scheduleService.IsAddSchedule) {
      this.mapFormData(this.scheduleService.airlineScheduleData)
    }

    this.airlineDeiInfo = (this.scheduleService.airlineDeiInfo.Data)
    this.constructSearchBarData()
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      limitSelection: 1,
      allowSearchFilter: true
    };
    if (!this.isAdd) {
      this.setDEIInfotoTable(this.scheduleService.airlineScheduleData.DEIInformation)
    }
  }
  //ngOninit End



  Edit(value: any, i: any) {
    setTimeout(() => {
      this.showBox = true;
      this.EditRowId = (i).toString()
      if (value > this.EditRowId) {
        this.EditRowId = (value)
      }
    }, 100);
  }

  copyToClip($event: Event) {
    this.copyMessage(this.clipboard)
  }
  getControl() {
    return this.flightForm.controls;
  }

  async constructSearchBarData() {
    for (var key in this.airlineDeiInfo) {
      if (this.airlineDeiInfo.hasOwnProperty(key)) {
        var val = this.airlineDeiInfo[key];
        val = val.replace('-', '').trim()
        this.searchBarData = {
          id: this.count.toString(),
          key: key,
          DEI: key + '-' + val,
          DEIText: ''
        }
        this.dropdownList.push(this.searchBarData.DEI)
      }
      this.count++
    }
    return this.searchBarData;
  }

  onClickedOutside(e: any) {
    this.showBox = false;
    this.EditRowId = e
  }

  onEnterUpdatedData(value: any, i: any) {
    this.showBox = false;
    this.EditRowId = i
    if (value > this.EditRowId) {
      this.EditRowId = parseInt(value)
    }

    this.DEITableData.map((rowData: any) => {
      if (rowData.id == this.EditRowId) {
        rowData.DEIText = this.updatedData
      }
    })
    this.updatedData = ''
  }

  resetForm() {
    this.flightForm.reset()
    this.segmentForm.reset();
    this.menuService.displayMenu("true");
    window.history.back();
    this.scheduleService.IsAddSchedule = false;
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

  mapFormData(apiData: any) {
    // console.log('apiData',apiData)
    let SchEffDate = moment(apiData.SchDisDate).format('yyyy-MM-DD');
    let SchDisDate = moment(apiData.SchDisDate).format('yyyy-MM-DD');
    apiData.SchEffDate = this.datePipe.transform(SchEffDate, 'yyyy-MM-dd');
    apiData.SchDisDate = this.datePipe.transform(SchDisDate, 'yyyy-MM-dd');
    console.log(apiData.SchEffDate);
    this.flightForm.setValue({
      PSCAction: (typeof (apiData.PSCAction) == "undefined" ? '' : apiData.PSCAction),
      AirlineCC: (typeof (apiData.AirlineCC) == "undefined" ? '' : apiData.AirlineCC),
      FltNum: (typeof (apiData.FltNum) == "undefined" ? '' : apiData.FltNum),
      SchEffDate: (typeof (apiData.SchEffDate) == "undefined" ? '' : apiData.SchEffDate),
      SchDisDate: (typeof (apiData.SchDisDate) == "undefined" ? '' : apiData.SchDisDate),
      SchFrequency: (typeof (apiData.SchFrequency) == "undefined" ? '' : apiData.SchFrequency),
      DepartureCity: (typeof (apiData.DepartureCity) == "undefined" ? '' : apiData.DepartureCity),
      ArrivalCity: (typeof (apiData.ArrivalCity) == "undefined" ? '' : apiData.ArrivalCity)
    });

    this.segmentForm.setValue({
      TimeMode: (typeof (apiData.TimeMode) == "undefined" ? '' : apiData.TimeMode),
      AircraftSTA: (typeof (apiData.AircraftSTA) == "undefined" ? '' : apiData.AircraftSTA),
      PaxSTA: (typeof (apiData.PaxSTA) == "undefined" ? '' : apiData.PaxSTA),
      DepTerminal: (typeof (apiData.DepTerminal) == "undefined" ? '' : apiData.DepTerminal),
      ArrTerminal: (typeof (apiData.ArrTerminal) == "undefined" ? '' : apiData.ArrTerminal),
      AircraftConfig: (typeof (apiData.AircraftConfig) == "undefined" ? '' : apiData.AircraftConfig),
      AircraftType: (typeof (apiData.AircraftType) == "undefined" ? '' : apiData.AircraftType),
      FreqRate: (typeof (apiData.FreqRate) == "undefined" ? '' : apiData.FreqRate),
      AircraftSTD: (typeof (apiData.AircraftSTD) == "undefined" ? '' : apiData.AircraftSTD),
      PaxSTD: (typeof (apiData.PaxSTD) == "undefined" ? '' : apiData.PaxSTD),
      deptimevarfromutc: (typeof (apiData.deptimevarfromutc) == "undefined" ? '' : apiData.deptimevarfromutc),
      arrtimevarfromutc: (typeof (apiData.arrtimevarfromutc) == "undefined" ? '' : apiData.arrtimevarfromutc),
      InFltAdj: (typeof (apiData.InFltAdj) == "undefined" ? '' : apiData.InFltAdj),
      EqpSerType: (typeof (apiData.EqpSerType) == "undefined" ? '' : apiData.EqpSerType)
    });

  }

  onItemSelect(item: any) {
    console.log(item, 'this.selectedItems')
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  tablerowcount: any = 0;
  addDEITextToTable() {

    this.tablerowcount = this.DEITableData.map((ele: any) => {
      return ele.id
    })
    this.tablerowcount = parseInt(this.tablerowcount[this.tablerowcount.length - 1]) + 1;
    if (isNaN(this.tablerowcount)) {
      console.log('Yes', isNaN(this.tablerowcount))
      this.tablerowcount = 0;
    }
    else {
      console.log('No', isNaN(this.tablerowcount))
    }
    this.selectedItems.map((selected: any) => {
      let value = selected
      let key = selected.split('-')[0].trim();
      this.DEIData = {
        id: this.tablerowcount.toString(),
        key: key,
        DEI: value,
        DEIText: this.deiText
      }
      this.DEITableData.push(this.DEIData)
      this.DEIData = {}
      selected = ''
      this.tablerowcount++
    })

    if (this.deletedRowCount != 0) {
      this.deletedRowCount = this.deletedRowCount - 1;
    }
    this.deiText = ''
  }


  deleteRowData(selectedItem: any) {
    let filtereddata = this.DEITableData.filter((ele: any) => {
      return (ele.id != selectedItem.id)
    })
    this.DEITableData = filtereddata
    this.deletedRowCount++;
    console.log(this.DEITableData)
    // this.dropdownList = this.DEITableData.map((ele:any)=> ele.DEI)
  }

  onSubmit() {
    this.isAdd ? this.addPsc() : this.dispPSC();
    this.menuService.displayMenu("true");

  }


  addPsc(): void {
    let DEIInformation = {
      DEIInformation: this.DEITableData
    }
    this.flightForm.controls.SchEffDate = this.flightForm.controls.SchEffDate.value.split("-");
    let dataObject = {
      ...this.flightForm.value,
      ...this.segmentForm.value,
      ...DEIInformation
    }

    dataObject.SchEffDate = dataObject.SchEffDate.split("-").join('');
    dataObject.SchDisDate = dataObject.SchEffDate.split("-").join('');
    console.log('dTA', dataObject)

    setTimeout(() => {
      this.scheduleService.dispScheduleAdd(dataObject, this.callBackPSC.bind(this));
    }, 2000);
  }

  dispPSC(): void {
    const pscItemNumber = this.scheduleService.pscItemNumber;
    console.log('pscItemNumber', pscItemNumber)
    let scheduleObj = this.setDataHeadersforMODPSC(this.scheduleService.airlineScheduleData)
    let DEIInformation = {
      DEIInformation: this.DEITableData
    }
    let dataObject = {
      ...this.flightForm.value,
      ...this.segmentForm.value,
      ...DEIInformation,
      ...scheduleObj
    }
    dataObject.SchEffDate = dataObject.SchEffDate.split("-").join('');
    dataObject.SchDisDate = dataObject.SchEffDate.split("-").join('');
    console.log('dTA', dataObject)
    setTimeout(() => {
      this.scheduleService.dispScheduleModify(pscItemNumber, dataObject, this.callBackPSC.bind(this));
    }, 2000);
  }

  callBackPSC(response: any): void {
    this.schedule = response;
    this.message = this.schedule.Header.ResponseText;
    if (this.message !== "Success") {
      if (response.Data) {
        this.message = this.message + " " + response.Data[0].ResponseText;
      }
      this.snackbarService.openSnackBar(ErrorComponent, this.message);
    }
    else {
      this.snackbarService.openSuccessSnackBar(ErrorComponent, this.message);
    }
    window.history.back();
  }


  setDEIInfotoTable(rowData: any) {
    if (Array.isArray(rowData)) {
      let rowCount = 0;
      rowData.map((ele: any) => {
        this.DEIData = {
          id: rowCount.toString(),
          key: ele.DEI.split('-')[0].trim(),
          DEI: ele.DEI.trim(),
          DEIText: ele.DEIText.trim()
        }
        this.DEITableData.push(this.DEIData)
        rowCount++;
      })
    }
  }



  setDataHeadersforMODPSC(scheduleData: any) {

    let extraObj = {
      CreAgntAirport: scheduleData.CreAgntAirport,
      CreAgntDuty: scheduleData.CreAgntDuty,
      CreAgntID: scheduleData.CreAgntID,
      CreAgntSine: scheduleData.CreAgntSine,
      CreDteTime: scheduleData.CreDteTime,
      GSI1PK: scheduleData.GSI1PK,
      GSI1SK: scheduleData.GSI1SK,
      LSI1SK: scheduleData.LSI1SK,
      ModAgntAirport: scheduleData.ModAgntAirport,
      ModAgntDuty: scheduleData.ModAgntDuty,
      ModAgntID: scheduleData.ModAgntID,
      ModAgntSine: scheduleData.ModAgntSine,
      ModDteTime: scheduleData.ModDteTime,
      PK: scheduleData.PK,
      SK: scheduleData.SK,
      PRBD: scheduleData.PRBD
    }
    return extraObj
  }

  // closeSnackBar(): void {
  //   this.snackbarService.closeSnackBar();
  // }

  ngOnDestroy() {
    this.scheduleService.IsAddSchedule = false;
  }
}