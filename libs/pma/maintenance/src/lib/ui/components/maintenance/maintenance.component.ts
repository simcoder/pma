import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'pma-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {
  @Output() ticketSubmit = new EventEmitter<any>();

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  maintenanceTickerForm: FormGroup;
  constructor(private fb: FormBuilder){
    this.maintenanceTickerForm = this.fb.group({
      type: [""],
      additionalInfo: [""],
      fileSelector: [""],
      pics:[]
    });
  }

  types: any[] = [
    {value: 'plumbing', viewValue: 'Plumbing'},
    {value: 'electrical', viewValue: 'Electrical'},
    {value: 'hvac', viewValue: 'HVAC'},
    {value: 'other', viewValue: 'Other'}
  ];
  ready = false;
  thumbNails=[];
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = 
        () => {
          this.ready=true;
          this.thumbNails.push(reader.result.toString());
          if(this.thumbNails.length === 3){
            this.maintenanceTickerForm.controls["fileSelector"].disable();
          }
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  submit(){
    this.maintenanceTickerForm.controls["pics"].setValue(this.thumbNails);
    this.ticketSubmit.emit(this.maintenanceTickerForm);
  }

}
