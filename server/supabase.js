const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase_url = process.env.SUPABASE_URL
const supabase_anon_key = process.env.SUPABASE_ANON_KEY

// Create a single supabase client for interacting with your database
const supabase = createClient(supabase_url, supabase_anon_key)


const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/pockets', (req, res) => {
  res.send([
    { Pocket_name: "food", Money: 2001, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM=" },
    { Pocket_name: "saving", Money: 3002, Have_target: true, Target: 5000, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM=" },
    { Pocket_name: "car", Money: 10000, Have_target: true, Target: 20000, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM=" },
    { Pocket_name: "cat", Money: 3000, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM=" },
    { Pocket_name: "snack", Money: 100, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ=" },
    { Pocket_name: "cat", Money: 3000, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ=" },
    { Pocket_name: "snack", Money: 100, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ=" },
    { Pocket_name: "แต่งรถ", Money: 3000, Have_target: false, Target: 0, Image: "https://i.pinimg.com/originals/12/5a/80/125a80c3e0ac8fe910173c05476add4b.jpg" },
    { Pocket_name: "ค่าน้ำมัน", Money: 100, Have_target: false, Target: 0, Image: "https://blog.carro.co/wp-content/uploads/2022/08/10-Items-For-Racing-Pickup-1.jpg" },
    { Pocket_name: "food", Money: 2000, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM=" },
    { Pocket_name: "saving", Money: 3000, Have_target: true, Target: 5000, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM=" },
    { Pocket_name: "car", Money: 10000, Have_target: true, Target: 20000, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM=" },
    { Pocket_name: "cat", Money: 3000, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM=" },
    { Pocket_name: "snack", Money: 100, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ=" },
    { Pocket_name: "cat", Money: 3000, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ=" },
    { Pocket_name: "snack", Money: 100, Have_target: false, Target: 0, Image: "https://media.istockphoto.com/id/1312283557/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81.jpg?s=612x612&w=0&k=20&c=QNGNu2l7RHO7deaR3ZPOn2TuHYtnkbskR-V0lsxmPxQ=" },
    { Pocket_name: "แต่งรถ", Money: 3000, Have_target: false, Target: 0, Image: "https://i.pinimg.com/originals/12/5a/80/125a80c3e0ac8fe910173c05476add4b.jpg" },
    { Pocket_name: "ค่าน้ำมัน", Money: 100, Have_target: false, Target: 0, Image: "https://blog.carro.co/wp-content/uploads/2022/08/10-Items-For-Racing-Pickup-1.jpg" },
  ]);
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  })
  if (error) {
    console.log(error);
    throw error
  } else {
    console.log(data);
    res.send(data);
  }
});

app.post('/register', async (req, res) => {
  console.log(req.body);
  const { data, error } = await supabase.auth.signUp(
    {
      email: req.body.email,
      password: req.body.password,
      options: {
        data: {
          username: req.body.username,
        },
      },
    }
  );
  if (error) {
    console.log(error);
    throw error
  } else {
    console.log(data);
    res.send(data);
  }
});

app.post('/summary',async(req,res)=>{
  const id = req.body.id
  console.log(id)

  
  const { data: IncomeData, error : IncomeError } = await supabase
  .from('transaction')
  .select('money, is_income, pocket!inner(user_id)',{count:'exact'}) 
  .eq('is_income', true) 
  .eq('pocket.user_id', id);
  console.log(IncomeData)
  if (IncomeError) {
    console.log(IncomeError);
    throw IncomeError
  }
  const { data: ExpenseData, error : ExpenseError } = await supabase
  .from('transaction')
  .select('money, is_income, pocket!inner(user_id)') 
  .eq('is_income', false) 
  .eq('pocket.user_id', id);
  console.log(ExpenseData)
  if (ExpenseError) {
    console.log(ExpenseError);
    throw ExpenseError
  }

  const { count : CountIncome, error : CountIncomeError } = await supabase
  .from('transaction')
  .select('money, is_income, pocket!inner(user_id)',{ count: 'exact'}) 
  .eq('is_income', true) 
  .eq('pocket.user_id', id);
  console.log(CountIncome)
  const { count : CountExpense, error : CountExpenseError } = await supabase
  .from('transaction')
  .select('money, is_income, pocket!inner(user_id)',{ count: 'exact'}) 
  .eq('is_income', false) 
  .eq('pocket.user_id', id);
  console.log(CountExpense)

  
  
  const data = {
    SumIncome : IncomeData.reduce((sum,row)=>sum+row.money,0),
    SumExpense : ExpenseData.reduce((sum,row)=>sum+row.money,0),
    CountIncome : CountIncome,
    CountExpense : CountExpense
  }
  res.send(data)
})
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});