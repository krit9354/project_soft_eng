const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase_url = process.env.SUPABASE_URL
const supabase_anon_key = process.env.SUPABASE_ANON_KEY

// Create a single supabase client for interacting with your database
const supabase = createClient(supabase_url, supabase_anon_key)


const express = require('express');
const multer = require('multer');
var cors = require('cors');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const app = express();
const port = 8080;
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/get-pockets', async (req, res) => {
  const { userId } = req.body;


  try {
    const { data, error } = await supabase
      .from('pocket') 
      .select('pocket_name, id, money')
      .eq('user_id', userId);

    if (error) {
      // throw error;
      res.status(500);
      console.log(error);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching pockets:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/create-transaction', upload.single('image'), async (req, res) => {
  const { amount, pocket_id, details, is_income, userId } = req.body;
  let imageUrl = null;
  let haveimgkub = false;
  const detailsValue = (details === "null" || details === "") ? null : details;
  console.log("Details Value:", details);
  const file = req.file;


  if (file && userId) {
    const fileName = `${userId}-${Date.now()}.jpg`;

    try {

      const { data, error } = await supabase.storage
        .from('transaction')
        .upload(fileName, file.buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.mimetype,
        });

      if (error) {
        console.error('Error uploading image:', error.message);
        return res.status(500).json({ error: error.message });
      }


      const { data: { publicUrl } } = supabase.storage
        .from('transaction')
        .getPublicUrl(fileName);
      imageUrl = publicUrl;
      haveimgkub = true;
      console.log("Generated Image URL:", imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error.message);
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  }


  const { error: insertError } = await supabase
    .from('transaction')
    .insert({
      money: parseFloat(amount),
      pocket_id: pocket_id,
      event: detailsValue,
      is_income: is_income,
      img: imageUrl,
      have_img: haveimgkub
    });

  if (insertError) {
    console.error('Error inserting data into Supabase:', insertError.message);
    return res.status(500).json({ error: insertError.message });
  }
  console.log("Data inserted successfully with Image URL:", imageUrl);
  res.status(200).json({ message: 'Transaction created', url: imageUrl });
});


app.post('/createpockets', upload.single('image'), async (req, res) => {
  const { pocketname, goal, havetarget, userId } = req.body;
  let imageUrl = null;
  const file = req.file;

  if (file) {
    const fileName = `${userId}-${Date.now()}.jpg`;

    try {

      const { data, error } = await supabase.storage
        .from('pocket')
        .upload(fileName, file.buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.mimetype
        });

      if (error) {
        console.error('Error uploading image:', error.message);
        return res.status(500).json({ error: error.message });
      }
      console.log("File Path in Storage:", data.path);
      console.log("File Name:", fileName);

      const { data: { publicUrl } } = supabase.storage
        .from('pocket')
        .getPublicUrl(fileName);
      imageUrl = publicUrl;
      console.log("Generated Image URL:", imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error.message);
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  }


  const { error: insertError } = await supabase
    .from('pocket')
    .insert({
      pocket_name: pocketname,
      have_target: havetarget,
      target: goal,
      user_id: userId,
      money: 0,
      image: imageUrl
    });

  if (insertError) {
    console.error('Error inserting data into Supabase:', insertError.message);
    return res.status(500).json({ error: insertError.message });
  }
  console.log("Data inserted successfully with Image URL:", imageUrl);
  res.status(200).json({ message: 'Pocket created', url: imageUrl });
});
;


// app.post('/createpockets', async (req, res) => {
//   const  inputdata  = req.body;
//   console.log(inputdata)
//   const { error } = await supabase
//   .from('pocket')
//   .insert({pocket_name: req.body.pocketname, have_target : req.body.havetarget , target : req.body.goal , user_id : req.body.userId})


//   if (error) {
//     console.error("Error fetching data from Supabase:", error.message);
//     return res.status(500).json({ error: error.message });
//   }

//   // console.log(data)
// });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/transactionid', async (req, res) => {
  const { pocketid } = req.body;

  const { data, error } = await supabase
    .from('transaction')
    .select("*")
    .eq("pocket_id", pocketid)

  if (error) {
    console.error("Error fetching data from Supabase:", error.message);
    return res.status(500).json({ error: error.message });
  }

  console.log(pocketid)
  res.send(data)
});

