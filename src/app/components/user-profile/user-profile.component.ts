import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from 'src/app/interfaces/User';
import { SessionStorageFacade } from 'src/app/services/session-storage.facade';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['../user-information/user-information.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User()
  userForm: FormGroup
  avatar: SafeResourceUrl = ''
  
  constructor(private storageFacade: SessionStorageFacade, private sanitizer: DomSanitizer) { 
    this.userForm = new FormGroup({
      firstName: new FormControl({value: '', disabled: true}),
      lastName: new FormControl({value: '', disabled: true}),
      email: new FormControl({value: '', disabled: true}),
      phone: new FormControl({value: '', disabled: true}),
      birthday: new FormControl({value: '', disabled: true}),
      about: new FormControl({value: '', disabled: true})
    });}

  ngOnInit(): void {
    this.user = this.storageFacade.getUser()
    this.userForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      birthday: new Date(this.user.birthday).toISOString().substring(0, 10),
      about: this.user.about
    })
    this.avatar = this.user.avatar ? this.sanitizer.bypassSecurityTrustResourceUrl(this.user.avatar) : ''
  }

}
