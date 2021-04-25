import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "@pma/shared";
import {LoggedInGuard} from 'ngx-auth-firebaseui';


const routes: Routes = [
    {
      path: 'secure',
      // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
      loadChildren: () => import('../../../../libs/pma/secure/src/lib/pma-secure.module').then(m => m.PmaSecureModule),
      canActivate: [LoggedInGuard]
    },
    {
      path: 'login',
      // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
      loadChildren: () => import('../../../../libs/auth/src/lib/auth.module').then(m => m.AuthModule)
    },
    {   
      path: '',
      redirectTo: 'secure',
      pathMatch: 'full'
     }

];


@NgModule({
  imports: [RouterModule.forRoot(environment.production ? routes : routes, {enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
