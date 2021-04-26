import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomePageComponent } from './ui/containers/home-page/home-page.component';
import { MaintenanceComponent } from './ui/components/maintenance/maintenance.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@pma/shared';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { MaintenanceEffects } from './data/store/effects/maintenance.effects';
import { maintenanceReducer } from './data/store/reducers/maintenance.reducer';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomePageComponent },
    ]),
    StoreModule.forFeature('maintenance', maintenanceReducer),
    EffectsModule.forFeature([MaintenanceEffects]),
  ],
  declarations: [HomePageComponent, MaintenanceComponent],
  exports: [HomePageComponent, MaintenanceComponent],
  providers: [AngularFirestore],
})
export class PmaMaintenanceModule {}
