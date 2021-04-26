import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './pma-secure.routing';
import { StoreModule } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { secureReducer } from './data/store/reducer/secure.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SecureEffects } from './data/store/effects/secure.effects';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AvatarComponent } from './ui/components/avatar/avatar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './ui/components/registration/registration.component';
import { ActivationSubPageComponent } from './ui/containers/activation-sub-page/activation-sub-page.component';
import { AppDashboardGuardService } from './app.guard';
import { authReducer } from '@pma/auth';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    FontAwesomeModule,
    MatListModule,
    MatDividerModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('secure', secureReducer),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([SecureEffects]),
  ],
  declarations: [
    AppComponent,
    AvatarComponent,
    RegistrationComponent,
    ActivationSubPageComponent,
  ],
  exports: [
    AppComponent,
    AvatarComponent,
    RegistrationComponent,
    ActivationSubPageComponent,
  ],
  providers: [AngularFirestore, AppDashboardGuardService],
})
export class PmaSecureModule {}
