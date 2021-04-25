import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment, SharedModule } from '@pma/shared';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './ui/containers/login/login.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './data/store';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './data/store/effects/auth.effects';
export function firebaseAppNameFactory() {
  return `goc`;
}
export const routes: Route[] = [
  {
    path: '',
    component: LoginComponent,
  }
];
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatMenuModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxAuthFirebaseUIModule.forRoot(
      environment.firebase,
      firebaseAppNameFactory,
      {
        enableFirestoreSync: true,
        authGuardFallbackURL: '/login',
        toastMessageOnAuthSuccess: false,
        toastMessageOnAuthError: true,
      }
    ),

    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[AngularFireAuth],
  declarations: [AppComponent, LoginComponent],
  exports: [AppComponent, LoginComponent],
})
export class AuthModule {}
