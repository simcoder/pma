import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './ui/containers/home-page/home-page.component';
import { PaymentComponent } from './ui/components/payment/payment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent
      }
    ]),
    FontAwesomeModule,
    MatButtonModule
  ],
  declarations: [
    PaymentComponent,
    HomePageComponent
  ],
  exports: [
    PaymentComponent,
    HomePageComponent
  ]
})
export class PmaDashboardModule {}
