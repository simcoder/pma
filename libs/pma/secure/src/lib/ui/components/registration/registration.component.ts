import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pma-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  @Input() user: any;
  @Output() activateClick = new EventEmitter<any>();
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      tenantId: ['', Validators.required],
    });
  }

  submit() {
    this.activateClick.emit({form:this.registrationForm, user: this.user});
  }
}
