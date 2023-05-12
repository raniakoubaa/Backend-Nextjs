var express = require('express');
var router = express.Router();
const SCategorie=require("../models/scategorie")
// afficher la liste des categories.
router.get('/', async (req, res )=> {
    try {
    const scat = await SCategorie.find();
    res.status(200).json(scat);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

    router.post('/', async(req,res) => {
        
            const {nomscategorie, imagescat, categorieID} = req.body;
            const newscategorie = new SCategorie({nomscategorie:nomscategorie, imagescat:imagescat, categorieID: categorieID})
            try{
            await newscategorie.save();
            res.status(200).json(newscategorie)
        } catch (error) {
            res.status(404).json({message: error.message })
        }
    })
    router.get('/:scategorieId', async(req,res) => {
        try{
        const scat = await SCategorie.findById(req.params.scategorieId);
        res.status(200).json(scat)
    } catch (error) {
        res.status(404).json({message: error.message })
    }
})
router.put('/:scategorieId', async(req,res) => {
    const {nomscategorie, imagescat, categorieID} = req.body;
     
    const Id = req.params.scategorieId;
    try{  
    const newscategorie = new SCategorie({nomscategorie:nomscategorie, imagescat:imagescat, categorieID: categorieID, _id:Id})  
    const scat= await SCategorie.findByIdAndUpdate(Id, newscategorie)
    res.json(scat)
} catch (error) {
    res.status(404).json({message: error.message })
}
})
router.delete('/:scategorieId', async(req,res) => {
   
    const Id = req.params.scategorieId;
    try{  
    await SCategorie.findByIdAndDelete(Id)
    res.json({message: "delete success" })
} catch (error) {
    res.status(404).json({message: error.message })
}
})
    module.exports = router;
