const db = require('../config/database');

class Post {
  static async create(postData) {
    const [result] = await db.execute(
      'INSERT INTO posts (title, description, summary, category_id, user_id) VALUES (?, ?, ?, ?, ?)',
      [postData.title, postData.description, postData.summary || null, postData.category_id, postData.user_id]
    );
    return result.insertId;
  }

  static async findAll(search = '', categoryId = null) {
    let query = `
      SELECT p.*, u.username, u.full_name, c.name as category_name,
      GROUP_CONCAT(t.name) as tags
      FROM posts p
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ' AND (p.title LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (categoryId) {
      query += ' AND p.category_id = ?';
      params.push(categoryId);
    }

    query += ' GROUP BY p.id ORDER BY p.created_at DESC';
    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(`
      SELECT p.*, u.username, u.full_name, c.name as category_name,
      GROUP_CONCAT(t.name) as tags
      FROM posts p
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE p.id = ?
      GROUP BY p.id
    `, [id]);
    return rows[0];
  }

  static async update(id, postData) {
    await db.execute(
      'UPDATE posts SET title = ?, description = ?, summary = ?, category_id = ? WHERE id = ?',
      [postData.title, postData.description, postData.summary || null, postData.category_id, id]
    );
  }

  static async delete(id) {
    await db.execute('DELETE FROM posts WHERE id = ?', [id]);
  }

  static async addTags(postId, tags) {
    for (const tagName of tags) {
      let [tagRows] = await db.execute('SELECT id FROM tags WHERE name = ?', [tagName]);
      let tagId;
      
      if (tagRows.length === 0) {
        const [result] = await db.execute('INSERT INTO tags (name) VALUES (?)', [tagName]);
        tagId = result.insertId;
      } else {
        tagId = tagRows[0].id;
      }
      
      await db.execute('INSERT IGNORE INTO post_tags (post_id, tag_id) VALUES (?, ?)', [postId, tagId]);
    }
  }

  static async removeTags(postId) {
    await db.execute('DELETE FROM post_tags WHERE post_id = ?', [postId]);
  }
}

module.exports = Post;
