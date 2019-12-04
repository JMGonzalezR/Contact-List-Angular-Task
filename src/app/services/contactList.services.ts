import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { Contact } from '../models/contacts.model';
import { uuid } from '../uuid';


@Injectable({ providedIn: 'root' })
export class ContactsService {

    private readonly _contacts = new BehaviorSubject<Contact[]>([{ id: uuid(), name: 'Test', email: 't@twst', phone: '589555555' }]);

    readonly contacts$ = this._contacts.asObservable();

    get contacts(): Contact[] {
        return this._contacts.getValue();
    }

    private set contacts(val: Contact[]) {
        this._contacts.next(val)
    }

    addContact(name: string, email: string, phone: string) {
        this.contacts = [
            ...this.contacts,
            { id: uuid(), name, email, phone }
        ];
    }

    removeContact(id: string) {
        this.contacts = this.contacts.filter(contact => contact.id !== id)
    }

    editContact(id: string, name: string, email: string, phone: string) {
        let contact = this.contacts.find(contact=> contact.id ===id);
        const index = this.contacts.indexOf(contact);
        this.contacts[index] = { id, name, email, phone };
    }

}