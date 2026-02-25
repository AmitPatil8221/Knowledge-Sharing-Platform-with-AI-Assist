const db = require('../config/database');

class Comment {
  static async create(commentData) {
    const [result] = await db.execute(
      'INSERT INTO comments (content, post_id, user_id) VALUES (?, ?, ?)',
      [commentData.content, commentData.post_id, commentData.user_id]
    );
    return result.insertId;
  }

  static async findByPostId(postId) {
    const [rows] = await db.execute(`
      SELECT c.*, u.username, u.full_name
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC
    `, [postId]);
    return rows;
  }

  static async delete(id) {
    await db.execute('DELETE FROM comments WHERE id = ?', [id]);
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM comments WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Comment;
