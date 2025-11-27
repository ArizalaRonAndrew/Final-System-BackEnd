// src/models/studentId.model.js
import { pool } from "../config/db.js";

export const createStudent = async (data) => {
    const sql = `
        INSERT INTO student_applications (
            student_id, first_name, middle_name, last_name, email,
            phone, date_of_birth, address, grade, section,
            photo_path, signature_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        data.student_id,
        data.first_name,
        data.middle_name,
        data.last_name,
        data.email,
        data.phone,
        data.date_of_birth,
        data.address,
        data.grade,
        data.section,
        data.photo_path,       // BLOB
        data.signature_path    // BLOB
    ];

    const [result] = await pool.query(sql, values);
    return result.insertId;
};


export const getAllStudents = async () => {
    const [rows] = await pool.query("SELECT * FROM student_applications ORDER BY id DESC");

    // Convert BLOBs to base64 for frontend
    return rows.map(row => ({
        ...row,
        photo_path: row.photo_path ? row.photo_path.toString("base64") : null,
        signature_path: row.signature_path ? row.signature_path.toString("base64") : null
    }));
};


export const getStudentById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM student_applications WHERE id = ?", [id]);

    if (!rows[0]) return null;

    return {
        ...rows[0],
        photo_path: rows[0].photo_path ? rows[0].photo_path.toString("base64") : null,
        signature_path: rows[0].signature_path ? rows[0].signature_path.toString("base64") : null
    };
};


export const updateStudent = async (id, data) => {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return 0;

    const setClause = fields.map(f => `${f} = ?`).join(", ");

    const sql = `UPDATE students SET ${setClause} WHERE id = ?`;
    const [result] = await pool.query(sql, [...values, id]);

    return result.affectedRows;
};


export const deleteStudent = async (id) => {
    const [result] = await pool.query("DELETE FROM students WHERE id = ?", [id]);
    return result.affectedRows;
};
