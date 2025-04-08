export type RoomFeatures = {
    acRoom?: boolean;
    balconyRoom?: boolean;
    smokingRoom?: boolean;
    level?: number;
    roomType: RoomType;
}

export enum RoomType {
    Single = "Single",
    Double = "Double"
}