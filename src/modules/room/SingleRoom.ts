import { RoomType } from "../../types.js";
import { Room } from "./Room.js";

export class SingleeRoom extends Room {
    private roomPrice;
    constructor(roomId, roomPrice, level, smokingRoom, acRoom) {
        super(roomId, smokingRoom, acRoom, level);
        this.roomPrice = roomPrice;
        this.roomType = RoomType.Single;
    }

    getRoomPricing(): number {
        return this.roomPrice;
    }
}