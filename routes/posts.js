const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

// Create new post
router.post("/", async(req, res)=> {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(401).json("Post could not be saved " + err);
    }
})



// Update post

router.put("/:id", async(req, res)=> {
    try{
        const post = await Post.findById(req.params.id);
        console.log(post);
        if (post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                },{new: true});
                res.status(200).json(updatedPost);
            }catch(err){
                res.status(401).json("You can update only your post!");
            }
        } else{
            res.status(401).json("You can update only your post!");
        }
        
    }catch(err){
        res.status(401).json("Post could not be found! " + err); 
    }
})



// Delete post

router.delete("/:id", async(req, res)=> {
    try{
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username){
            try{
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json("Post deleted successfully");
            }catch(err){
                res.status(401).json("You can delete only your post!");
            }
        } else{
            res.status(401).json("You can delete only your post!");
        }
        
    }catch(err){
        res.status(401).json("Post could not be found! " + err); 
    }
})


// Get post
router.get('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(401).json('post not found');
    }
    
})


// Get all posts

router.get('/', async (req, res) => {
    const user = req.query.user;
    const cat = req.query.cat;
    try{
        let posts;
        if (user){
            posts = await Post.find({username: user})
        }
        else if (cat){
            posts = await Post.find({
                categories: { 
                    $in:[cat]
                }
            })
        }
        else{
            posts = await Post.find();
        }
        res.status(200).json(posts);

    }catch(err){
        res.status(401).json('post not found! ' + err);
    }
    
})

module.exports = router;