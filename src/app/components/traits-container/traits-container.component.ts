import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trait } from '../../trait';

@Component({
  selector: 'app-traits-container',
  templateUrl: './traits-container.component.html',
  styleUrl: './traits-container.component.css',
})
export class TraitsContainerComponent {
  traitNameToAdd =  "";
  traitWeightToAdd = 0;

  @Input() traits: Array<Trait> = [];

  @Output() traitAdded: EventEmitter<Trait> = new EventEmitter();
  @Output() traitDeleted: EventEmitter<string> = new EventEmitter();

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
      weight: this.traitWeightToAdd,
    });

    this.resetInputs();
  }

  private resetInputs() {
    this.traitNameToAdd = "";
    this.traitWeightToAdd = 0;
  }
}
