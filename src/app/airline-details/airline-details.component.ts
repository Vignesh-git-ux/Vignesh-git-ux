import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { DisplayScheduleData, DisplayScheduleResponse } from '../models/displaySchedul';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Console } from 'console';
import { NgbDateStruct,NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.scss']
})
export class AirlineDetailsComponent implements OnInit {
  
  flightForm!: FormGroup;
  segmentForm!: FormGroup;  
  i=0;
  airlineDeiInfo!:any;
  updatedDEIInformation:any=[];
  showBox = true;
  schedule !: DisplayScheduleResponse;
    scheduleData !: DisplayScheduleData;       
    FltNum:any='';
  dropdownList :any = [];
  selectedItems :any = [];
  active = 1;  
  clipboard='';  
  dropdownData = [];
  DEITableData:any = [];
  DEITableText:any=[];
  count = 0; 
  deletedRowCount = 0;
  addRowCount = 0;
  searchBarData={
    id: '',
    key: '',
    DEI :'',
    DEIText:''
  }
  tablearray: any=[]
  datacount:number=0;
  DEIData:any= {
    id:'',
   key: '',    
   DEI :'',
   DEIText:''
  }
  showEditTable: boolean = false
  EditRowId:any = '';
  dropdownSettings!:IDropdownSettings;
  deiText:string='';
  updatedData:string='';

  model!: NgbDateStruct;
  date!: { year: number; month: number; };
    constructor(public formBuilder: FormBuilder,private scheduleService : ScheduleService,
      private calendar: NgbCalendar) { }

  
  ngOnInit(): void {      
    this.flightForm = this.formBuilder.group({
      PSCAction: [{value: '', disabled: true}],
      AirlineCC: [{value: '', disabled: true}],
      FltNum: [{value: '', disabled: true}],
      DepartureCity: [{value: '', disabled: true}],
      SchEffDate: [{value: '', disabled: true}],
      SchDisDate: [{value: '', disabled: true}],
      SchFrequency: [{value: '', disabled: true}],
      ArrivalCity: [{value: '', disabled: true}]
    })

     this.segmentForm = this.formBuilder.group({
    TimeMode: [''],
    aircraftsta: [''],
    paxsta: [''],
    depterminal: [''],
    arrterminal: [''],
    aircraftconfig: [''],
    aircrafttype: [''],
    FreqRate: [''],
    aircraftstd: [''],
    paxstd: [''],
    deptimevarfromutc: [''],
    arrtimevarfromutc: [''],
    inflightadj: [''],
    eqpsertype: ['']
      })
    this.mapFormData(this.scheduleService.airlineScheduleData)    
    this.setDEIInfotoTable(this.scheduleService.airlineScheduleData.DEIInformation)       
    this.airlineDeiInfo = (this.scheduleService.airlineDeiInfo.Data)
    this.constructSearchBarData()
  
    this.dropdownSettings = {
      singleSelection: false,  
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      limitSelection:1,
      allowSearchFilter: true
  };                  
  }
  //ngOninit End
  

  
  Edit(value:any,i: any){
    setTimeout(() => {
      this.showBox = true;      
      this.EditRowId = (i).toString()
      if(value>this.EditRowId){
        this.EditRowId = (value)
      }     
    }, 100);
  }      
  
  copyToClip($event:Event){    
    this.copyMessage(this.clipboard)
  }
  getControl(){    
    return this.flightForm.controls;
  }
  
  onSubmit(){             
    this.dispModifyPSC()    
  }
  
