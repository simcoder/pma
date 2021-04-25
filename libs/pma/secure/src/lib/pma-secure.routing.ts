import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
