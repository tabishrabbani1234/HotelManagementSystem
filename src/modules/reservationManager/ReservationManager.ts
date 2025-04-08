import { RoomFeatures } from "../../types.js";
import { HighDemandPricing, LowDemandPricing } from "../pricingStrategy/PricingStrategy.js";
import { Reservation } from "../reservation/Reservation.js";
import { Room } from "../room/Room.js";

export class ReservationManager {
    public static reservationManager: ReservationManager;
    private reservations: Map<number, Reservation>;
    private rooms: Map<string, Room>;
    private reservationCount: number;
    private constructor() {
        this.reservations = new Map<number, Reservation> ();
        this.rooms = new Map<string, Room> ();
        this.reservationCount = 0;
    }
    public static getInstance() {
        if(!ReservationManager.reservationManager) {
            ReservationManager.reservationManager = new ReservationManager();
        }

        return ReservationManager.reservationManager;
    }

    public addRoom(roomId, room: Room) {
        this.rooms.set(roomId, room);
    }

    public areRoomsAvailable(roomfeatures: RoomFeatures) {
        let availableRooms = this.getAllRooms(roomfeatures);
        availableRooms = availableRooms.filter(room => room.getRoomAvailabilty() == true);
        return availableRooms.length > 0; 
    }

    public getRoomPricingDetails(roomfeatures: RoomFeatures) {
        const totalRooms = this.getAllRooms(roomfeatures);
        const availableRooms = totalRooms.filter(room => room.getRoomAvailabilty() == true);
        console.log(`Total rooms are ${totalRooms.length}, available rooms are ${availableRooms.length} for room features ${roomfeatures}`);
        // handle edge case where total rooms are 0
        if(totalRooms?.length > 0) {
            if(availableRooms.length > 0) {
                const demandFactor = availableRooms.length / totalRooms.length;
                const basePrice = availableRooms[0].getRoomPricing();
                console.log(`Demand factor is ${demandFactor}`);
                if(demandFactor <= 0.5) {
                    const highDemandPricing = new HighDemandPricing();
                    const roomPrice = highDemandPricing.calculatePrice(basePrice);
                    return roomPrice;
                } else {
                    const lowDemandPricing = new LowDemandPricing();
                    const roomPrice = lowDemandPricing.calculatePrice(basePrice);
                    return roomPrice;
                }
            }
        } 

        console.log("No rooms available right now");
        // ideally throw error here
        return Math.pow(10,5);
    }

    public getAllRooms(roomfeatures: RoomFeatures) {
        let availableRooms = [];
        // logic to check available rooms
        if(roomfeatures?.acRoom) {
            availableRooms = Array.from(this.rooms.values())
            .filter(room => room.acRoom == true);
        } 
        if (roomfeatures?.balconyRoom) {
            const balconyRooms = Array.from(this.rooms.values())
            .filter(room => room.acRoom == true);
            availableRooms = availableRooms.filter(item => balconyRooms.includes(item));
        }

        if(roomfeatures?.smokingRoom) {
            const smokingRooms = Array.from(this.rooms.values())
            .filter(room => room.acRoom == true);
            availableRooms = availableRooms.filter(item => smokingRooms.includes(item));
        }

        if(roomfeatures?.roomType) {
            const rooms = Array.from(this.rooms.values())
            .filter(room => room.roomType == roomfeatures?.roomType);
            availableRooms = availableRooms.filter(item => rooms.includes(item));
        }

        if(roomfeatures?.level) {
            const levelRooms = Array.from(this.rooms.values())
            .filter(room => room.level == roomfeatures?.level);
            console.log(`Total rooms at level ${roomfeatures?.level} are ${levelRooms.length}`);
            availableRooms = availableRooms.filter(item => levelRooms.includes(item));
        }

        console.log("No of total rooms are ", availableRooms.length)
        
        return availableRooms;
    }

    public makeReservation(guestId, roomId) {
        const room = this.rooms.get(roomId);
        if(room) {
            console.log("RoomId is ", roomId);
            if(room.getRoomAvailabilty()) {
                this.reservationCount++;
                const reservation = new Reservation(guestId, roomId, this.reservationCount);
                this.reservations.set(this.reservationCount,reservation)
                console.log(`Room ${roomId} reserved for guest ${guestId}`);
                // mark room reserved 
                const room = this.rooms.get(roomId);
                room.setRoomAvailabilty(false);
            }
        } else {
            console.log("Room isn't available");
        }
    }

    public cancelReservation(reservationId) {
        const reservation = this.reservations.get(reservationId);
        if(reservation) {
            reservation.cancelReservation();
            const room = this.rooms.get(reservation.getRoomId());
            room.setRoomAvailabilty(true);
        }
    }

    public checkIn(reservationId) {
        console.log(`Reservation id is ${reservationId}`);
        const reservation = this.reservations.get(reservationId);
        if(reservation) reservation.checkin();
        else {
            throw new Error("Invalid reservation Id");
        }
    }

    public checkOut(reservationId) {
        const reservation = this.reservations.get(reservationId);
        reservation.checkout();
        // mark room available on checkout
        // mark room reserved 
        console.log("Room id for reservation is", reservation.getRoomId());
        const room = this.rooms.get(reservation.getRoomId());
        room.setRoomAvailabilty(true);
    }
}