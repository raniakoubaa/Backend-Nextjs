var express = require('express');
var router = express.Router();
const Article = require("../models/article")
const {verifyToken} =require("../middleware/verifytoken")
const {authorizeRoles} = require("../middleware/authorizeRoles")
const { uploadFile } = require('../middleware/Uploadfile')
//affichage de la liste d'article
router.get('/', verifyToken,authorizeRoles("user","admin","visiteur"), async (req,res) => {
    try {
        const art = await Article.find();
        res.status(200).json(art)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})
// affichage d'un article
router.get('/:articleId', async (req,res) => {
    const Id= req.params.articleId;
    try {
        const art = await Article.findById(Id);
        res.status(200).json(art)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})
// ajouter d'un article
router.post('/', async (req, res) => {
// router.post('/', uploadFile.single("imageart"),async (req, res) => {
const {reference,designation,prix,marque,qtestock,scategorieID, imageart} = req.body ;
// const imageart = req.file.filename
const nouvarticle = new Article({reference:reference,designation:designation,prix:prix,marque:marque
,qtestock:qtestock,scategorieID:scategorieID,imageart:imageart})
    try {
    await nouvarticle.save();
    res.status(200).json(nouvarticle );
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
// modifier un article
router.put('/:articleId', async (req, res)=> {
    const { reference, 
    designation,prix,marque,qtestock,imageart,scategorieID} = req.body;
    const id = req.params.articleId;
    try {
    const art1 = { 
    reference:reference,designation:designation,prix:prix,marque:marque,qtestock:qtestock,imageart:imageart,scategorieID:scategorieID, _id:id };
    await Article.findByIdAndUpdate(id, art1);
    res.json(art1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // Supprimer un article
    router.delete('/:articleId', async (req, res)=> {
    const id = req.params.articleId;
    await Article.findByIdAndDelete(id);
    res.json({ message: "article deleted successfully." });
    });    
module.exports = router;