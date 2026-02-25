const db = require('../config/database');

class User {
  static async create(userData) {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)',
      [userData.username, userData.email, userData.password, userData.full_name]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT id, username, email, full_name, bio, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, userData) {
    const fields = [];
    const values = [];
    
    if (userData.full_name !== undefined) {
      fields.push('full_name = ?');
      values.push(userData.full_name);
    }
    if (userData.bio !== undefined) {
      fields.push('bio = ?');
      values.push(userData.bio);
    }
    
    values.push(id);
    await db.execute(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
  }
}

module.exports = User;
