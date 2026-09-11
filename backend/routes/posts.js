import express from "express";
import Post from "../models/Post.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

// GET /api/posts - list all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ order: 1, createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/posts/:slug - get one post by slug
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", requireAuth, async (req, res)=>{
    try {
    const { title, excerpt, content } = req.body;
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    
    const lastPost = await Post.findOne().sort({ order: -1 });
    const order = lastPost ? lastPost.order + 1 : 0;

    const post = await Post.create({ title, slug, excerpt, content, order });
    res.status(201).json(post);
    } catch (error) {
    res.status(500).json({ message: "Server error" });
    }
})

router.put("/:slug", requireAuth, async (req, res) => {
    try {
    const { title, excerpt, content } = req.body;
    const updates = { title, excerpt, content };

    if (title) {
      updates.slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
    }

    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      updates,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
    } catch (error) {
    res.status(500).json({ message: "Server error" });
    }
})

router.delete("/:slug", requireAuth, async(req, res)=>{
    try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
    } catch (error) {
    res.status(500).json({ message: "Server error" });
    }
})

router.patch("/reorder", requireAuth, async (req, res) => {
  try {
    const { order } = req.body; // array of slugs, e.g. ["proj-a", "proj-c", "proj-b"]
    await Promise.all(
      order.map((slug, index) =>
        Post.updateOne({ slug }, { order: index })
      )
    );
    res.json({ message: "Order updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order" });
  }
});

export default router;