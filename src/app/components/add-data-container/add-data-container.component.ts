import { Component } from '@angular/core';
import { Friend } from '../../types/friend';
import { Trait } from '../../types/trait';

@Component({
  selector: 'app-add-data-container',
  templateUrl: './add-data-container.component.html',
  styleUrl: './add-data-container.component.css',
})
export class AddDataContainerComponent {
  friends: Array<Friend> = [];
  traits: Array<Trait> = [];

  displayedColumns: string[] = [
    'name',
    ...this.traits.map((trait) => trait.name),
    'sum',
    'actions',
  ];

  addTrait(trait: Trait) {
    this.traits.push({
      name: trait.name,
      weight: trait.weight,
      isNoGo: trait.isNoGo,
    });

    this.friends.forEach((friend) => {
      if (trait.isNoGo) {
        friend[trait.name] = false;
      } else {
        friend[trait.name] = 0;
      }
    });
    this.traits = [...this.traits];
  }

  addFriend(friendName: string) {
    if (this.friends.find((friend) => friend.name === friendName)) {
      return;
    }
    console.log(friendName);
    let friend: { name: string; [key: string]: any } = { name: friendName };

    this.traits.forEach((trait) => {
      friend[trait.name] = 0;
    });

    this.friends.push(friend);
    this.friends = [...this.friends];
  }

  removeFriend(name: string) {
    this.friends = this.friends.filter((friend) => friend.name !== name);
  }

  removeTrait(name: string) {
    // Remove the trait from the traits array
    this.traits = this.traits.filter((trait) => trait.name !== name);

    // Remove the trait from each friend
    this.friends.forEach((friend) => {
      delete friend[name];
    });
  }

  onFileChange(loadedData: any) {
    this.friends = loadedData.friends;
    this.traits = loadedData.traits;
  }
}
