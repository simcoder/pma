import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pma-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @Input() amountDue = 0;
  @Output() paymentClick = new EventEmitter<any>();
  @Output() maintenanceClick = new EventEmitter<any>();


}
