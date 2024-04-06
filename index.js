const express = require("express");
const z = require("zod");
const app = express();

const objSchema = z.object({
    age: z.number(),
    kidneys: z.array(z.number()),
    username: z.string(),
    password: z.string()
})

app.use(express.json());
app.post('/test', (req, res)=> {
    const obj = req.body;
    const response = objSchema.safeParse(obj);
    console.log(response)
    if(response.success) {
        return res.status(200).json({msg: 'Everything looks good'})
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