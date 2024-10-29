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

app.post('/pockets', async (req, res) => {
  const { userId } = req.body;

  const { data, error } = await supabase
  .from('pocket')
  .select("*")
  .eq("user_id",userId)

  if (error) {
    console.error("Error fetching data from Supabase:", error.message);
    return res.status(500).json({ error: error.message });
  }

  console.log(data)
  res.send(data)
});

app.post('/total_money', async (req, res) => {
  const { userId } = req.body;
  const { data, error } = await supabase
  .from('pocket')
  .select("money")
  .eq("user_id",userId)

  if (error) {
    console.error("Error fetching data from Supabase:", error.message);
    return res.status(500).json({ error: error.message });
  }

  console.log(data)

  let sum = 0 ;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].money
  }

  console.log(sum)
  res.status(200).json({ total : sum });
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

  let IncomeDataSearch = [];
  let ExpenseDataSearch = [];
  let CountIncomeSearch = 0;
  let CountExpenseSearch = 0;

  console.log(req.body)
  const { data: IncomeData, error: IncomeError } = await supabase
    .from('transaction')
    .select('money,created_at,is_income, pocket!inner(user_id)')
    .eq('is_income', true)
    .eq('pocket.user_id', id);

  console.log(IncomeData)
  if (IncomeError) {
    console.log(IncomeError);
    throw IncomeError
  }
  const { data: ExpenseData, error: ExpenseError } = await supabase
    .from('transaction')
    .select('money,created_at, is_income, pocket!inner(user_id)')
    .eq('is_income', false)
    .eq('pocket.user_id', id);
  // console.log(ExpenseData)
  if (ExpenseError) {
    console.log(ExpenseError);
    throw ExpenseError
  }
  const { count: CountIncome, error: CountIncomeError } = await supabase
    .from('transaction')
    .select('money, is_income, pocket!inner(user_id)', { count: 'exact' })
    .eq('is_income', true)
    .eq('pocket.user_id', id);
  // console.log(CountIncome)
  const { count: CountExpense, error: CountExpenseError } = await supabase
    .from('transaction')
    .select('money, is_income, pocket!inner(user_id)', { count: 'exact' })
    .eq('is_income', false)
    .eq('pocket.user_id', id);
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
  console.log('Income Search', IncomeDataSearch)
  console.log('Expense Search', ExpenseDataSearch)
  console.log('Count Income Search', CountIncomeSearch)
  console.log('Count Expense Search', CountExpenseSearch)

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
        acc[yearMonth] = { month: yearMonth, sumMoney: 0 };
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
        acc[yearMonth] = { month: yearMonth, sumMoney: 0 };
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
      average_money: average_money
    }
    res.send(data)
  } else {
    const groupedDataIncome = IncomeData.reduce((acc, transaction) => {
      const date = new Date(transaction.created_at);
      const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!acc[yearMonth]) {
        acc[yearMonth] = { month: yearMonth, sumMoney: 0 };
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
        acc[yearMonth] = { month: yearMonth, sumMoney: 0 };
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
      average_money: average_money
    }
    res.send(data)
  }

})
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});