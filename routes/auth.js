const router = require("express").Router()


router.get("/", (req,res)=> {
   res.send("Its auth routes")
})


module.exports = router