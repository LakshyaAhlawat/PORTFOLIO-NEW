const Project=require('../models/Project');

// get project

exports.getProject = async function(req, res) {
  try{
    const projects=await Project.find().sort({createdAt: -1});
    if(projects.length===0){
      return res.status(404).json({
        message:"No projects found"
      })
    }
    return res.status(200).json({
      message: "Projects fetched successfully",
      projects
    });
  }
  catch(error){
    console.error("Error fetching project:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

// create project

exports.createProject=async(req,res)=>{
  try{
    const {title, description, github, demo, techStack, image} = req.body;
    if(!title || !description || !github || !demo || !techStack || !image){
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    const newProject=new Project({
      title,
      description,
      github,
      demo,
      techStack,
      image,
      createdAt: new Date(),
    })
    await newProject.save();
    return res.status(201).json({
      message: "Project created successfully",
      project: {
        id: newProject._id,
        title: newProject.title,
        description: newProject.description,
        github: newProject.github,
        demo: newProject.demo,
        techStack: newProject.techStack,
        image: newProject.image,
        createdAt: newProject.createdAt
      }
    })
  }
  catch(error){
    console.error("Error creating project:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
//update project

exports.updateProject=async(req,res)=>{
  try{
    const {id}= req.params;
    const {title, description, github, demo, techStack, image} = req.body
    if(!title || !description || !github || !demo || !techStack || !image){
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    const project=await Project.findByIdAndUpdate(id, {
      title,
      description,
      github,
      demo,
      techStack,
      image
    }, {new: true});
    if(!project){
      return res.status(404).json({
        message: "Project not found"
      });
    }
    return res.status(200).json({
      message: "Project updated successfully",
      project: {
        id: project._id,
        title: project.title,
        description: project.description,
        github: project.github,
        demo: project.demo,
        techStack: project.techStack,
        image: project.image,
        createdAt: project.createdAt
      }
    });

  }
  catch(error){
    console.error("Error updating project:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
//delete project

exports.deleteProject=async(req,res)=>{
  try{
    const {id}=req.params;
    const project=await Project.findByIdAndDelete(id);
    if(!project){
      return res.status(404).json({
        message: "Project not found"
      });
    }
    return res.status(200).json({
      message: "Project deleted successfully"
    });
    
  }
  catch(error){
    console.error("Error deleting project:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}