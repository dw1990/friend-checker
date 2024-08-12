import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Friend } from '../../friend';
import { Trait } from '../../trait';
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
    console.log(friends)
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

  calculateFriendSum(friend: Friend) {
    if (!friend) {
      return 0;
    }

    let totalScore = 0;

    this._traits.forEach((trait) => {
      const value = friend[trait.name];
      const weightedValue = value * trait.weight;

      totalScore += weightedValue;
    });

    return totalScore;
  }

  removeFriend(name: string) {
    this.friendRemoved.emit(name);
  }
}
