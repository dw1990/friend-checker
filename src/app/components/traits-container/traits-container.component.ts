import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trait } from '../../types/trait';
import { DataService } from '../../services/data.service';


interface Impact{
  displayText: string,
  value: number
}

@Component({
  selector: 'app-traits-container',
  templateUrl: './traits-container.component.html',
  styleUrl: './traits-container.component.css',
})
export class TraitsContainerComponent implements OnInit{

  traitNameToAdd =  "";
  selectedImpact: number = 0;
  isNoGo: boolean = false;

  traits: Array<Trait> = [];

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

  constructor(private dataService: DataService){}
  
  ngOnInit(): void {
    this.dataService.getTraits$().subscribe((traits) => {this.traits = traits})
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

  removeTrait(traitName: string) {
    this.dataService.removeTrait(traitName)
  }

  addTrait() {    
    this.dataService.addTrait({
      name: this.traitNameToAdd,
      weight: this.selectedImpact,
      isNoGo: this.isNoGo
    })

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
