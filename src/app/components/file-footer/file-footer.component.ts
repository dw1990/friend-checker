import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Friend } from '../../friend';
import { Trait } from '../../trait';

@Component({
  selector: 'app-file-footer',
  templateUrl: './file-footer.component.html',
  styleUrl: './file-footer.component.css',
})
export class FileFooterComponent {
  @Input() friends: Array<Friend> = [];
  @Input() traits: Array<Trait> = [];

  @Output() dataLoaded: EventEmitter<{
    friends: Array<Friend>;
    traits: Array<Trait>;
  }> = new EventEmitter();

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
        this.friends = jsonData.friends || [];
        this.traits = jsonData.traits || [];

        this.dataLoaded.emit({friends: this.friends, traits: this.traits})
      };
      reader.readAsText(file);
    }
  }
}
