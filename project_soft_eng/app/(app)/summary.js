import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
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

export default function Summary() {
  const { session } = useSession();
  const [SumIncome, setSumIncome] = useState(0);
  const [SumExpense, setSumExpense] = useState(0);
  const [CountIncome, setCountIncome] = useState(0);
  const [CountExpense, setCountExpense] = useState(0);
  const [Search, setSearch] = useState(false);
  const [Clear, setClear] = useState(false);
  const barData = [
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 20, frontColor: '#ED6665' },
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 40, frontColor: '#ED6665' },
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 25, frontColor: '#ED6665' },
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 20, frontColor: '#ED6665' },
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 40, frontColor: '#ED6665' },
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 30, frontColor: '#ED6665' },
    {
      value: 50,
      label: 'Jul',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 35, frontColor: '#ED6665' },
    {
      value: 80,
      label: 'Aug',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 45, frontColor: '#ED6665' },
    {
      value: 70,
      label: 'Sep',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 40, frontColor: '#ED6665' },
    {
      value: 85,
      label: 'Oct',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 50, frontColor: '#ED6665' },
    {
      value: 95,
      label: 'Nov',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 60, frontColor: '#ED6665' },
    {
      value: 100,
      label: 'Dec',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 55, frontColor: '#ED6665' },
  ];


  useEffect(() => {
    if (Search) {
      fetchData();
    }
    setSearch(false);
  }, [Search]); // Runs only when Search changes to true

  const handlePressSearch = () => {
    setSearch(true);
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
  };


  const fetchData = async () => {
    console.log(dateStart)
    console.log(dateEnd)
    console.log(session.id)
    console.log(ip)
    console.log(Search)
    try {
      const res = await axios.post('http://' + ip + ':8080/summary', {
        id: session.id,
        selectedGroup: selectedGroup,
        dateStart: dayjs(dateStart).format('YYYY-MM-DD'),
        dateEnd: dayjs(dateEnd).format('YYYY-MM-DD'),
        Search: Search
      });
      console.log(res.data);
      setSumIncome(res.data.SumIncome);
      setSumExpense(res.data.SumExpense)
      setCountIncome(res.data.CountIncome);
      setCountExpense(res.data.CountExpense);
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


  return (

    <LinearGradient
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
                style={myStyle.button}
                onPress={handlePressClear}
              >
                <Text style={myStyle.buttonText}>Clear</Text>
              </TouchableOpacity>
            </View>


            {/* <BarChart
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    data: [20, 45, 28, 80, 99, 43, 2000],
                  },
                ],
              }}
              width={containerWidth*0.95}
              height={containerHeight*0.4}
              // yAxisLabel={'Rs'}
              yAxisLabel="$"
              chartConfig={chartConfig}
              style={{
                marginVertical: 8,
                borderRadius: 10,
              }}
            /> */}
            {/* {renderTitle()}
            <BarChart
          data={barData}
          barWidth={10}
          spacing={24}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{color: 'gray'}}
          noOfSections={3}
          maxValue={75}
        /> */}
            {/* best */}
            {/* <View
              style={{
                backgroundColor: '#FFFFFF',
                // paddingBottom: 40,
                borderRadius: 10,
              }}>
              <BarChart
                data={barData}
                barWidth={8}
                spacing={24}
                roundedTop
                roundedBottom
                hideRules
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={{ color: 'gray' }}
                noOfSections={3}
                maxValue={75}
              />
            </View> */}

            <View style={{
              paddingTop: 10,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              // paddingHorizontal: 10,
              // paddingBottom: 40,
              height: containerHeight * 0.4,
            }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{ flexDirection: 'row' }}
              >
                <BarChart
                  data={barData}
                  barWidth={8}
                  spacing={24}
                  roundedTop
                  roundedBottom
                  hideRules
                  xAxisThickness={0}
                  yAxisThickness={0}
                  yAxisTextStyle={{ color: 'gray' }}
                  noOfSections={3}
                  maxValue={100}
                  style={{ width: 1500, height: 20 }} // ขนาดกราฟ
                />

              </ScrollView>
            </View>
            <View style={myStyle.containerShow}>
              <View style={myStyle.box}>
                <Text style={{ fontSize: 15 }}>รวมเงินเข้า (บาท)</Text>
                <Text style={{ fontSize: 15 }}>{SumIncome ?? 'Error'}</Text>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', marginTop: '2%' }}>
                  <Text style={{ fontSize: 12 }}>รายการ</Text>
                  <Text style={{ fontSize: 12 }}>{CountIncome ?? 'Error'}</Text>
                </View>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', }}>
                  <Text style={{ fontSize: 12 }}>เฉลี่ย/เดิอน</Text>
                  <Text style={{ fontSize: 12 }}>113</Text>
                </View>
              </View>
              <View style={myStyle.box}>
                <Text style={{ fontSize: 15 }}>รวมเงินออก (บาท)</Text>
                <Text style={{ fontSize: 15 }}>{SumExpense ?? "Error"}</Text>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', marginTop: '2%' }}>
                  <Text style={{ fontSize: 12 }}>รายการ</Text>
                  <Text style={{ fontSize: 12 }}>{CountExpense ?? 'Error'}</Text>
                </View>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', }}>
                  <Text style={{ fontSize: 12 }}>เฉลี่ย/เดิอน</Text>
                  <Text style={{ fontSize: 12 }}>113</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* bottom bar */}

    </LinearGradient>
  );
}