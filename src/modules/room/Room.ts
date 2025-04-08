import { RoomType } from "../../types.js";

export abstract class Room {
    public smokingRoom: boolean;
    public acRoom: boolean;
    public level: number;
    public roomType: RoomType;
    private available: boolean;
    private roomId: number;
    constructor(roomId, smokingRoom, acRoom, level) {
        this.roomId = roomId;
        this.smokingRoom = smokingRoom;
        this.acRoom = acRoom;
        this.level = level;
        this.available = true;
    }

    getRoomAvailabilty(): boolean {
        return this.available;
    }

    abstract getRoomPricing(): number;

    getRoomId() {
        return this.roomId;
    }

    setRoomAvailabilty(available) {
        this.available = available;
    }
}