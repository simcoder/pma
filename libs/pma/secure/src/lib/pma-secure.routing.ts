import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoggedInGuard } from "ngx-auth-firebaseui";
import { AppComponent } from "./app.component";
import { SecureResolver } from "./data/store/secure-resolver";


const routes: Routes = [
    {
      path: '',
      component: AppComponent,
      resolve: {
        sec: SecureResolver
      },
      children: [
        {
          path: 'dashboard',
          loadChildren: () =>
            // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
            import('../../../dashboard/src/lib/pma-dashboard.module').then(
              (m) => m.PmaDashboardModule
            ),
        },
        {
          path: 'maintenance',
          loadChildren: () =>
            // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
            import('../../../maintenance/src/lib/pma-maintenance.module').then(
              (m) => m.PmaMaintenanceModule
            ),
        },
        {
          path: '', pathMatch: 'full', redirectTo: 'dashboard'
        }
      ],
    }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
