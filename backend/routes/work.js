import express from "express"
import Work from "../models/Work.js"
import requireAuth from "../middleware/auth.js"

const router = express.Router()

router.get("/", async (req,res)=>{
    try{
        const works = await Work.find().sort({ order: 1, createdAt:-1})
        res.json(works);
    }catch(error){
        res.status(500).json({ message: "Server error" });
    }
})

router.get("/:slug", async (req,res)=>{
    try {
        const work = await Work.findOne({slug: req.params.slug});
        if(!work){
            return res.status(404).json({message: "Work not found"})
        }
        res.json(work);
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, githubLink, description, link, image } = req.body;
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const lastWork = await Work.findOne().sort({ order: -1 });
    const order = lastWork ? lastWork.order + 1 : 0;

    const work = await Work.create({ title, slug, githubLink, description, link, image, order });
    res.status(201).json(work);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:slug", requireAuth, async (req,res)=>{
    try {
        const {title, githubLink, description, link, image } = req.body;
        const update =  {title, githubLink, description, link, image } 
        if (title) {
        update.slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
    }

    const work = await Work.findOneAndUpdate(
        { slug: req.params.slug},
        update,
        { new: true, runValidators: true}
    )

    if(!work){
        return res.status(404).json({ message: "Work not found"})
    }
    res.json(work)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

router.delete("/:slug", requireAuth, async(req, res)=>{
    try {
        const work = await Work.findOneAndDelete({ slug: req.params.slug})
        if(!work){
            return res.status(404).json({message: "Work not found"})
        }

        res.json({ message: "Work deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

router.patch("/reorder", requireAuth, async (req, res) => {
  try {
    const { order } = req.body; // array of slugs, e.g. ["proj-a", "proj-c", "proj-b"]
    await Promise.all(
      order.map((slug, index) =>
        Work.updateOne({ slug }, { order: index })
      )
    );
    res.json({ message: "Order updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order" });
  }
});


export default router;