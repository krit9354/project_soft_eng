import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Dimensions,ActivityIndicator } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { myStyle } from '../../../style/summary_pocket_style';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from 'dayjs';
import { BarChart } from "react-native-gifted-charts";
import axios from 'axios';
import { useSession } from '../../../components/ctx';
import { Use } from 'react-native-svg';
import { ip } from '../../../config';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import BottomBar from '../../../components/bottomBar';
export default function Summary_pocket() {
  const { session } = useSession();
  const [SumIncome, setSumIncome] = useState(0);
  const [SumExpense, setSumExpense] = useState(0);
  const [CountIncome, setCountIncome] = useState(0);
  const [CountExpense, setCountExpense] = useState(0);
  const [AvgIncome, setAvgIncome] = useState(0);
  const [AvgExpense, setAvgExpense] = useState(0);
  const [GraphData, setGraphData] = useState([]);
  const [maxValueGraph, setMaxValueGraph] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useLocalSearchParams();
  const [pocketName, setPocketName] = useState('');
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

    console.log(session.id)
    console.log(ip)
    setIsLoading(true);
    try {
      const res = await axios.post('http://' + ip + ':8080/summary_pocket', {
        id: session.id,
        pocket_id: id
      });
      console.log(res.data);
      setSumIncome(res.data.SumIncome);
      setSumExpense(res.data.SumExpense)
      setCountIncome(res.data.CountIncome);
      setCountExpense(res.data.CountExpense);
      setAvgIncome(res.data.average_money.Income);
      setAvgExpense(res.data.average_money.Expense);
      setPocketName(res.data.pocket_name);
      const barData = createBarData(res.data.Expense_each_month, res.data.Income_each_month);
      console.log(barData);
      setGraphData(barData);

      setIsLoading(false);



    } catch (err) {
      console.log("err :", err.message)
    }
  }
  useEffect(() => {
    fetchData();
    console.log("use finish")
  }
    , [])





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

  

  const renderTitle = () => {
    return (
      <View style={{ marginTop:0,height:50,paddingBottom:10  }}>
      <Text
          style={{
            color: 'black',
            fontSize: 20,
            // fontWeight: 'bold',
            textAlign: 'center',
            
          }}>
          รายรับ-รายจ่าย Pocket {pocketName}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // height: 20,
            // backgroundColor: 'yellow',
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
          <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 20 }}>Summary Pocket</Text>
          <View style={myStyle.containerInput}>

            
          
            <View style={{
              paddingTop: 10,
              // backgroundColor: 'red',
              borderRadius: 10,
              
              height: containerHeight * 0.55,
              
            }}>
               {renderTitle()}

              <ScrollView
                marginTop= {containerHeight*0.04}
                width={containerWidth}
                // backgroundColor='red'
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{ flexDirection: 'row' }}
              >
             
              <BarChart
                data={GraphData}
                barWidth={8}
                spacing={24}
                roundedTop
                roundedBottom
                yAxisTextStyle={{ color: 'gray' }}
                noOfSections={3}
                maxValue={maxValueGraph}
                style={{ width: 1500, height: 30  }} // ขนาดกราฟ
              />

              </ScrollView>
            </View>
            <View style={myStyle.containerShow}>
              <View style={[myStyle.box, { backgroundColor: "#0AB17B" }]}>
                <Text style={{ fontSize: 15 ,color:'white'}}>รวมเงินเข้า (บาท)</Text>
                <Text style={{ fontSize: 18,textAlign: 'center', alignSelf: 'center' ,color:'white'}}>{SumIncome ?? 'Error'}</Text>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', marginTop: '2%' }}>
                  <Text style={{ fontSize: 12 ,color:'white'}}>รายการ</Text>
                  <Text style={{ fontSize: 14,color:'white' }}>{CountIncome ?? 'Error'}</Text>
                </View>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', }}>
                  <Text style={{ fontSize: 12 ,color:'white'}}>เฉลี่ย/เดิอน</Text>
                  <Text style={{ fontSize: 14,color:'white' }}>{AvgIncome ?? 'Error'}</Text>
                </View>
              </View>
              <View style={[myStyle.box, { backgroundColor: "#bd3128" }]}>
                <Text style={{ fontSize: 15,color:'white' }}>รวมเงินออก (บาท)</Text>
                <Text style={{ fontSize: 18, textAlign: 'center', alignSelf: 'center',color:'white'}}>{SumExpense ?? "Error"}</Text>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', marginTop: '2%' }}>
                  <Text style={{ fontSize: 12 ,color:'white'}}>รายการ</Text>
                  <Text style={{ fontSize: 14 ,color:'white'}}>{CountExpense ?? 'Error'}</Text>
                </View>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', }}>
                  <Text style={{ fontSize: 12 ,color:'white'}}>เฉลี่ย/เดิอน</Text>
                  <Text style={{ fontSize: 14 ,color:'white'}}>{AvgExpense ?? "Error"}</Text>
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