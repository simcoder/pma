import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './ui/containers/shell/shell.component';
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
import { AuthModule } from '@pma/auth';



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
    // MatPagesModule.forRoot(),
    MatIconModule,
    // MatBadgeModule,
    FontAwesomeModule,
    MatListModule,
    MatDividerModule,
    AuthModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: 'dashboard',
            loadChildren: () =>
              import('../../../dashboard/src/lib/pma-dashboard.module').then(
                (m) => m.PmaDashboardModule
              ),
          },
          {
            path: '', pathMatch: 'full', redirectTo: 'dashboard'
          }
        ],
      }
    ])
  ],
  declarations: [ShellComponent],
  exports: [ShellComponent],
})
export class PmaResidentModule {}
