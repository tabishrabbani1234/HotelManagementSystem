export class Reservation {
    private guestId: string;
    private roomId: string;
    private status: string;
    private checkInTime: number;
    private checkoutTime: number;
    public reservationId: number;
    public reservationTime: number;
    constructor(guestId, roomId, id) {
        this.guestId = guestId;
        this.roomId = roomId;
        this.reservationId = id;
        this.status = "CONFIRMED";
        this.reservationTime = Date.now();
    }

    public checkin() {
        this.checkInTime = Date.now();
    }

    public checkout() {
        this.checkoutTime = Date.now();
    }

    public getGuestId() {
        return this.guestId;
    }

    public getRoomId() {
        return this.roomId;
    }

    public getReservationStatus() {
        return this.status;
    }

    public cancelReservation() {
        this.status = "CANCELLED";
    }

    public getReservationDetails() {
        return {
            checkInTime: this.checkInTime,
            checkoutTime: this.checkoutTime
        }
    }
}