app.post('/pockets', async (req, res) => {
  const { userId } = req.body;
  console.log(userId)
  const { data, error } = await supabase
    .from('pocket')
    .select("*")
    .eq("user_id", userId)
  if (error) {
    console.error("Error fetching data from Supabase:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.send(data)
});

// app.post('/user_data', async (req, res) => {
//   const { userId } = req.body;
//   console.log(userId)

//   if (error) {
//     console.error("Error fetching data from Supabase:", error.message);
//     return res.status(500).json({ error: error.message });
//   }
//   console.log(data)
//   res.send(data)
// });


app.post('/login', async (req, res) => {
  console.log(req.body);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  })
  if (error) {
    console.log(error);
    // throw error
    return res.status(500)
  } else {
    console.log(data.user.id)

    const userdata = await supabase
      .from('profiles')
      .select("*")
      .eq("id", data.user.id)
    if (error) {
      console.error("Error fetching data from Supabase:", error.message);
      return res.status(500).json({ error: error.message });
    }
    console.log("user_data",userdata.data)
    userdata.data[0]
    res.send(userdata.data[0])
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
    res.status(500)
    // throw error
  } else {
    console.log("id user",data.user.id);
    
    const { error } = await supabase
      .from('pocket')
      .insert({pocket_name: 'main',user_id: data.user.id, money: 0})
    if (error) {
      console.log("error of insert pocket",error);
      throw error
    }
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

  console.log("body summary", req.body)
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
    //throw IncomeError
    res.status(500)
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
    //throw ExpenseError
    res.status(500)
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
      //throw IncomeErrorSearch
      res.status(500)
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
      //throw ExpenseErrorSearch
      res.status(500)
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
    // let average_moneyIncome = 0;
    // let average_moneyExpense = 0;
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
  const pocket_id = req.body.pocket_id
  console.log('pocket_id', pocket_id)
  // const pocket_id = 1
  const { data: pocket_name, error: pocket_nameError } = await supabase
    .from('pocket')
    .select('pocket_name')
    .eq('id', pocket_id)
  console.log('pockettttttt', pocket_name[0].pocket_name)
  const { data: IncomeData, error: IncomeError } = await supabase
    .from('transaction')
    .select('money,created_at,is_income,pocket_id, pocket!inner(user_id)')
    .eq('is_income', true)
    .eq('pocket_id', pocket_id)
    .eq('pocket.user_id', id)



  console.log("แต่ละpocket1", IncomeData)
  if (IncomeError) {
    console.log(IncomeError);
    //throw IncomeError
    res.status(500)
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
    res.status(500)
    //throw ExpenseError
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
    Expense_each_month: groupedArrayExpense,
    pocket_name: pocket_name[0].pocket_name
  }
  console.log(data)
  res.send(data)

});


app.post('/pocketpocket', async (req, res) => {
  const  {pocketid}  = req.body;
  const { data, error } = await supabase
  .from('pocket')
  .select("*")
  .eq("id",pocketid)
  .single()
  if (error) {
    console.error("Error fetching data from Supabase:", error.message);
    return res.status(500).json({ error: error.message });
  }
  console.log(pocketid)
  res.send(data)
});



app.post('/edit_profile', upload.single('image'), async (req, res) => {
  const { userId,username,name_bank } = req.body;
  let imageUrl = null;
  const file = req.file;

  if (file) {
    const fileName = `${userId}-${Date.now()}.jpg`;

    try {

      const { data, error } = await supabase.storage
        .from('avatar')
        .upload(fileName, file.buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.mimetype
        });

      if (error) {
        console.error('Error uploading image:', error.message);
        return res.status(500).json({ error: error.message });
      }
      console.log("File Path in Storage:", data.path);
      console.log("File Name:", fileName);

      const { data: { publicUrl } } = supabase.storage
        .from('avatar')
        .getPublicUrl(fileName);
      imageUrl = publicUrl;
      console.log("Generated Image URL:", imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error.message);
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  }


  const { error: insertError } = await supabase
    .from('profiles')
    .update({
      avatar_url:imageUrl,
      username : username,
      name_bank : name_bank
    })
    .eq("id", userId);

  if (insertError) {
    console.error('Error inserting data into Supabase:', insertError.message);
    return res.status(500).json({ error: insertError.message });
  }
  console.log("Data inserted successfully with Image URL:", imageUrl);
  res.status(200).json({ message: 'Pocket created', url: imageUrl });
});
;


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});