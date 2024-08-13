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


  traitNameToAdd =  "";
  selectedImpact: number = 0;
  isNoGo: boolean = false;

  @Input() traits: Array<Trait> = [];

  @Output() traitAdded: EventEmitter<Trait> = new EventEmitter();
  @Output() traitDeleted: EventEmitter<string> = new EventEmitter();

  impacts: Array<Impact> = [{
    displayText: 'Schadet mir',
    value: -7
  },
  {
    displayText: 'Tut mir nicht gut',
    value: -3
  },
  {
    displayText: 'Tut mir gut',
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

  getColor(trait: Trait) {
    if(trait.isNoGo){
      return "red";
    }

    if(trait.weight === 3){
      return 'yellow'
    }

    if(trait.weight === 7){
      return 'green'
    }

    if(trait.weight === -3){
      return 'orange'
    }

    if(trait.weight === -7){
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
      isNoGo: this.isNoGo
    });

    this.resetInputs();
  }

  private resetInputs() {
    this.traitNameToAdd = "";
    this.selectedImpact = 0;
    this.isNoGo = false;
  }

  canAdd(): boolean{
    return this.isNoGo || this.selectedImpact !== 0;
  }

  getIcon(trait: Trait): string {
    if(trait.isNoGo){
      return "fa-triangle-exclamation"
    }
  
    return trait.weight > 0? 'fa-thumbs-up':'fa-thumbs-down';
  }
}
