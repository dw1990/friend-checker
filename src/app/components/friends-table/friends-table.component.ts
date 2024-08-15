import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Friend } from '../../types/friend';
import { Trait } from '../../types/trait';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-friends-table',
  templateUrl: './friends-table.component.html',
  styleUrl: './friends-table.component.css',
})
export class FriendsTableComponent {
  _friends: Array<Friend> = [];
  _traits: Array<Trait> = [];

  dataSource = new MatTableDataSource(this.friends);

  @Output() friendRemoved: EventEmitter<string> = new EventEmitter();

  @Input() set friends(friends: Array<Friend>) {
    console.log(friends);
    this._friends = friends;
    this.dataSource.data = this._friends;
  }

  @Input() set traits(traits: Array<Trait>) {
    this._traits = traits;
    this.updateDisplayedColumns();
  }

  displayedColumns: string[] = [
    'name',
    ...this._traits.map((trait) => trait.name),
    'sum',
    'actions',
  ];

  updateDisplayedColumns() {
    this.displayedColumns = [
      'name',
      ...this._traits.map((trait) => trait.name),
      'sum',
      'actions',
    ];
  }

  calculateFriendIcon(friend: Friend) {
    if (!friend) {
      return 0;
    }

    if (!this._traits) {
      return '';
    }

    if (this.hasANoGoTrait(friend)) {
      return 'fa-triangle-exclamation';
    }

    const maxScore = this._traits.length * 10 * this.getWeightAvg(); //7 is max weight, 10 max value

    let totalScore = 0;

    this._traits.forEach((trait) => {
      const value = friend[trait.name];
      const weightedValue = value * trait.weight;

      totalScore += weightedValue;
    });

    const friendScore = totalScore / maxScore;

    if (friendScore < 0.3) {
      return 'fa-face-sad-tear';
    }
    if (friendScore < 0.55) {
      return 'fa-face-meh';
    }

    return 'fa-face-smile';
  }

  hasANoGoTrait(friend: Friend): boolean {
    const values = Object.values(friend);

    for (const key in friend) {
      if (friend.hasOwnProperty(key)) {
        const value = friend[key];
        if (typeof value == 'boolean' && value === true) {
          return true;
        }
      }
    }

    return false;
  }

  getWeightAvg(): number {
    if (this._traits.length === 0) return 0; // Handle the case where the list is empty

    const total = this._traits.filter(trait => !trait.isNoGo).reduce((sum, trait) => sum + trait.weight, 0);
    const average = total / this._traits.length;

    return average;
  }

  removeFriend(name: string) {
    this.friendRemoved.emit(name);
  }
}
