import { ReservationManager } from "../reservationManager/ReservationManager.js";
import { DoubleRoom } from "../room/DoubleRoom.js";
import { SingleeRoom } from "../room/SingleRoom.js";
import { RoomType } from "../../types.js";

// Test 1: Singleton Pattern Verification
function testSingletonPattern() {
    const instance1 = ReservationManager.getInstance();
    const instance2 = ReservationManager.getInstance();
    console.assert(instance1 === instance2, "Singleton instances should be identical");
    console.log("Singleton test passed");
}

// Test 2: Pricing Strategy Calculation
function testPricingStrategies() {
    const manager = ReservationManager.getInstance();
    
    // Create and add test rooms
    const basePrice = 100;
    const room1 = new DoubleRoom("101", basePrice, 0, true, false);
    const room2 = new SingleeRoom("102", basePrice, 0, true, true);
    const room3 = new DoubleRoom("103", basePrice, 1, false, true);
    const room4 = new SingleeRoom("104", basePrice, 1, false, true);
    
    manager.addRoom("101", room1);
    manager.addRoom("102", room2);
    manager.addRoom("103", room3);
    manager.addRoom("104", room4);

    // Test High Demand Pricing (availability <= 50%)
    room3.setRoomAvailabilty(false);
    room4.setRoomAvailabilty(false);
    
    const highDemandPrice = manager.getRoomPricingDetails({
        acRoom: true,
        roomType: RoomType.Single
    });
    console.assert(highDemandPrice === 120, `High demand price should be 120, got ${highDemandPrice}`);

    // Test Low Demand Pricing (availability >= 50%)
    room3.setRoomAvailabilty(true);
    room4.setRoomAvailabilty(true);
    const lowDemandPrice = manager.getRoomPricingDetails({
        acRoom: true,
        roomType: RoomType.Single
    });
    console.assert(lowDemandPrice === 90, `Low demand price should be 90, got ${lowDemandPrice}`);

    console.log("Pricing strategy tests passed");
}

// Test 3: Full Reservation Lifecycle
function testReservationLifecycle() {
    const manager = ReservationManager.getInstance();
    const testRoom = new DoubleRoom("201", 150, 2, true, true);
    manager.addRoom("201", testRoom);

    // Test room availability
    console.assert(manager.areRoomsAvailable({
        acRoom: true,
        roomType: RoomType.Single
    }), "Rooms should be available");

    // Make reservation
    manager.makeReservation("guest1", "201");
    console.assert(manager['reservations'].size === 1, "Reservation should be created");

    // Try duplicate reservation
    manager.makeReservation("guest2", "201");
    console.assert(manager['reservations'].size === 1, "Duplicate reservation should be prevented");

    // Test check-in/check-out
    manager.checkIn(1);
    const reservation = manager['reservations'].get(1);
    console.assert(reservation.getReservationDetails().checkInTime !== undefined, "Check-in time should be set");

    manager.checkOut(1);
    console.assert(reservation.getReservationDetails().checkoutTime !== undefined, "Check-out time should be set");

    // Test cancellation
    manager.cancelReservation(1);
    console.assert(reservation.getReservationStatus() === "CANCELLED", "Reservation should be cancelled");
    console.assert(testRoom.getRoomAvailabilty() === true, "Room should be available after cancellation");

    console.log("Reservation lifecycle tests passed");
}

// Test 4: Edge Cases
function testEdgeCases() {
    const manager = ReservationManager.getInstance();
    
    // Test non-existent room
    const nullPrice = manager.getRoomPricingDetails({
        acRoom: true,
        roomType: RoomType.Single,
        level: 3
    });
    console.assert(nullPrice === Math.pow(10,5), "Should handle missing rooms gracefully");

    // Test invalid reservation ID
    try {
        manager.checkIn(999);
        console.error("Should throw error for invalid reservation ID");
    } catch (e) {
        console.log("Invalid reservation handling working");
    }

    console.log("Edge case tests passed");
}

// Run all tests
testSingletonPattern();
testPricingStrategies();
testReservationLifecycle();
testEdgeCases();

// Cleanup
ReservationManager['reservationManager'] = null;