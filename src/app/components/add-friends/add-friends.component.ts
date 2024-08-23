import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Friend } from '../../types/friend';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrl: './add-friends.component.css',
})
export class AddFriendsComponent {
  
  constructor(private dataService:DataService){

  }

  name = '';

  addFriend() {
    const friend: Friend = {
      name: this.name
    }

    this.dataService.addFriend(friend)
  }
}
