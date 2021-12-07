const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Post = require('../models/Post');
//djd
// To update our user
router.put('/:id', async(req, res) => {
    if (req.body.userId === req.params.id){
        if (req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { 
                $set: req.body,
            },
            {new: true}     // this is used, otherwise updatedUser variable would contain the old user details. 
                            // new: true, sets the updatedUser variable with the new updated details    
            );
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }   
    }
    else{
        res.status(401).json("You can update only your account!");
    }
    
})

// to delete our user

router.delete('/:id', async(req, res) => {
    if (req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);

            try{
                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("the user has been deleted");
            }catch(err){
                res.status(500).json(err);
            } 
        }catch(err){
            res.status(401).json("user not found");
        }  
    }
    else{
        res.status(401).json("You can delete only your account!");
    }
    
})

// get an user
router.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...userinfo} = user._doc;
        res.status(200).json(userinfo);
    }catch(err){
        res.status(401).json('user not found');
    }
    
})

module.exports = router;