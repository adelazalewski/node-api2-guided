const express = require("express");
const users = require("./users-model");
const router = express.Router();

router.get("/users", (req, res) => {
    
	users.find(req.query)
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the users",
			})
		})
})

router.get("/users/:id", (req, res) => {
	users.findById(req.params.id)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "User not found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the user",
			})
		})
})

router.post("/users", (req, res) => {
	if (!req.body.name || !req.body.email) {
		return res.status(400).json({
			message: "Missing user name or email",
		})
	}

	users.add(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the user",
			})
		})
})

router.put("/users/:id", (req, res) => {
	if (!req.body.name || !req.body.email) {
		return res.status(400).json({
			message: "Missing user name or email",
		})
	}

	users.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the user",
			})
		})
})

router.delete("/users/:id", (req, res) => {
	users.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the user",
			})
		})
})
router.get("/users/:id/posts", (req, res) => {
    users.findUserPosts(req.params.id)
    .then((posts) => {
        res.json(posts)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "could not get user's post"
        })
    })
})
router.get("/users/:userId/posts/:postsId", (req, res) => {
    users.findUserPostById(req.params.userId, req.params.postsId)
    .then((post)=>{
        if(post){
            res.json(post)
        }else{
            res.status(404).json({
                message: "post not found"
            })
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "could not get user's post"
        })})
})
router.post("/users/:id/posts", (req, res) => {
    
    if(!req.body.text) {
        return res.status(400).json({
            message: "need a text value"
        })
    }
    users.addUserPost(req.params.id, {text: req.body.text})
    .then((post) => {
        res.status(201).json(post)
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "could not create user's post"
        })
    })
        
    
})
//same as export default
module.exports = router;