import * as BookingModel from "../models/booking.models.js";

// Get all bookings
export const getBookings = async (req, res) => {
    try {
        const bookings = await BookingModel.getAllBookings();
        res.status(200).json({ success: true, bookings });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get booking by ID
export const getBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await BookingModel.getBookingById(id);
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
        res.status(200).json({ success: true, booking });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Create booking
export const createBookingController = async (req, res) => {
    try {
        const id = await BookingModel.createBooking(req.body);
        res.status(201).json({ success: true, message: "Booking created", id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update booking
export const updateBookingController = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await BookingModel.updateBooking(id, req.body);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: "Booking not found" });
        res.status(200).json({ success: true, message: "Booking updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete booking
export const deleteBookingController = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await BookingModel.deleteBooking(id);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: "Booking not found" });
        res.status(200).json({ success: true, message: "Booking deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

