import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trait } from '../../trait';


interface Impact{
  displayText: string,
  value: number
}

@Component({
  selector: 'app-traits-container',
  templateUrl: './traits-container.component.html',
  styleUrl: './traits-container.component.css',
})
export class TraitsContainerComponent {
getThumbsIcon(weight: number): string {
  return weight > 0? 'fa-thumbs-up':'fa-thumbs-down';
}

  traitNameToAdd =  "";
  selectedImpact: number = 3;

  @Input() traits: Array<Trait> = [];

  @Output() traitAdded: EventEmitter<Trait> = new EventEmitter();
  @Output() traitDeleted: EventEmitter<string> = new EventEmitter();

  impacts: Array<Impact> = [{
    displayText: 'Schadet mir',
    value: -7
  },
  {
    displayText: 'tut mir nicht gut',
    value: -3
  },
  {
    displayText: 'tut mir gut',
    value: 3
  },
  {
    displayText: 'Hilft mir sehr',
    value: 7
  },]
  colorCssMap = {
    "7": "dark-green",
    "3": "light-green",
    "-3":"light-red",
    "-7":"dark-red"
  }

  getColor(weight: number) {
    if(weight === 3){
      return 'yellow'
    }

    if(weight === 7){
      return 'green'
    }

    if(weight === -3){
      return 'orange'
    }

    if(weight === -7){
      return 'red'
    }

    return "grey"
    }

  removeTrait(name: string) {
    this.traitDeleted.emit(name);
  }

  addTrait() {
    
    if (this.traits.find((trait) => trait.name === this.traitNameToAdd)) {
      return;
    }

    if(this.traitNameToAdd === ""){
      return;
    }

    this.traitAdded.emit({
      name: this.traitNameToAdd,
      weight: this.selectedImpact,
    });

    this.resetInputs();
  }

  private resetInputs() {
    this.traitNameToAdd = "";
    this.selectedImpact = 3;
  }
}
