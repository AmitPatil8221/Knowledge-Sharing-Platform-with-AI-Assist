const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, description, category_id, tags } = req.body;

    if (!title || !description || !category_id) {
      return res.status(400).json({ error: 'Title, description, and category are required' });
    }

    const postId = await Post.create({
      title,
      description,
      category_id,
      user_id: req.user.id
    });

    if (tags && tags.length > 0) {
      await Post.addTags(postId, tags);
    }

    const post = await Post.findById(postId);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const posts = await Post.findAll(search, category);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { title, description, category_id, tags } = req.body;
    await Post.update(req.params.id, { title, description, category_id });

    if (tags) {
      await Post.removeTags(req.params.id);
      if (tags.length > 0) {
        await Post.addTags(req.params.id, tags);
      }
    }

    const updatedPost = await Post.findById(req.params.id);
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Post.delete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
