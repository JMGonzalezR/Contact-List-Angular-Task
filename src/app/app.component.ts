import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { ContactsService } from './services/contactList.services';
import { MatSelectionList, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('phoneInput') phoneInput: ElementRef;

  @ViewChild(MatSelectionList, { static: true })
  public selectionList: MatSelectionList;

  clearInputs(){
    this.nameInput.nativeElement.value = '';
    this.emailInput.nativeElement.value = '';
    this.phoneInput.nativeElement.value = '';
  }

  ngOnInit() {
    this.selectionList.selectionChange.subscribe((contactSelected: MatSelectionListChange) => {

      if (this.selectionList._value.length >= 1) {
        this.selectionList.deselectAll();
        contactSelected.option.selected = true;
        this.nameInput.nativeElement.value = contactSelected.source._value[0].name;
        this.emailInput.nativeElement.value = contactSelected.source._value[0].email;
        this.phoneInput.nativeElement.value = contactSelected.source._value[0].phone;
        console.log(contactSelected.source._value)
      }
      else {
        this.clearInputs();
      }
    })

  }
  constructor(public contactStore: ContactsService) { }
  onAddContact(name: string, email: string, phone: string) {
    this.contactStore.addContact(name, email, phone);
    this.clearInputs();
  }

  onEditContact(id: string, name: string, email: string, phone: string) {
    this.contactStore.editContact(id, name, email, phone);
    this.selectionList.deselectAll();
    this.clearInputs();

  }

  onDeleteContact(id: string){
    this.selectionList.deselectAll();
    this.contactStore.removeContact(id);
    this.clearInputs();
  }
  title = 'contact-list';
}
