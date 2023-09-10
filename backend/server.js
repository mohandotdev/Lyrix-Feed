const PORT = 3008;
const Pool = require("pg").Pool;
const express= require("express");
const cors= require("cors");
const app= express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))


const pool = new Pool({
    host: "localhost",
    user:"postgres",
    password:"mohan@16",
    database:"postgres",
    port: "5432"
});

app.get('/response',async(req,res)=>{
    const result=await pool.query("SELECT * FROM feedbackresponse");
    res.json(result.rows);
})

app.post('/feedback', async(req,res)=>{
    const feedbackArray = req.body;
    try{
        for (const feedback of feedbackArray){
            const {question_id, answer} = feedback;
            await pool.query('UPDATE feedbackresponse SET answer=$1 WHERE id=$2',[answer,question_id]);
        }
        res.status(201).json({message: 'Feedback saved successfully'})
    }catch(err){
        console.log(err);
    }
})

app.listen(PORT,()=>{ 
    console.log(`Server is running on ${PORT}`);
})       