import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'pma-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent {
  @Input() tenantId: string;
  @Output() ticketSubmit = new EventEmitter<any>();

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  maintenanceTickerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private imageCompress: NgxImageCompressService
  ) {
    this.maintenanceTickerForm = this.fb.group({
      type: [''],
      additionalInfo: [''],
      fileSelector: [''],
      pics: [],
      tenantId: [''],
    });
  }

  types: any[] = [
    { value: 'plumbing', viewValue: 'Plumbing' },
    { value: 'electrical', viewValue: 'Electrical' },
    { value: 'hvac', viewValue: 'HVAC' },
    { value: 'other', viewValue: 'Other' },
  ];
  ready = false;
  thumbNails = [];

  compressFile(image) {
    this.imageCompress.compressFile(image, 1, 50, 50).then((result) => {
      this.thumbNails.push(result);
      if (this.thumbNails.length === 3) {
        this.maintenanceTickerForm.controls['fileSelector'].disable();
      }
    });
  }
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
        image.onload = () => {
          this.ready = true;
          this.compressFile(reader.result.toString());
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  submit() {
    this.maintenanceTickerForm.controls['pics'].setValue(this.thumbNails);
    this.maintenanceTickerForm.controls['tenantId'].setValue(this.tenantId);
    this.ticketSubmit.emit(this.maintenanceTickerForm);
  }
}
