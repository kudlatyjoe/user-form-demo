import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputBase } from '@angular/material/datepicker/datepicker-input-base';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/interfaces/User';
import { ImageProcessService } from 'src/app/services/image-process.service';
import { UserCreateAction } from 'src/app/store/user.action';
import * as fromStore from '../../store/index'

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent {
  userForm: FormGroup
  avatar: string = ''
  imageError: string = ''
  showOverlay: boolean = false

  constructor(
    private store: Store<fromStore.State>,
    private imageProcessService: ImageProcessService,
    private router: Router) { 
    this.userForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)]),
      birthday: new FormControl(new Date(Date.now()), Validators.required),
      about: new FormControl('')
    });
  }

  date(event: {target: MatDatepickerInputBase<any, any>}) {
    var convertDate = new Date(event.target.value).toISOString().substring(0, 10);
    this.userForm.get('birthday')!.setValue(convertDate)
  }

  emailInvalid() {
    return this.userForm.get('email')?.errors?.required
  }

  emailIncorrect() {
    return this.userForm.get('email')?.errors?.email
  }

  phoneInvalid() {
    return this.userForm.get('phone')?.errors?.required
  }

  phoneIncorrect() {
    return this.userForm.get('phone')?.errors?.pattern
  }

  fileChange(event: Event) {
    event.preventDefault()
    const target = <HTMLInputElement>event.target
    if(target && target.files) {
      this.processImage(target.files[0])
    }
  }

  allowDrop(event: Event) {
    event.stopPropagation()
    event.preventDefault()
  }

  onDrop(event: DragEvent) {
    event.preventDefault()
    if(event.dataTransfer) 
      this.processImage(event.dataTransfer.files[0])
  }

  processImage(image: File) {
    this.imageProcessService.getBase64Image(image)
      .then((b64: string) => {
        if (b64) {
          this.avatar = b64
          this.imageError = ''
        }
      })
      .catch(err => this.imageError = err)
  }

  onSubmit() {
    this.store.dispatch(new UserCreateAction(new User({...this.userForm.value, avatar: this.avatar})))
    this.showOverlay = true
    setTimeout(() => this.router.navigate(['/', 'profile']), 1000)
  }

}
