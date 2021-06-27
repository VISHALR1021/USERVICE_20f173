const router = require("express").Router();
const ProjectSkill = require("../models/projectSkill.model");

//*** add project Skills****//
router.route('/add').post(function (req,res) {
    let projectSkill = new ProjectSkill(req.body);

    ProjectSkill.find({ project_id: req.body.project_id,skill_id:req.body.skill_id})
        .exec()
        .then(item =>{
            if(item.length >=1){
                res.status(500).json({'projectSkill': "projectSkill Available"});
            }else{
                projectSkill.save()
                    .then(sup=>{
                        res.status(200).send('Success');
                    }).catch(err=>{

                     res.status(400).send('fail');
                    });
            }
        }).catch(err=>{
        res.status(500).json(err);
    })
});

router.route('/getAll').get(function (req, res) {
    //with one populate this didn't work
    ProjectSkill.find().populate("project_id").populate("skill_id").exec().then(item => {
        res.status(200).json(item)
    })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.route('/getProjectSkill/:id').get(function (req, res) {
    let id=req.params.id;
    //with one populate this didn't work
    ProjectSkill.findOne({project_id:id}).populate("project_id").populate("skill_id").exec().then(item => {
        res.status(200).json(item)
    })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    try {
        await ProjectSkill.findByIdAndDelete(req.params.id)
            .then(() => res.json({ msg: "Project Deleted Successfully!" }))
            .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;