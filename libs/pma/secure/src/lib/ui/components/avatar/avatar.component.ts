import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pma-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() user: any;
  @Output() signOut = new EventEmitter<any>();
  onSignOut() {
    //do something
  }
}
