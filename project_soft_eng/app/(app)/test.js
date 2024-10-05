import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { myStyle } from "../../style/addincome";
import { LinearGradient } from "expo-linear-gradient";
import PocketCard from "../../components/pocketCard";
import BottomBar from "../../components/bottomBar";
import { useNavigation } from "@react-navigation/native";
import { ip } from "../../config";
import axios from "axios";

const NewIncomeScreen = () => {
  const [amount, setAmount] = useState("");
  const [selectedPocket, setSelectedPocket] = useState("");
  const [details, setDetails] = useState("");

  return (
    <LinearGradient
      colors={["#CDFADB", "#38E298"]}
      locations={[0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={myStyle.bg}
    >
      {/* main content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={myStyle.main_content_box}
      >
        <View style={myStyle.main_pocket}>
          <View style={myStyle.container}>
            <Text style={myStyle.bigtext}>รายรับใหม่</Text>
            <Text style={myStyle.label}>ยอดเงิน</Text>
            <TextInput
              style={myStyle.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="จำนวนเงินที่ต้องการ"
              keyboardType="numeric"
            />

            <Text style={myStyle.label}>Pocket</Text>
            <View style={myStyle.pickerContainer}>
              <Picker
                selectedValue={selectedPocket}
                onValueChange={(itemValue) => setSelectedPocket(itemValue)}
                style={myStyle.picker}
              >
                <Picker.Item label="เลือก pocket" value="" />
                <Picker.Item label="Pocket 1" value="pocket1" />
                <Picker.Item label="Pocket 2" value="pocket2" />
              </Picker>
            </View>

            <Text style={myStyle.label}>รายละเอียด</Text>
            <TextInput
              style={[myStyle.input, myStyle.textArea]}
              value={details}
              onChangeText={setDetails}
              placeholder="รายละเอียด"
              multiline
              numberOfLines={4}
            />

            <Text style={myStyle.label}>รูป</Text>
            <TouchableOpacity style={myStyle.imagePlaceholder}>
              <Image
                source={require("../../assets/images/photoicon.png")} // เพิ่มรูปตาม URL หรือใช้โค้ดเพื่อให้ผู้ใช้เลือกรูป
                style={myStyle.image}
              />
            </TouchableOpacity>

          
          </View>
        </View>
      </ScrollView>

      {/* bottom bar */}
      <View style={myStyle.bottom_barkub}>
        <View>
        <TouchableOpacity style={myStyle.button}>
              <Text style={myStyle.buttonText}>ยืนยัน</Text>
            </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default NewIncomeScreen;
