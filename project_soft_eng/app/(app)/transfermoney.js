import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { myStyle } from "../../style/transfermoney_style";
import { LinearGradient } from "expo-linear-gradient";
import PocketCard from "../../components/pocketCard";
import BottomBar from "../../components/bottomBar";
import { useNavigation } from "@react-navigation/native";
import { ip } from "../../config";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import { useSession } from "../../components/ctx";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

const transfermoney = () => {
  const router = useRouter();
  const { pocketId } = useLocalSearchParams();
  const [pockets_send, setPockets_send] = useState([]);
  const [pocketId_send, setPocketId_send] = useState(null);
  const [pockets_re, setPockets_re] = useState([]);
  const [pocketId_re, setPocketId_re] = useState(null);
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [value, setValue] = useState(null);
  const [isFocussend, setIsFocussend] = useState(false);
  const [isFocusre, setIsFocusre] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageforshow, setSelectedImageforshow] = useState("");
  const { session } = useSession();
  const [moneyforshow, setMoneyforshow] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pockets_send.length > 0 && pocketId) {
      setPocketId_send(pocketId);
      const selectedPocket = pockets_send.find((pocket) => pocket.value === pocketId);
      if (selectedPocket) {
        setMoneyforshow(selectedPocket.moneyamount);
      }
    }
  }, [pockets_send, pocketId]);

  useEffect(() => {
    const fetchPockets = async () => {
      try {
  
        const res = await axios.post(`http://${ip}:8080/get-pockets`, {
          userId: session.id,
        });
        const formattedData = res.data.map((item) => ({
          label: item.pocket_name,
          value: item.id,
          moneyamount: item.money,
        }));
        setPockets_send(formattedData);
        setPockets_re(formattedData);

        if (pocketId) {
          setPocketId_send(pocketId);
          const selectedPocket = formattedData.find((pocket) => pocket.value === pocketId);
          if (selectedPocket) {
            setMoneyforshow(selectedPocket.moneyamount);
          }
        } else if (formattedData.length > 0) {
          setPocketId_send(formattedData[0].value);
          setMoneyforshow(formattedData[0].moneyamount);
        }
        console.log("Received pocketId:", pocketId);
        console.log("Received pocketId:", pocketId_send);
      } catch (err) {
        console.error("Error fetching pockets:", err.message);
      }
      setIsLoading(false)
    };
    fetchPockets();
  },[pocketId]);



  const Submit = async () => {
    outcomesend();
    incomesend();
  };

  const incomesend = async () => {
    if (!amount || !pocketId_re) {
      Alert.alert("Error", "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("pocket_id", pocketId_re);
      formData.append("details", details ? details : null);
      formData.append("is_income", true);
      formData.append("userId", session.id);

      if (selectedImage && selectedImage.uri) {
        const fileUri = selectedImage.uri;
        const filename = fileUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("image", {
          uri: fileUri,
          name: filename,
          type,
        });
      }

      const res = await axios.post(
        `http://${ip}:8080/create-transaction`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Alert.alert("Success", "บันทึกข้อมูลเรียบร้อย");
    } catch (err) {
      console.error("Error submitting data:", err.message);
      Alert.alert("Error", "ไม่สามารถบันทึกข้อมูลได้");
    }
  };
  const outcomesend = async () => {
    if (!amount || !pocketId_send) {
      Alert.alert("Error", "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("pocket_id", pocketId_send);
      formData.append("details", details ? details : null);
      formData.append("is_income", false);
      formData.append("userId", session.id);

      if (selectedImage && selectedImage.uri) {
        const fileUri = selectedImage.uri;
        const filename = fileUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("image", {
          uri: fileUri,
          name: filename,
          type,
        });
      }

      const res = await axios.post(
        `http://${ip}:8080/create-transaction`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Alert.alert("Success", "บันทึกข้อมูลเรียบร้อย");
    } catch (err) {
      console.error("Error submitting data:", err.message);
      Alert.alert("Error", "ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      setSelectedImageforshow(result.assets[0].uri);
      console.log(result.assets[0]);
    }
  };

  return (
   <LinearGradient
      colors={["#CDFADB", "#38E298"]}
      locations={[0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={myStyle.bg}
    >
      {/* main content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={myStyle.main_content_box}
        >
          <View style={myStyle.main_pocket}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              style={myStyle.container}
            >
              {/* <Image
                source= 
                style={myStyle.image}
              /> */}
              <Text style={myStyle.bigtext}>
                Transfer money {pocketId_send}
              </Text>
              <View style={myStyle.moneyamount}>
                <Image source={require("../../assets/images/dollar.png")} />
                <Text style={{ fontSize: 20 }}> {moneyforshow}</Text>
                {/* <Text style={{ fontSize: 20 }}> 123</Text> */}
                <View style={{ alignItems: "center" }}></View>
              </View>

              <Text style={myStyle.label}>Pocket ส่ง</Text>
              <View style={myStyle.pickerContainer}>
                <Dropdown
                  key={pocketId_send}
                  style={myStyle.picker}
                  data={pockets_send}
                  textStyle={{
                    marginLeft: 10,
                  }}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocussend ? "เลือก Pocket" : "..."}
                  placeholderStyle={{ color: "gray" }}
                  selectedTextStyle={{ color: "black" }}
                  value={pocketId_send}
                  onFocus={() => setIsFocussend(true)}
                  onBlur={() => setIsFocussend(false)}
                  onChange={(item) => {
                    setPocketId_send(item.value);
                    setMoneyforshow(item.moneyamount);
                    setIsFocussend(false);
                  }}
                />
              </View>

              <Text style={myStyle.label}>Pocket รับ</Text>
              <View style={myStyle.pickerContainer}>
                <Dropdown
                  style={myStyle.picker}
                  data={pockets_re}
                  textStyle={{
                    marginLeft: 10,
                  }}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocusre ? "เลือก Pocket" : "..."}
                  placeholderStyle={{ color: "gray" }}
                  selectedTextStyle={{ color: "black" }}
                  value={pocketId_re}
                  onFocus={() => setIsFocusre(true)}
                  onBlur={() => setIsFocusre(false)}
                  onChange={(item) => {
                    setPocketId_re(item.value);
                    setIsFocusre(false);
                  }}
                />
              </View>

              <Text style={myStyle.label}>ยอดเงิน</Text>
              <TextInput
                style={myStyle.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="จำนวนเงินที่ต้องการโอน"
                keyboardType="numeric"
              />
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
              <TouchableOpacity
                style={myStyle.imagePlaceholder}
                onPress={pickImage}
              >
                <Image
                  source={
                    selectedImageforshow
                      ? { uri: selectedImageforshow }
                      : require("../../assets/images/photoicon.png")
                  } // เพิ่มรูปตาม URL หรือใช้โค้ดเพื่อให้ผู้ใช้เลือกรูป
                  style={
                    selectedImageforshow ? myStyle.image : myStyle.image_icon
                  }
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* bottom bar */}
      <View style={myStyle.bottom_barkub}>
        <View>
          <TouchableOpacity style={myStyle.button} onPress={Submit}>
            <Text style={myStyle.buttonText}>ยืนยัน</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default transfermoney;
