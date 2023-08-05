const express=require('express');
const router=express.Router();
const array = require('../../Members');
const uuid=require('uuid');
//get all members
router.get('/',(req,res)=>{
    res.json(array);
 })
 
 //get single memnber
 router.get('/:id',(req,res)=>
 {
     const found = array.some(member=>member.id===parseInt(req.params.id))
 
     if(found)
     {
         res.json(array.filter(member=>member.id===parseInt(req.params.id)))
     }
     else
     {
         res.status(400).json({'msg':`No member with id of ${req.params.id}`});
     }
 
 
 });



//create Member
router.post('/',(req,res)=>{
const newMember=
{
    id:uuid.v4(),
    name:req.body.name,
    email:req.body.email,
    status:'actice'
}

if(!newMember.name || !newMember.email)
{
    return res.status(400).json({msg:'Please include name and email '});
}
array.push(newMember);
res.json(array);
// res.redirect('/')
});

//Update members 
 router.put('/:id',(req,res)=>
 {
     const found = array.some(member=>member.id===parseInt(req.params.id))
 
     if(found)
     {
         const updmember=req.body;
         array.forEach(member=>{
            if(member.id===parseInt(req.params.id)){
                member.name=updmember.name ? updmember.name:member.name;
                member.email = updmember.email ? updmember.email:member.email;
                res.json({'msg':'Member Updated',member});
            }
         })
     }
     else
     {
         res.status(400).json({'msg':`No member with id of ${req.params.id}`});
     }
 
 
 });

//delete member
router.delete('/:id',(req,res)=>
{
    const found = array.some(member=>member.id===parseInt(req.params.id))

    if(found)
    {
        res.json({ msg:'member deleted',array:array.filter(member=>member.id!==parseInt(req.params.id))});
    }
    else
    {
        res.status(400).json({'msg':`No member with id of ${req.params.id}`});
    }


});
module.exports=router;
