import express from "express";
import {
    getBookings,
    getBooking,
    createBookingController,
    updateBookingController,
    deleteBookingController
} from "../controllers/booking.controller.js";

const router = express.Router();

// CRUD routes
router.get("/", getBookings);              // Get all bookings
router.get("/:id", getBooking);           // Get booking by ID
router.post("/", createBookingController); // Create booking
router.put("/:id", updateBookingController); // Update booking
router.delete("/:id", deleteBookingController); // Delete booking

export default router;
