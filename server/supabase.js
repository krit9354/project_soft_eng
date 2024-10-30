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
  // console.log(req.body);
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
  // console.log(req.body);
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

app.post('/summary', async (req, res) => {
  const id = req.body.id
  const selectedGroup = req.body.selectedGroup
  const dateStart = req.body.dateStart
  const dateEnd = req.body.dateEnd
  const Search = req.body.Search
  const start_year = req.body.start_year
  const end_year = req.body.end_year
  // console.log('start_year',start_year)
  // console.log('end Year',end_year)
  let IncomeDataSearch = [];
  let ExpenseDataSearch = [];
  let CountIncomeSearch = 0;
  let CountExpenseSearch = 0;

  console.log(req.body)
  const { data: IncomeData, error: IncomeError } = await supabase
    .from('transaction')
    .select('money,created_at,is_income, pocket!inner(user_id)')
    .eq('is_income', true)
    .eq('pocket.user_id', id)
    .gte('created_at', `${start_year} 00:00:00`)
    .lte('created_at', `${end_year} 23:59:59`);

  console.log(IncomeData)
  if (IncomeError) {
    console.log(IncomeError);
    throw IncomeError
  }
  const { data: ExpenseData, error: ExpenseError } = await supabase
    .from('transaction')
    .select('money,created_at, is_income, pocket!inner(user_id)')
    .eq('is_income', false)
    .eq('pocket.user_id', id)
    .gte('created_at', `${start_year} 00:00:00`)
    .lte('created_at', `${end_year} 23:59:59`);
  // console.log(ExpenseData)
  if (ExpenseError) {
    console.log(ExpenseError);
    throw ExpenseError
  }
  const { count: CountIncome, error: CountIncomeError } = await supabase
    .from('transaction')
    .select('money, is_income, pocket!inner(user_id)', { count: 'exact' })
    .eq('is_income', true)
    .eq('pocket.user_id', id)
    .gte('created_at', `${start_year} 00:00:00`)
    .lte('created_at', `${end_year} 23:59:59`);
  // console.log(CountIncome)
  const { count: CountExpense, error: CountExpenseError } = await supabase
    .from('transaction')
    .select('money, is_income, pocket!inner(user_id)', { count: 'exact' })
    .eq('is_income', false)
    .eq('pocket.user_id', id)
    .gte('created_at', `${start_year} 00:00:00`)
    .lte('created_at', `${end_year} 23:59:59`);
  if (Search == true) {
    console.log('true')
    const { data: IncomeDataSearchResult, error: IncomeErrorSearch } = await supabase
      .from('transaction')
      .select('money, created_at ,is_income, pocket!inner(user_id)')
      .eq('is_income', true)
      .eq('pocket.user_id', id)
      .gte('created_at', `${dateStart} 00:00:00`)
      .lte('created_at', `${dateEnd} 23:59:59`);

    console.log("IncomeRRR", IncomeDataSearchResult)
    IncomeDataSearch = IncomeDataSearchResult;
    if (IncomeErrorSearch) {
      console.log(IncomeErrorSearch);
      throw IncomeErrorSearch
    }
    const { data: ExpenseDataSearchResult, error: ExpenseErrorSearch } = await supabase
      .from('transaction')
      .select('money, created_at ,is_income, pocket!inner(user_id)')
      .eq('is_income', false)
      .eq('pocket.user_id', id)
      .gte('created_at', `${dateStart} 00:00:00`)
      .lte('created_at', `${dateEnd} 23:59:59`);
    ExpenseDataSearch = ExpenseDataSearchResult;
    if (ExpenseErrorSearch) {
      console.log(ExpenseErrorSearch);
      throw ExpenseErrorSearch
    }
    const { count: CountIncomeSearchResult, error: CountIncomeErrorSearch } = await supabase
      .from('transaction')
      .select('money, is_income, pocket!inner(user_id)', { count: 'exact' })
      .eq('is_income', true)
      .eq('pocket.user_id', id)
      .gte('created_at', `${dateStart} 00:00:00`)
      .lte('created_at', `${dateEnd} 23:59:59`);
    CountIncomeSearch = CountIncomeSearchResult;
    const { count: CountExpenseSearchResult, error: CountExpenseErrorSearch } = await supabase
      .from('transaction')
      .select('money, is_income, pocket!inner(user_id)', { count: 'exact' })
      .eq('is_income', false)
      .eq('pocket.user_id', id)
      .gte('created_at', `${dateStart} 00:00:00`)
      .lte('created_at', `${dateEnd} 23:59:59`);
    CountExpenseSearch = CountExpenseSearchResult;
  }
  // console.log('Income Search', IncomeDataSearch)
  // console.log('Expense Search', ExpenseDataSearch)
  // console.log('Count Income Search', CountIncomeSearch)
  // console.log('Count Expense Search', CountExpenseSearch)

  // const groupedData = IncomeDataSearch.reduce((acc, transaction) => {
  //   // สร้าง key ที่รวมเดือนและปีจาก created_at
  //   const date = new Date(transaction.created_at);
  //   const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

  //   // ถ้าไม่มีข้อมูลของ month/year นี้ใน acc ให้เริ่มต้นค่า sumMoney เป็น 0
  //   if (!acc[yearMonth]) {
  //     acc[yearMonth] = { month: yearMonth, sumMoney: 0 };
  //   }

  //   // บวกค่า money ของ transaction ปัจจุบันเข้ากับ month/year ที่กำลังสะสม
  //   acc[yearMonth].sumMoney += transaction.money;

  //   return acc;
  // }, {});

  // // เปลี่ยนข้อมูลเป็น array เพื่อความสะดวกในการใช้งาน
  // const groupedArray = Object.values(groupedData);

  // console.log("Dataที่กรุ๊ป",groupedArray);
  // console.log(data)
  if (Search == true) {
    const groupedDataIncome = IncomeDataSearch.reduce((acc, transaction) => {
      const date = new Date(transaction.created_at);
      const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!acc[yearMonth]) {
        acc[yearMonth] = { month: yearMonth, sumMoney: 0, type: 'income' };
      }
      acc[yearMonth].sumMoney += transaction.money;
      return acc;
    }, {});
    const groupedArrayIncome = Object.values(groupedDataIncome);
    const average_moneyIncome = groupedArrayIncome.reduce((sum, row) => sum + row.sumMoney, 0) / groupedArrayIncome.length;
    const groupedDataExpense = ExpenseDataSearch.reduce((acc, transaction) => {
      const date = new Date(transaction.created_at);
      const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!acc[yearMonth]) {
        acc[yearMonth] = { month: yearMonth, sumMoney: 0, type: 'expense' };
      }
      acc[yearMonth].sumMoney += transaction.money;
      return acc;
    }, {});
    const groupedArrayExpense = Object.values(groupedDataExpense);
    const average_moneyExpense = groupedArrayExpense.reduce((sum, row) => sum + row.sumMoney, 0) / groupedArrayExpense.length;
    const average_money = {
      Income: Math.trunc(average_moneyIncome),
      Expense: Math.trunc(average_moneyExpense)
    };
    console.log(groupedArrayIncome);
    console.log(groupedArrayExpense);
    const data = {
      SumIncome: IncomeDataSearch.reduce((sum, row) => sum + row.money, 0),
      SumExpense: ExpenseDataSearch.reduce((sum, row) => sum + row.money, 0),
      CountIncome: CountIncomeSearch,
      CountExpense: CountExpenseSearch,
      average_money: average_money,
      Income_each_month: groupedArrayIncome,
      Expense_each_month: groupedArrayExpense
    }
    res.send(data)
  } else {
    const groupedDataIncome = IncomeData.reduce((acc, transaction) => {
      const date = new Date(transaction.created_at);
      const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!acc[yearMonth]) {
        acc[yearMonth] = { month: yearMonth, sumMoney: 0, type: 'income' };
      }
      acc[yearMonth].sumMoney += transaction.money;
      return acc;
    }, {});
    const groupedArrayIncome = Object.values(groupedDataIncome);
    const average_moneyIncome = groupedArrayIncome.reduce((sum, row) => sum + row.sumMoney, 0) / groupedArrayIncome.length;
    const groupedDataExpense = ExpenseData.reduce((acc, transaction) => {
      const date = new Date(transaction.created_at);
      const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!acc[yearMonth]) {
        acc[yearMonth] = { month: yearMonth, sumMoney: 0, type: 'expense' };
      }
      acc[yearMonth].sumMoney += transaction.money;
      return acc;
    }, {});
    const groupedArrayExpense = Object.values(groupedDataExpense);
    const average_moneyExpense = groupedArrayExpense.reduce((sum, row) => sum + row.sumMoney, 0) / groupedArrayExpense.length;
    const average_money = {
      Income: Math.trunc(average_moneyIncome),
      Expense: Math.trunc(average_moneyExpense)
    };
    const data = {
      SumIncome: IncomeData.reduce((sum, row) => sum + row.money, 0),
      SumExpense: ExpenseData.reduce((sum, row) => sum + row.money, 0),
      CountIncome: CountIncome,
      CountExpense: CountExpense,
      average_money: average_money,
      Income_each_month: groupedArrayIncome,
      Expense_each_month: groupedArrayExpense
    }
    res.send(data)
  }
});

