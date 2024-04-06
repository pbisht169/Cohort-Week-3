const express = require("express");
const z = require("zod");
const app = express();

const kidneysSchema = z.array(z.number())

app.use(express.json());
app.post('/test', (req, res)=> {
    const age = req.body.age;
    const kidneys = req.body.kidneys;
    const response = kidneysSchema.safeParse(kidneys)
    console.log(response)
    if(response.success) {
        if(kidneys.length > 0) {
            return res.json({msg : 'Everything is good'});
        }
    }
    
    return res.json({msg : 'Everything is not good', errorMsg: response.error.issues[0].message});
})

//Global catch
app.use(async(error, req, res, next)=> {
    //This middleware only runs when there is an exception in the above routes
    console.log('Reach 1')
    await next(error);
    console.log('After returning back from next()')
})
app.use((error, req, res, next)=> {
    //This middleware only runs when there is an exception in the above routes
    console.log('Reach 2', error)
    return res.status(500).json({
        msg: "Some exception is occured, please try again sometimesss"
    })
})

app.listen(3000, ()=> {
    console.log('Server is running at 3000')
});