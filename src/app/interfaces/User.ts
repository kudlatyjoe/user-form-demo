export class User {
    firstName: string = ''
    lastName: string = ''
    email: string = ''
    phone: string = ''
    birthday: Date = new Date(Date.now())
    about: string = ''
    avatar: string = ''

    constructor(user?: any) {
        Object.assign(this, user)
    }

}