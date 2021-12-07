const router = require('express').Router();
const User = require('./../models/User');
const bcrypt = require('bcrypt');


// Register

router.post('/register', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username })

        const passValidated = await bcrypt.compare(req.body.password, user.password);
      
        if (!user || !passValidated)
            res.status(400).send('wrong credentials');
    
        const {password, ...userinfo} = user._doc;
        user && passValidated && res.status(200).json(userinfo);
    }
    catch(err){
        console.log('error occured');
        res.status(500).json(err);
    }
})

module.exports = router;