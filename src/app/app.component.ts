import { Component } from '@angular/core';

import { Trait } from './trait';
import { Friend } from './friend';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  friends: Array<Friend> = [];
  traits: Array<Trait> = [];

  dataSource = new MatTableDataSource(this.friends);

  traitNameToAdd = '';
  traitWeightToAdd = 0;

  displayedColumns: string[] = [
    'name',
    ...this.traits.map((trait) => trait.name),
    'sum',
    'actions',
  ];

  addTrait() {
    if (this.traits.find((trait) => trait.name === this.traitNameToAdd)) {
      return;
    }

    if (this.traitNameToAdd === '') {
      return;
    }

    this.traits.push({
      name: this.traitNameToAdd,
      weight: this.traitWeightToAdd,
    });

    this.friends.forEach((friend) => (friend[this.traitNameToAdd] = 0));

    this.traitNameToAdd = '';
    this.traitWeightToAdd = 0;

    this.updateDisplayedColumns();
  }

  updateDisplayedColumns() {
    this.displayedColumns = [
      'name',
      ...this.traits.map((trait) => trait.name),
      'sum',
      'actions',
    ];
  }

  addFriend(friendName: string) {
    if (this.friends.find((friend) => friend.name === friendName)) {
      return;
    }

    let friend: { name: string; [key: string]: any } = { name: friendName };

    this.traits.forEach((trait) => {
      friend[trait.name] = 0;
    });

    this.friends.push(friend);
    this.dataSource.data = this.friends;
  }

  removeFriend(name: string) {
    this.friends = this.friends.filter((friend) => friend.name !== name);
    this.dataSource.data = this.friends;
  }

  removeTrait(name: string) {
    // Remove the trait from the traits array
    this.traits = this.traits.filter((trait) => trait.name !== name);

    // Remove the trait from each friend
    this.friends.forEach((friend) => {
      delete friend[name];
    });
    this.dataSource.data = this.friends; // Update the data source
    this.updateDisplayedColumns();
  }

  calculateFriendSum(friend: Friend) {
    if (!friend) {
      return 0;
    }

    let totalScore = 0;

    this.traits.forEach((trait) => {
      const value = friend[trait.name];
      const weightedValue = value * trait.weight;

      totalScore += weightedValue;
    });

    return totalScore;
  }

  onFileChange(loadedData: any) {
    this.friends = loadedData.friends || [];
    this.traits = loadedData.traits || [];
    this.dataSource.data = this.friends;
    this.updateDisplayedColumns();
  }
}
