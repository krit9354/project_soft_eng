import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { myStyle } from "../../style/addincome_style";
import { LinearGradient } from "expo-linear-gradient";
import PocketCard from "../../components/pocketCard";
import BottomBar from "../../components/bottomBar";
import { useNavigation } from "@react-navigation/native";
import { ip } from "../../config";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const NewIncomeScreen = () => {
  const [amount, setAmount] = useState("");
  const [selectedPocket, setSelectedPocket] = useState("");
  const [details, setDetails] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [resdata, setResdata] = useState();
  const [is_income, setIs_income] = useState(true);
  const option = {
    title: "select Image",
    type: "library",
    options: {
      selectionlimit: 1,
      mediaType: "photo",
      includeBase64: false,
    },
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0]);
    }
  };

  const uploadImage = async (img) => {
    const formData = new FormData();
    formData.append("files", {
      uri: img.uri,
      type: img.mimeType,
      name: "image.png",
      fileName: "image",
    });
    try {
      const response = await fetch(
        "https://api.slipok.com/api/line/apikey/30772",
        {
          method: "POST",
          headers: {
            "x-authorization": "SLIPOKPR1FEHV",
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        Alert.alert(
          "Upload failed",
          errorData.message || "Something went wrong."
        );
        return;
      }

      const res = await response.json();
      console.log("Upload successful:", res.data);
      console.log("Upload :", res.data.amount);
      setResdata(res.data);
      setAmount(String(res.data.amount));
      Alert.alert(
        "Upload successful",
        "Your image has been uploaded successfully!"
      );
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert(
        "Upload error",
        error.message || "An error occurred while uploading."
      );
    }
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
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
            <View style={myStyle.container}>
              {/* <Image
                source= 
                style={myStyle.image}
              /> */}
              <Text style={myStyle.bigtext}>รายการใหม่</Text>
              <View style={myStyle.rowincomeorexpense}>
                <Button
                  mode="contained"
                  onPress={() => setIs_income(true)}
                  style={{ marginHorizontal: 10 }}
                  buttonColor={is_income ? "#38E298" : "#CDFADB"} 
                  textColor={is_income ? "#ffffff" : "#ffffff"}
                >
                  รายรับ
                </Button>
                <Button
                  mode="contained"
                  onPress={() => setIs_income(false)}
                  style={{ marginHorizontal: 10 }}
                  buttonColor={!is_income ? "#FF5A5A" : "#FDC5C5"} 
                  textColor={!is_income ? "#ffffff" : "#ffffff"}
                >
                  รายจ่าย
                </Button>
              </View>
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
                <Dropdown
                  style={myStyle.picker}
                  data={data}
                  textStyle={{
                    marginLeft: 10, // ระยะห่างของข้อความจากขอบซ้าย
                  }}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "เลือก Pocket" : "..."}
                  placeholderStyle={{ color: "gray" }}
                  selectedTextStyle={{ color: "black" }}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
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
                  source={
                    selectedImage
                      ? { uri: selectedImage }
                      : require("../../assets/images/photoicon.png")
                  } // เพิ่มรูปตาม URL หรือใช้โค้ดเพื่อให้ผู้ใช้เลือกรูป
                  style={selectedImage ? myStyle.image : myStyle.image_icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* bottom bar */}
      <View style={myStyle.bottom_barkub}>
        <View>
          <TouchableOpacity style={myStyle.button} onPress={pickImage}>
            <Text style={myStyle.buttonText}>ยืนยัน</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default NewIncomeScreen;
