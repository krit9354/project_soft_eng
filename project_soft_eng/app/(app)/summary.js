import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { myStyle } from '../../style/summary_style';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from 'dayjs';
import { BarChart } from "react-native-gifted-charts";
import axios from 'axios';
import { useSession } from '../../components/ctx';
import { Use } from 'react-native-svg';
import { ip } from '../../config';
import { router } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BottomBar from '../../components/bottomBar';

export default function Summary() {
  const { session } = useSession();
  const [SumIncome, setSumIncome] = useState(0);
  const [SumExpense, setSumExpense] = useState(0);
  const [CountIncome, setCountIncome] = useState(0);
  const [CountExpense, setCountExpense] = useState(0);
  const [AvgIncome, setAvgIncome] = useState(0);
  const [AvgExpense, setAvgExpense] = useState(0);
  const [Search, setSearch] = useState(false);
  const [Clear, setClear] = useState(false);
  const [GraphData, setGraphData] = useState([]);
  const [maxValueGraph, setMaxValueGraph] = useState(0);
  const [this_year, setThis_year] = useState(dayjs().year());
  const [start_year, setStart_year] = useState(dayjs().startOf('year').format('YYYY-MM-DD'));
  const [end_year, setEnd_year] = useState(dayjs().endOf('year').format('YYYY-MM-DD'));
  const [showHeader, setShowHeader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mapping_month = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  }
  const barData = [
    {
      "value": 40,
      "label": "Jan",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 20,
      "frontColor": "#ED6665"
    },
    {
      "value": 50,
      "label": "Feb",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 40,
      "frontColor": "#ED6665"
    },
    {
      "value": 75,
      "label": "Mar",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 25,
      "frontColor": "#ED6665"
    },
    {
      "value": 30,
      "label": "Apr",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 20,
      "frontColor": "#ED6665"
    },
    {
      "value": 60,
      "label": "May",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 40,
      "frontColor": "#ED6665"
    },
    {
      "value": 65,
      "label": "Jun",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 30,
      "frontColor": "#ED6665"
    },
    {
      "value": 50,
      "label": "Jul",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 35,
      "frontColor": "#ED6665"
    },
    {
      "value": 80,
      "label": "Aug",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 45,
      "frontColor": "#ED6665"
    },
    {
      "value": 70,
      "label": "Sep",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 40,
      "frontColor": "#ED6665"
    },
    {
      "value": 85,
      "label": "Oct",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 50,
      "frontColor": "#ED6665"
    },
    {
      "value": 95,
      "label": "Nov",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 60,
      "frontColor": "#ED6665"
    },
    {
      "value": 100,
      "label": "Dec",
      "spacing": 2,
      "labelWidth": 30,
      "labelTextStyle": { "color": "gray" },
      "frontColor": "#177AD5"
    },
    {
      "value": 55,
      "frontColor": "#ED6665"
    }
  ];


  useEffect(() => {
    if (Search) {
      fetchData();
    }
    setSearch(false);
  }, [Search]); // Runs only when Search changes to true

  const handlePressSearch = () => {
    setSearch(true);
    setShowHeader(true);
  };
  useEffect(() => {
    if (Clear) {
      fetchData();
    }
    setClear(false);
  }, [Clear]); // Runs only when Search changes to true

  const handlePressClear = () => {
    setClear(true);
    setSearch(false);
    setDateStart(new Date());
    setDateEnd(new Date());
    setShowHeader(false);
  };
  const createBarData = (expenseData, incomeData) => {
    const monthData = {};

    // รวมข้อมูลรายจ่ายและรายได้ในแต่ละเดือน
    [...expenseData, ...incomeData].forEach(data => {
      const [year, month] = data.month.split("-");
      const type = data.type;
      const key = `${year}-${month}`; // ใช้ปีและเดือนเป็น key

      // สร้างโครงสร้างข้อมูลสำหรับเดือนนี้ถ้ายังไม่มี
      if (!monthData[key]) {
        monthData[key] = { year, month, expense: 0, income: 0 };
      }

      // ใส่ค่า sumMoney ในประเภทที่ถูกต้อง (income หรือ expense)
      monthData[key][type] = data.sumMoney;
    });

    // จัดเรียงข้อมูลตามปีและเดือน
    const sortedMonths = Object.values(monthData).sort((a, b) => {
      if (a.year !== b.year) {
        return a.year.localeCompare(b.year);
      }
      return a.month.localeCompare(b.month);
    });

    // สร้าง barData ที่มีข้อมูลทั้ง income และ expense
    const barData = [];
    let maxValue = 0;
    sortedMonths.forEach(data => {
      maxValue = Math.max(maxValue, data.income, data.expense);
      setMaxValueGraph(maxValue);
      barData.push(
        {
          value: data.income,
          label: mapping_month[data.month],
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: { color: 'gray' },
          frontColor: '#38E298', // สีน้ำเงินสำหรับ income
        },
        {
          value: data.expense,
          frontColor: '#FF5A5A', // สีแดงสำหรับ expense
        }
      );
    });

    return barData;
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('http://' + ip + ':8080/summary', {
        id: session.id,
        selectedGroup: selectedGroup,
        dateStart: dayjs(dateStart).format('YYYY-MM-DD'),
        dateEnd: dayjs(dateEnd).format('YYYY-MM-DD'),
        start_year: start_year,
        end_year: end_year,
        Search: Search
      });

      setSumIncome(res.data.SumIncome);
      setSumExpense(res.data.SumExpense)
      setCountIncome(res.data.CountIncome);
      setCountExpense(res.data.CountExpense);
      setAvgIncome(res.data.average_money.Income);
      setAvgExpense(res.data.average_money.Expense);
      const barData = createBarData(res.data.Expense_each_month, res.data.Income_each_month);
      console.log(barData);
      setGraphData(barData);

      setIsLoading(false);


      console.log(Search)
    } catch (err) {
      console.log("err :", err.message)
    }
  }
  useEffect(() => {
    fetchData();
    console.log("use finish")
  }
    , [])



  const moneyIn = 2000
  const moneyOut = 1000
  const [selectedGroup, setSelectedGroup] = useState("");

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const chartConfig = {
    backgroundColor: '#333333', // สีพื้นหลังของกราฟ
    backgroundGradientFrom: '#6e6e6e', // ไล่สีจากเทาเข้ม
    backgroundGradientTo: '#c6c6c6',   // ไล่สีถึงเทาอ่อน

    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const [dateStart, setDateStart] = useState(new Date());
  const [isDateStartPickerVisible, setDateStartPickerVisibility] = useState(false);
  const showDateStartPicker = () => { setDateStartPickerVisibility(true); };
  const hideDateStartPicker = () => { setDateStartPickerVisibility(false); };
  function handleConfirmDateStart(date) {
    setDateStart(date);
    hideDateStartPicker();
  }

  const [dateEnd, setDateEnd] = useState(new Date());
  const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);
  const showDateEndPicker = () => { setDateEndPickerVisibility(true); };
  const hideDateEndPicker = () => { setDateEndPickerVisibility(false); };
  function handleConfirmDateEnd(date) {
    setDateEnd(date);
    hideDateEndPicker();
  }

  const renderTitle = () => {
    return (
      <View style={{ marginTop: 0, height: 50, paddingBottom: 20 }}>
        {!showHeader ?
          (<Text
            style={{
              color: 'black',
              fontSize: 16,
              // fontWeight: 'bold',
              textAlign: 'center',

            }}>
            รายรับ-รายจ่าย ปี {this_year}
          </Text>) : null
        }
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // height: 20,
            backgroundColor: 'white',
            paddingTop: 10,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#38E298',
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 16,
                color: 'black',
              }}>
              รายรับ
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#FF5A5A',
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 16,
                color: 'black',
              }}>
              รายจ่าย
            </Text>
          </View>
        </View>
      </View>
    )
  }
  return (
    isLoading ?
      <SafeAreaView style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        <ActivityIndicator size="large" />
      </SafeAreaView>
      :
      (<LinearGradient
        colors={["#CDFADB", "#38E298"]}
        locations={[0.75, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={myStyle.bg}
      >
        {/* main content */}
        <ScrollView showsVerticalScrollIndicator={false} style={myStyle.main_content_box} >
          <View style={myStyle.main_pocket}
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout; // ดึงค่าความกว้างที่แท้จริงของ container
              setContainerWidth(width);
              const { height } = event.nativeEvent.layout; // ดึงค่าความกว้างที่แท้จริงของ container
              setContainerHeight(height);
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 20 }}>Summary</Text>
            <View style={myStyle.containerInput}>
              {/* <View style={myStyle.pickerContainer}>
              <Picker
                selectedValue={selectedGroup}
                onValueChange={(itemValue) => setSelectedGroup(itemValue)}
                style={myStyle.picker}
              >
              

                <Picker.Item label="เลือกหมวดหมู่" value="" />
                <Picker.Item label="รายรับ-รายจ่าย" value="in_out" />
                <Picker.Item label="รายรับ" value="in" />
                <Picker.Item label="รายจ่าย" value="out" />
              </Picker>
            </View> */}
              <View style={myStyle.containerDate}>

                <TouchableOpacity onPress={showDateStartPicker} style={myStyle.inputDate}>
                  <Text style={myStyle.textDate}>{dateStart.toDateString()}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDateStartPickerVisible}
                  mode="date"
                  date={dateStart}
                  onConfirm={handleConfirmDateStart}
                  onCancel={hideDateStartPicker}
                />
                <Text style={myStyle.textDash}>-</Text>
                <TouchableOpacity onPress={showDateEndPicker} style={myStyle.inputDate}>
                  <Text style={myStyle.textDate}>{dateEnd.toDateString()}</Text>
                </TouchableOpacity>
                {/* <Text onPress={showDateEndPicker} style={myStyle.inputDate}>{dateEnd.toDateString()}</Text> */}
                <DateTimePickerModal
                  isVisible={isDateEndPickerVisible}
                  mode="date"
                  date={dateEnd}
                  onConfirm={handleConfirmDateEnd}
                  onCancel={hideDateEndPicker}
                />
              </View>
              <View style={myStyle.containerButtonFilter} >
                <TouchableOpacity
                  style={myStyle.button}
                  onPress={handlePressSearch}
                >
                  <Text style={myStyle.buttonText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[myStyle.button,{backgroundColor: "#939393"}]}
                  onPress={handlePressClear}
                >
                  <Text style={myStyle.buttonText}>Clear</Text>
                </TouchableOpacity>
            
              </View>
              <View style={{
                paddingTop: 10,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                // paddingHorizontal: 10,
                // paddingBottom: 40,
                height: containerHeight * 0.5,
              }}>
                {renderTitle()}
                <ScrollView
                  // backgroundColor='red'
                  width={containerWidth}
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  contentContainerStyle={{ flexDirection: 'row' }}
                  // backgroundColor='red'

                >

                  <BarChart
                    data={GraphData}
                    barWidth={8}
                    spacing={24}
                    roundedTop
                    roundedBottom
                    // hideRules
                    // xAxisThickness={0}
                    // yAxisThickness={0}
                    yAxisTextStyle={{ color: 'gray' }}
                    noOfSections={3}
                    maxValue={maxValueGraph}
                    style={{ width: 1500, height: 20 }} // ขนาดกราฟ
                  />

                </ScrollView>
              </View>
              <View style={myStyle.containerShow}>
                <View style={[myStyle.box, { backgroundColor: "#0AB17B" }]}
                >
                  <Text style={{ fontSize: 15 ,color:'white'}}>รวมเงินเข้า (บาท)</Text>
                  <Text style={{ fontSize: 18,textAlign: 'center', alignSelf: 'center',color:'white'}}>{SumIncome ?? 'Error'}</Text>
                  <View style={{ justifyContent: "space-between", flexDirection: 'row', marginTop: '2%',color:'white' }}>
                    <Text style={{ fontSize: 12 ,color:'white'}}>รายการ</Text>
                    <Text style={{ fontSize: 14,color:'white' }}>{CountIncome ?? 'Error'}</Text>
                  </View>
                  <View style={{ justifyContent: "space-between", flexDirection: 'row', }}>
                    <Text style={{ fontSize: 12 ,color:'white'}}>เฉลี่ย/เดิอน</Text>
                    <Text style={{ fontSize: 14 ,color:'white'}}>{AvgIncome ?? 'Error'}</Text>
                  </View>
                </View>
                <View style={[myStyle.box, { backgroundColor: "#bd3128" }]}>
                  <Text style={{ fontSize: 15,color:'white' }}>รวมเงินออก (บาท)</Text>
                  <Text style={{ fontSize: 18,textAlign: 'center', alignSelf: 'center',color:'white' }}>{SumExpense ?? "Error"}</Text>
                  <View style={{ justifyContent: "space-between", flexDirection: 'row', marginTop: '2%',color:'white' }}>
                    <Text style={{ fontSize: 12 ,color:'white'}}>รายการ</Text>
                    <Text style={{ fontSize: 14,color:'white' }}>{CountExpense ?? 'Error'}</Text>
                  </View>
                  <View style={{ justifyContent: "space-between", flexDirection: 'row', color:'white'}}>
                    <Text style={{ fontSize: 12,color:'white' }}>เฉลี่ย/เดิอน</Text>
                    <Text style={{ fontSize: 14,color:'white' }}>{AvgExpense ?? "Error"}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* bottom bar */}
        <BottomBar />
      </LinearGradient>)
  );
}