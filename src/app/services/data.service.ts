import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Friend } from '../types/friend';
import { Trait } from '../types/trait';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private _friends: Friend[] = []
  private _traits: Trait[] = []

  private friends$: BehaviorSubject<Friend[]> = new BehaviorSubject<Friend[]>(this._friends)
  private traits$: BehaviorSubject<Trait[]> = new BehaviorSubject<Trait[]>(this._traits)
  constructor() { }

  getFriends$(): Observable<Friend[]>{
    return this.friends$.asObservable();
  }

  getTraits$(): Observable<Trait[]>{
    return this.traits$.asObservable();
  }

  addFriend(friendName: string): void {
    if (this.friendAlreadyExists(friendName)) {
      return;
    }

    const friend = this.createFriend(friendName);
    this._friends.push(friend);
    this.friends$.next([...this._friends])
  }

  removeFriend(friendName: string): void {
    this._friends = this._friends.filter(friend => friend.name !== friendName)
    this.friends$.next([...this._friends])
  }

  addTrait(trait: Trait): void {
    if(this.traitAlreadyExists(trait.name)){
      return;
    }

    this._traits.push({
      name: trait.name,
      weight: trait.weight,
      isNoGo: trait.isNoGo,
    });

    this.addTraitToFriends(trait)

    this.friends$.next([...this._friends])
    this.traits$.next([...this._traits])
  }


  removeTrait(traitName: string): void {
    this._traits = this._traits.filter(trait => trait.name !== traitName)
    this._friends.forEach((friend) => {
      delete friend[traitName];
    });

    this.friends$.next([...this._friends])
    this.traits$.next([...this._traits])
  }

  private createFriend(friendName: string): Friend{
    let friend: { name: string; [key: string]: any } = { name: friendName };

    this._traits.forEach((trait) => {
      if(trait.isNoGo){
        friend[trait.name] = false;
      }else{
        friend[trait.name] = 0;
      }
    });

    return friend;
  }

  private friendAlreadyExists(friendName: string): boolean{
    return this._friends.find((friend) => friend.name === friendName) !== undefined    
  }

  private traitAlreadyExists(traitName: string): boolean{
    return this._traits.find((trait) => trait.name === traitName) !== undefined
  }

  private addTraitToFriends(trait: Trait): void{
    this._friends.forEach((friend) => {
      if (trait.isNoGo) {
        friend[trait.name] = false;
      } else {
        friend[trait.name] = 0;
      }
    });
  }
  
}