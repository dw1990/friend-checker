import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Friend } from '../../types/friend';
import { Trait } from '../../types/trait';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-file-footer',
  templateUrl: './file-footer.component.html',
  styleUrl: './file-footer.component.css',
})
export class FileFooterComponent implements OnInit{
  friends: Array<Friend> = [];
  traits: Array<Trait> = [];

  constructor(private dataService: DataService){}
  
  ngOnInit(): void {
    this.dataService.getFriends$().subscribe(friends => this.friends = friends)
    this.dataService.getTraits$().subscribe(traits => this.traits = traits)
  }

  downloadJson() {
    const data = {
      friends: this.friends,
      traits: this.traits,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
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

        this.dataService.setFriends(jsonData.friends || [])
        this.dataService.setTraits(jsonData.traits || [])
      };
      reader.readAsText(file);
    }
  }
}
