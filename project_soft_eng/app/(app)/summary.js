import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { myStyle } from '../../style/summary_style';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from 'dayjs';
import { BarChart } from 'react-native-chart-kit';


export default function Summary() {
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
            <View style={myStyle.pickerContainer}>
              <Picker
                selectedValue={selectedGroup}
                onValueChange={(itemValue) => setSelectedGroup(itemValue)}
                style={myStyle.picker}
              >
                <Picker.Item label="รายรับ-รายจ่าย" value="in_out" />
                <Picker.Item label="รายรับ" value="in" />
                <Picker.Item label="รายจ่าย" value="out" />
              </Picker>
            </View>
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
            <View style={myStyle.containerButtonFilter}>
              <TouchableOpacity style={myStyle.button}>
                <Text style={myStyle.buttonText}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity style={myStyle.button}>
                <Text style={myStyle.buttonText}>Clear</Text>
              </TouchableOpacity>
            </View>


            <BarChart
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
            />






            <View style={myStyle.containerShow}>
              <View style={myStyle.box}>
                <Text style={{ fontSize: 15 }}>รวมเงินเข้า (บาท)</Text>
                <Text style={{ fontSize: 15 }}>{moneyIn}</Text>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', marginTop: '2%' }}>
                  <Text style={{ fontSize: 12 }}>รายการ</Text>
                  <Text style={{ fontSize: 12 }}>113</Text>
                </View>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', }}>
                  <Text style={{ fontSize: 12 }}>เฉลี่ย/เดิอน</Text>
                  <Text style={{ fontSize: 12 }}>113</Text>
                </View>
              </View>
              <View style={myStyle.box}>
                <Text style={{ fontSize: 15 }}>รวมเงินออก (บาท)</Text>
                <Text style={{ fontSize: 15 }}>{moneyOut}</Text>
                <View style={{ justifyContent: "space-between", flexDirection: 'row', marginTop: '2%' }}>
                  <Text style={{ fontSize: 12 }}>รายการ</Text>
                  <Text style={{ fontSize: 12 }}>113</Text>
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