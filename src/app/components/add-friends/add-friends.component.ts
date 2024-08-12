import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrl: './add-friends.component.css',
})
export class AddFriendsComponent {
  @Output()
  friendAdded: EventEmitter<string> = new EventEmitter<string>();

  name = '';

  addFriend() {
    this.friendAdded.emit(this.name);
    this.name="";
  }
}
