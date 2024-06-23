const userModel = require("../models/userModel")

async function allUsers(req,res){
    try{

        const allUsers= await userModel.find();

        res.json({
            message : "All User ",
            data : allUsers,
            success : true,
            error : false

        })

    }
    catch(err){
        res.status(400).json(err)({
            message:err.message||err,
            success:false,
            error:true,
        })
    }
}
module.exports=allUsers