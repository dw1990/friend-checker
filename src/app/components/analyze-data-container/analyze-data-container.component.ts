import { Component, Input } from '@angular/core';
import { Friend } from '../../friend';
import { Trait } from '../../trait';

@Component({
  selector: 'app-analyze-data-container',
  templateUrl: './analyze-data-container.component.html',
  styleUrl: './analyze-data-container.component.css'
})
export class AnalyzeDataContainerComponent {

@Input() friends: Array<Friend> = [];
@Input() traits: Array<Trait> = [];

}
