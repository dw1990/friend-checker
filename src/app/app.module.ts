import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddFriendsComponent } from './components/add-friends/add-friends.component';
import { FileFooterComponent } from './components/file-footer/file-footer.component';
import { FriendsTableComponent } from './components/friends-table/friends-table.component';
import { TraitsContainerComponent } from './components/traits-container/traits-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [AppComponent, AddFriendsComponent, FileFooterComponent, FriendsTableComponent, TraitsContainerComponent],
  imports: [
    BrowserModule, 
    CommonModule, 
    MatGridListModule, 
    MatListModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    FormsModule, 
    MatRadioModule,
    MatIconModule,
    MatTableModule, 
    CommonModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
