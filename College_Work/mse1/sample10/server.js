// code
const app=express();
app.get('/api/expenses',(req,res)=>{
    return res.send(expenses);
})

app.post('/api/expenses',(req,res)=>{
    const {title,amount,category} = req.body;
    if(!title || !amount || !category){
        return res.status(400).json({
            message:"Please provide ......"
        })
    }
    let newId =1;
    const expense = {
        id:newId+1,
        title,
        amount,
        category
    }
    expenses.push(expense);
})



app.get('/api/expenses/category/:category',(req,res)=>{
    const category = req.params.category;
    const expense = expenses.filter((e)=>e.category==category);
    return res.send(expense);
})


app.get('/api/expenses/summary',(req,res)=>{
    let total=0;
    expenses.forEach(e=> {
        total+=e.amount;
    });

})
