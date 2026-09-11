import express from "express"
import Design from "../models/Design.js"
import requireAuth from "../middleware/auth.js"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const designs = await Design.find().sort({ order: 1, createdAt: -1 });
        res.json(designs);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:slug", async (req,res)=>{
    try {
        const design = await Design.findOne({slug: req.params.slug})
        if(!design){
            return res.status(404).json({message: " Design not found"})
        }
        res.json(design)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

router.post("/", requireAuth, async (req, res) => {
    try {
        const { title, image, description, link } = req.body;
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");

        const lastDesign = await Design.findOne().sort({ order: -1 });
        const order = lastDesign ? lastDesign.order + 1 : 0;

        const design = await Design.create({ title, slug, image, description, link, order });
        res.status(201).json(design);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.patch("/reorder", requireAuth, async (req, res) => {
  try {
    const { order } = req.body;
    await Promise.all(
      order.map((slug, index) => Design.updateOne({ slug }, { order: index }))
    );
    res.json({ message: "Order updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order" });
  }
});

router.put("/:slug", requireAuth, async (req,res)=>{
    try {
        const { title, image, description, link } = req.body;
        const update = { title, image, description, link };

        if (title) {
            update.slug = title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");
        }

        const design = await Design.findOneAndUpdate(
            { slug: req.params.slug },
            update,
            { new: true, runValidators: true }
        )

        if(!design){
            return res.status(404).json({ message: "design not found"})
        }
        res.json(design)
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
})

router.delete("/:slug", requireAuth, async (req,res)=>{
    try {
        const design = await Design.findOneAndDelete({ slug: req.params.slug })
        if(!design){
            return res.status(404).json({message: "Design not found"})
        }
        res.json({message: "Design deleted successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"})
    }
})

export default router;