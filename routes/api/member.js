const express = require('express');
const members = require('../../members');
const router = express.Router();
const uuid = require('uuid');

//get all members
router.get('/',(req,res)=>{
    res.json(members);
});

//get member by id
router.get('/:id',(req,res)=>{
    var found = members.some(member=>member.id===parseInt(req.params.id));
    if(found){
        res.json(members.filter(member=>member.id===parseInt(req.params.id)))
    }else{
        res.json({message:`no member found of id ${req.params.id}`})
    }
});

router.post('/',(req,res)=>{
   // res.send(req.body)
    const newMember = {
    id:members.length+1,
    name:req.body.name,
    email:req.body.email,
    status:'active'
}
    if(!newMember.name || !newMember.email){
        return res.status(400).json({message:'enter name and email'});
        
    }
    members.push(newMember);
    res.json(members);
})
//update members
router.put('/:id',(req,res)=>{
	const found = members.some(member=>member.id===parseInt(req.params.id));
	if(found){
		const updMember = req.body;
		members.forEach(member=>{
			if(member.id===parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name:member.name;
                member.email = updMember.email ? updMember.email:member.email;
				 res.json({ msg: 'Member updated', updMember });
			}
		});
		
	}
	 else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
})
//delete members
router.delete('/:id',(req,res)=>{
    const found = members.some(member=>member.id==req.params.id);
    if(found){
        res.json({message:"member deleted",members:members.filter(member=>member.id!=req.params.id)})
    }else{
        res.json({message:`no member found of id ${req.params.id}`})
    }
})

module.exports = router;