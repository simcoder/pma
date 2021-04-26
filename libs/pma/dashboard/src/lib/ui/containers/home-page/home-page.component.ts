import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pma-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent  {
  constructor(private router: Router, private route: ActivatedRoute){
    
  }
  onMaintenanceClick(){
    this.router.navigate(["/secure/maintenance"],{relativeTo: this.route})
  }
}
