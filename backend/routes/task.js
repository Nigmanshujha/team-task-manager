const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.post("/", auth, async (req,res)=>{
  const task = await Task.create(req.body);
  res.json(task);
});

router.get("/", auth, async (req,res)=>{
  const tasks = await Task.find().populate("assignedTo");
  res.json(tasks);
});

router.put("/:id", auth, async (req,res)=>{
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(task);
});

router.delete("/:id", auth, async (req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json({msg:"Deleted"});
});

module.exports = router;