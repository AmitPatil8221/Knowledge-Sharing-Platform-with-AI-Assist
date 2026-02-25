const db = require('../config/database');

class Category {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM categories ORDER BY name');
    return rows;
  }
}

module.exports = Category;
