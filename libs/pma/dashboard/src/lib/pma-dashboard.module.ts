import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './ui/containers/home-page/home-page.component';
import { PaymentComponent } from './ui/components/payment/payment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dashboardReducer } from './data/store/reducers/dashboard.reducer';
import { AngularFirestore } from '@angular/fire/firestore';
import { DashboardEffects } from './data/store/effects/dashboar.effects';

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
    MatButtonModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects])
  ],
  declarations: [
    PaymentComponent,
    HomePageComponent
  ],
  exports: [
    PaymentComponent,
    HomePageComponent
  ],
  providers: [AngularFirestore]
})
export class PmaDashboardModule {}
