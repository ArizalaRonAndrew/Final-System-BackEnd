import pool from "../config/db.js";

// Get all bookings
export const getAllBookings = async () => {
    const [rows] = await pool.query("SELECT * FROM bookingtbl");
    return rows;
};

// Get booking by ID
export const getBookingById = async (userID) => {
    const [rows] = await pool.query("SELECT * FROM bookingtbl WHERE userID = ?", [userID]);
    return rows[0];
};

// Create new booking
export const createBooking = async (booking) => {
    const { fullname, email, phonenumber, location, date, time, category, details } = booking;
    const [result] = await pool.query(
        `INSERT INTO bookingtbl 
        (fullname, email, phonenumber, location, date, time, category, details) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [fullname, email, phonenumber, location, date, time, category, details]
    );
    return result.insertId;
};

// Update booking
export const updateBooking = async (userID, booking) => {
    const { fullname, email, phonenumber, location, date, time, category, details} = booking;
    const [result] = await pool.query(
        `UPDATE bookingtbl SET 
        fullname = ?, email = ?, phonenumber = ?, 
        location = ?, date = ?, time = ?, category = ?, details = ? 
        WHERE userID = ?`,
        [fullname, email, phonenumber, location, date, time, category, details, userID]
    );
    return result.affectedRows;
};

// Delete booking
export const deleteBooking = async (userID) => {
    const [result] = await pool.query("DELETE FROM bookingtbl WHERE userID = ?", [userID]);
    return result.affectedRows;
};
