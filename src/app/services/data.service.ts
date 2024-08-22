import { Injectable } from '@angular/core';
import { FriendService } from './friend.service';
import { TraitService } from './trait.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Friend } from '../types/friend';
import { Trait } from '../types/trait';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private friends$: BehaviorSubject<Friend[]> = new BehaviorSubject<Friend[]>([])
  private traits$: BehaviorSubject<Trait[]> = new BehaviorSubject<Trait[]>([])
  constructor(private friendService: FriendService, private traitService: TraitService) { }

  getFriends$(): Observable<Friend[]>{
    return this.friends$.asObservable();
  }

  getTraits$(): Observable<Trait[]>{
    return this.traits$.asObservable();
  }

  addFriend(friend: Friend): void {
    const currentData = this.friends$.value
    this.friends$.next([...currentData, friend])
  }

  addTrait(trait: Trait): void {
    const currentData = this.traits$.value
    this.traits$.next([...currentData, trait])
  }

  removeFriend(friend: Friend): void {
    const updatedFriends = this.friends$.value.filter(friendToFilter => friend !== friendToFilter)
    this.friends$.next(updatedFriends)
  }

  removeTrait(trait: Trait): void {
    const updatedTraits = this.traits$.value.filter(traitToFilter => trait !== traitToFilter)
    this.traits$.next(updatedTraits)
  }

  
}