  async constructSearchBarData(){                
      for (var key in this.airlineDeiInfo) {
        if (this.airlineDeiInfo.hasOwnProperty(key)) {
        var val = this.airlineDeiInfo[key];    
        val = val.replace('-','').trim()        
         this.searchBarData={
          id: this.count.toString(),
          key: key,
          DEI :key+'-'+val,
          DEIText:''
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

  onEnterUpdatedData(value: any,i: any) {
    this.showBox = false;    
    this.EditRowId = i
      if(value>this.EditRowId){
        this.EditRowId = parseInt(value)
      }    

    this.DEITableData.map((rowData: any)=>{      
      if(rowData.id == this.EditRowId){        
        rowData.DEIText = this.updatedData
      }
    })    
    this.updatedData = ''    
  }

  resetForm(){
    this.flightForm.reset()
    this.segmentForm.reset();
  }
  copyMessage(val: string){
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
  
  mapFormData(apiData:any){      
    console.log('apiData',apiData)
    this.flightForm.setValue({
        PSCAction: (typeof(apiData.PSCAction) == "undefined" ? '' : apiData.PSCAction),       
        AirlineCC:(typeof(apiData.AirlineCC) == "undefined" ? '' : apiData.AirlineCC),
        FltNum:(typeof(apiData.FltNum) == "undefined" ? '' : apiData.FltNum),        
        SchEffDate:(typeof(apiData.SchEffDate) == "undefined" ? '' : apiData.SchEffDate),
        SchDisDate:(typeof(apiData.SchDisDate) == "undefined" ? '' : apiData.SchDisDate),
        SchFrequency:(typeof(apiData.SchFrequency) == "undefined" ? '' : apiData.SchFrequency),    
        DepartureCity:(typeof(apiData.DepartureCity) == "undefined" ? '' : apiData.DepartureCity),       
        ArrivalCity:(typeof(apiData.ArrivalCity) == "undefined" ? '' : apiData.ArrivalCity)                 
      });

      this.segmentForm.setValue({
        TimeMode: (typeof(apiData.TimeMode) == "undefined" ? '' : apiData.TimeMode),
        aircraftsta: (typeof(apiData.aircraftsta) == "undefined" ? '' : apiData.aircraftsta),
        paxsta: (typeof(apiData.paxsta) == "undefined" ? '' : apiData.paxsta),
        depterminal: (typeof(apiData.depterminal) == "undefined" ? '' : apiData.depterminal),
        arrterminal: (typeof(apiData.arrterminal) == "undefined" ? '' : apiData.arrterminal),
        aircraftconfig: (typeof(apiData.aircraftconfig) == "undefined" ? '' : apiData.aircraftconfig),
        aircrafttype: (typeof(apiData.aircrafttype) == "undefined" ? '' : apiData.aircrafttype),
        FreqRate: (typeof(apiData.FreqRate) == "undefined" ? '' : apiData.FreqRate),
        aircraftstd: (typeof(apiData.aircraftstd) == "undefined" ? '' : apiData.aircraftstd),
        paxstd: (typeof(apiData.paxstd) == "undefined" ? '' : apiData.paxstd),
        deptimevarfromutc: (typeof(apiData.deptimevarfromutc) == "undefined" ? '' : apiData.deptimevarfromutc),
        arrtimevarfromutc: (typeof(apiData.arrtimevarfromutc) == "undefined" ? '' : apiData.arrtimevarfromutc),
        inflightadj: (typeof(apiData.inflightadj) == "undefined" ? '' : apiData.inflightadj),
        eqpsertype: (typeof(apiData.eqpsertype) == "undefined" ? '' : apiData.eqpsertype)                       
      });
          
     
  // this.segmentForm = this.formBuilder.group({
  //   TimeMode: [''],
  //   aircraftsta: [''],
  //   paxsta: [''],
  //   depterminal: [''],
  //   arrterminal: [''],
  //   aircraftconfig: [''],
  //   aircrafttype: [''],
  //   FreqRate: [''],
  //   aircraftstd: [''],
  //   paxstd: [''],
  //   deptimevarfromutc: [''],
  //   arrtimevarfromutc: [''],
  //   inflightadj: [''],
  //   eqpsertype: ['']
  //     }) 
    }

    onItemSelect(item: any) {
      console.log(item,'this.selectedItems')      
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }
    tablerowcount:any=0;
    addDEITextToTable(){            
      
      this.tablerowcount = this.DEITableData.map((ele: any)=>{                      
        return ele.id
      })    
      this.tablerowcount = parseInt(this.tablerowcount[this.tablerowcount.length - 1]) + 1;                                                    
            if(isNaN(this.tablerowcount)){
              console.log('Yes',isNaN(this.tablerowcount))
              this.tablerowcount = 0;
            }
            else{
              console.log('No',isNaN(this.tablerowcount))
            }
            this.selectedItems.map((selected: any)=>{                
                    let value = selected
                    let key  = selected.split('-')[0].trim();                                 
                    this.DEIData = {
                     id: this.tablerowcount.toString(),                
                     key: key,
                     DEI : value,
                     DEIText: this.deiText
                     }   
                    this.DEITableData.push(this.DEIData)
                    this.DEIData = {}                  
                  selected=''
                  this.tablerowcount++  
              })           
              
              if(this.deletedRowCount!=0){
                this.deletedRowCount = this.deletedRowCount - 1;
              }
              this.deiText = ''
  }


deleteRowData(selectedItem: any) {  
  let filtereddata = this.DEITableData.filter((ele: any)=>{        
    return (ele.id != selectedItem.id)
  })    
  this.DEITableData = filtereddata 
  this.deletedRowCount++;   
  console.log(this.DEITableData)
  // this.dropdownList = this.DEITableData.map((ele:any)=> ele.DEI)
}
dispModifyPSC() : void {
  const pscItemNumber =  this.scheduleService.pscItemNumber;
  console.log('pscItemNumber',pscItemNumber)
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
  console.log('dTA',dataObject)  
  setTimeout(() => {    
    this.scheduleService.dispScheduleModify(pscItemNumber,dataObject, this.callBackPSC.bind(this));
  }, 2000);
}

  callBackPSC(response : DisplayScheduleResponse) : void {  
      this.schedule = response; 
      // this.scheduleData = response.Data[0][0]; 
      console.log('this.scheduleData',this.schedule)
  }

 
  setDEIInfotoTable(rowData: any){
    let rowCount = 0;
    rowData.map((ele: any)=> {      
      this.DEIData={
        id: rowCount.toString(), 
        key: ele.DEI.split('-')[0].trim(),      
        DEI :ele.DEI.trim(),
        DEIText:ele.DEIText.trim()
        }       
      this.DEITableData.push(this.DEIData) 
      rowCount++;     
    })        
  }



  setDataHeadersforMODPSC(scheduleData:any){
            
    let extraObj = {
      CreAgntAirport: scheduleData.CreAgntAirport,      
      CreAgntDuty: scheduleData.CreAgntDuty,
      CreAgntID: scheduleData.CreAgntID,
      CreAgntSine: scheduleData.CreAgntSine,
      CreDteTime: scheduleData.CreDteTime,
      GSI1PK:  scheduleData.GSI1PK,
      GSI1SK: scheduleData.GSI1SK,
      LSI1SK: scheduleData.LSI1SK,
      ModAgntAirport: scheduleData.ModAgntAirport,
      ModAgntDuty: scheduleData.ModAgntDuty,
      ModAgntID: scheduleData.ModAgntID,
      ModAgntSine: scheduleData.ModAgntSine,
      ModDteTime: scheduleData.ModDteTime,
      PK: scheduleData.PK,
      SK: scheduleData.SK  
    }
    return extraObj  
  }
}