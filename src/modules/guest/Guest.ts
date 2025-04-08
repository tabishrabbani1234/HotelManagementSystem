export class Guest {
    private guestId: number;
    private name: string;
    private phoneNumber: string;
    private emailId: string;

    constructor(guestId, name, phoneNumber, emailId) {
        this.guestId = guestId;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.emailId = emailId;
    }

    getGuestId() {
        return this.guestId;
    }

    getGuestDetails() {
        return {
            name: this.name,
            emailId: this.emailId,
            phoneNumber: this.phoneNumber
        }
    }
}