import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Contact} from '../contact-list/contact';
import {ContactService} from '../../services/contacts.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
    model = {} as Contact;
    submitted = false;
    btnName = 'Submit';

    @Output() savedContact = new EventEmitter<Contact>();

    constructor(private contactService: ContactService) {
    }

    ngOnInit(): void {
    }

    createNew(): Contact {
        return {} as Contact;
    }

    onSubmit(contactForm: NgForm): void {
        this.submitted = true;

        this.contactService.postContact(this.model)
            .subscribe(contact => {
                console.log('object saved', contact);
                this.savedContact.emit(contact);

                contactForm.reset();
                this.model = this.createNew();
                this.submitted = false;
            });

        console.log('submitted');
    }

    get diagnostic(): string {
        return JSON.stringify(this.model);
    }

}
