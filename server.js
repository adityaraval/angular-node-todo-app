//packages import
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');

//config for mongoose added
const {mongoose} = require('./config/mongoose');

//models import
const {TodoModel} = require('./model/todo');
const {ProjectModel} = require('./model/project');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//static folder
app.use(express.static('public'))


//runs angular todo app
app.get('/',function(req,res){
    res.sendFile('public/index.html', {root: __dirname });
});

//post todo api
app.post('/api/todo',(req,res)=>{
    let Todo = new TodoModel({
        text:req.body.text,
        title:req.body.title,
        completed:req.body.completed,
        project_id:req.body.project_id
    });
    Todo.save().then((todo)=>{
        res.send({data:[todo],success:true});
    },(error)=>{
        res.send({data:{},success:false});
    });
});

//get all todo apis
app.get('/api/todo',(req,res)=>{
    TodoModel.find({}).populate('project_id').then((todos)=>{
        res.send({data:todos,success:true});
    },(error)=>{
        res.send({data:{},success:false});
    });
});

//delete todo by id
app.delete('/api/todo/:id',(req,res)=>{
    var id = req.params.id;
    TodoModel.findByIdAndRemove(id).then((todo)=>{
        res.send({data:todo,success:true}); 
    },(error)=>{
        res.send({data:{},success:false});
    });
});

//make todo complete
app.patch('/api/todo/:id',(req,res)=>{
    var id = req.params.id;
    updateObj = {completed:req.body.completed};
    TodoModel.findByIdAndUpdate(id,{$set:updateObj},{new:true}).then((todo)=>{
        res.send({data:todo,success:true}); 
    },(error)=>{
        res.send({data:{},success:false});
    });
});

//update todo
app.put('/api/todo/:id',(req,res)=>{
    var id = req.params.id;
    updateObj = {completed:req.body.completed,text:req.body.text,title:req.body.title};
    TodoModel.findByIdAndUpdate(id,{$set:updateObj},{new:true}).then((todo)=>{
        res.send({data:[todo],success:true}); 
    },(error)=>{
        res.send({data:{},success:false});
    });
});

//get todo by id 
app.get('/api/todo/:id',(req,res)=>{
    var id = req.params.id;
    TodoModel.findById(id).then((todos)=>{
        res.send({data:[todos],success:true});
    },(error)=>{
        res.send({data:{},success:false});
    });
});

//add project
app.post('/api/project',(req,res)=>{
    let Project = new ProjectModel({
        title:req.body.title
    });
    Project.save().then((project)=>{
        res.send({data:[project],success:true});
    },(error)=>{
        res.send({data:{},success:false});
    });
});

//get all projects apis
app.get('/api/project',(req,res)=>{
    ProjectModel.find().then((projects)=>{
        res.send({data:projects,success:true});
    },(error)=>{
        res.send({data:{},success:false});
    });
});

//get todo by id 
app.get('/api/todos',(req,res)=>{
    var p_id = req.query.p_id;
    TodoModel.find({project_id:p_id}).then((todos)=>{
        res.send({data:todos,success:true});
    },(error)=>{
        res.send({data:{},success:false});
    });
});


app.listen(PORT,()=>{
    console.log('Server is running on port '+PORT);
});