app.post('/summary_pocket', async (req, res) => {
  const id = req.body.id
  const pocket_id = 1
  const { data: IncomeData, error: IncomeError } = await supabase
    .from('transaction')
    .select('money,created_at,is_income,pocket_id, pocket!inner(user_id)')
    .eq('is_income', true)
    .eq('pocket_id', pocket_id)
    .eq('pocket.user_id', id)



  console.log("แต่ละpock", IncomeData)
  if (IncomeError) {
    console.log(IncomeError);
    throw IncomeError
  }
  const { data: ExpenseData, error: ExpenseError } = await supabase
    .from('transaction')
    .select('money,created_at, is_income, pocket!inner(user_id)')
    .eq('is_income', false)
    .eq('pocket_id', pocket_id)
    .eq('pocket.user_id', id)

  // console.log(ExpenseData)
  if (ExpenseError) {
    console.log(ExpenseError);
    throw ExpenseError
  }
  const { count: CountIncome, error: CountIncomeError } = await supabase
    .from('transaction')
    .select('money, is_income, pocket!inner(user_id)', { count: 'exact' })
    .eq('is_income', true)
    .eq('pocket_id', pocket_id)
    .eq('pocket.user_id', id)

  // console.log(CountIncome)
  const { count: CountExpense, error: CountExpenseError } = await supabase
    .from('transaction')
    .select('money, is_income, pocket!inner(user_id)', { count: 'exact' })
    .eq('is_income', false)
    .eq('pocket_id', pocket_id)
    .eq('pocket.user_id', id)
  const groupedDataIncome = IncomeData.reduce((acc, transaction) => {
    const date = new Date(transaction.created_at);
    const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    if (!acc[yearMonth]) {
      acc[yearMonth] = { month: yearMonth, sumMoney: 0, type: 'income' };
    }
    acc[yearMonth].sumMoney += transaction.money;
    return acc;
  }, {});
  const groupedArrayIncome = Object.values(groupedDataIncome);
  const average_moneyIncome = groupedArrayIncome.reduce((sum, row) => sum + row.sumMoney, 0) / groupedArrayIncome.length;
  const groupedDataExpense = ExpenseData.reduce((acc, transaction) => {
    const date = new Date(transaction.created_at);
    const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    if (!acc[yearMonth]) {
      acc[yearMonth] = { month: yearMonth, sumMoney: 0, type: 'expense' };
    }
    acc[yearMonth].sumMoney += transaction.money;
    return acc;
  }, {});
  const groupedArrayExpense = Object.values(groupedDataExpense);
  const average_moneyExpense = groupedArrayExpense.reduce((sum, row) => sum + row.sumMoney, 0) / groupedArrayExpense.length;
  const average_money = {
    Income: Math.trunc(average_moneyIncome),
    Expense: Math.trunc(average_moneyExpense)
  };
  const data = {
    SumIncome: IncomeData.reduce((sum, row) => sum + row.money, 0),
    SumExpense: ExpenseData.reduce((sum, row) => sum + row.money, 0),
    CountIncome: CountIncome,
    CountExpense: CountExpense,
    average_money: average_money,
    Income_each_month: groupedArrayIncome,
    Expense_each_month: groupedArrayExpense
  }
  console.log(data)
  res.send(data)

});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});