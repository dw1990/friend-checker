import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Trait } from './trait';
import { Friend } from './friend';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatGridListModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatIconModule, MatTableModule, CommonModule],  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  friends:Array<Friend> = []
  traits: Array<Trait> = []

  dataSource = new MatTableDataSource(this.friends);

  traitNameToAdd = ""
  traitWeightToAdd = 0
  friendNameToAdd = ""

  displayedColumns: string[] = ['name', ...this.traits.map(trait => trait.name),  'sum', 'actions'];

  addTrait(){
    if(this.traits.find(trait => trait.name === this.traitNameToAdd)){
      return;
    }

    if(this.traitNameToAdd === ""){
      return;
    }

    this.traits.push({
      name: this.traitNameToAdd,
      weight: this.traitWeightToAdd
    })

    this.friends.forEach(friend => friend[this.traitNameToAdd] = 0)

    this.traitNameToAdd = ""
    this.traitWeightToAdd = 0

    this.updateDisplayedColumns();
  }

  updateDisplayedColumns() {
    this.displayedColumns = ['name', ...this.traits.map((trait) => trait.name), 'sum','actions'];
  }

  addFriend(){
    if(this.friends.find(friend => friend.name === this.friendNameToAdd)){
      return;
    }

    let friend: {name: string, [key: string]: any} = {name:this.friendNameToAdd};
    
    this.traits.forEach(trait => {
      friend[trait.name] = 0;
    });

    this.friends.push(friend);
    this.dataSource.data = this.friends

    this.friendNameToAdd = "";
  }

  removeFriend(name: string) {
    this.friends = this.friends.filter(friend => friend.name !== name);
    this.dataSource.data = this.friends;
  }
  

  removeTrait(name: string) {
    // Remove the trait from the traits array
    this.traits = this.traits.filter(trait => trait.name !== name);
  
    // Remove the trait from each friend
    this.friends.forEach(friend => {
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

  
    this.traits.forEach(trait => {
      const value = friend[trait.name];
      const weightedValue = value * trait.weight;

      totalScore += weightedValue;
    });

    return totalScore;
  }

  downloadJson() {
    const data = {
      friends: this.friends,
      traits: this.traits
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'friends_traits.json';
    a.click();
    window.URL.revokeObjectURL(url); // Clean up
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const jsonData = JSON.parse(e.target.result);
        this.friends = jsonData.friends || [];
        this.traits = jsonData.traits || [];
        this.dataSource.data = this.friends;
        this.updateDisplayedColumns();
      };
      reader.readAsText(file);
    }
  }
  
}
