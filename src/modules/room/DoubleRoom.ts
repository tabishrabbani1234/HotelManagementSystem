import { RoomType } from "../../types.js";
import { Room } from "./Room.js";

export class DoubleRoom extends Room {
    private roomPrice;
    constructor(roomId, roomPrice, level, smokingRoom, acRoom) {
        super(roomId, smokingRoom, acRoom, level);
        this.roomPrice = roomPrice;
        this.roomType = RoomType.Double;
    }


    getRoomPricing(): number {
        return this.roomPrice;
    }

}