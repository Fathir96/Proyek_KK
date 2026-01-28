const db = require("../config/db");
const bcrypt = require('bcrypt');

const tampilUser = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_user";
    const [rows] = await db.query(query);
    return res.status(200).json({
      message: "berhasil get user",
      data: rows,
    });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM tb_user WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return res.status(200).json({
      message: "berhasil get user",
      data: rows,
    });
  } catch (error) {
    throw error;
  }
};

const createUser = async (req, res, next) => {
  try {
    const data = {
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }

    if (!data.nama || !data.email || !data.password || !data.role) {
      return res.status(400).json({
        status: "error",
        message: "nama, email, password, dan role wajib diisi",
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const query = `
      INSERT INTO tb_user (nama, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    await db.execute(query, [data.nama, data.email, hashedPassword, data.role]);

    return res.status(201).json({
      status: "success",
      message: "user berhasil didaftarkan",
    });
  } catch (error) {
    next(error);
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      nama: req.body.nama,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    const query = `
      UPDATE tb_user 
      SET nama = ?, email = ?, password = ?, role = ?
      WHERE id = ?
    `;

    await db.execute(query, [
      data.nama,
      data.email,
      data.password,
      data.role,
      id,
    ]);

    return res.status(200).json({
      message: "berhasil update user",
    });
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM tb_user WHERE id = ?";
    await db.query(query, [id]);
    return res.status(200).json({
      message: "berhasil delete user",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  tampilUser,
  createUser,
  updateUser,
  deleteUser,
  getById,
};
