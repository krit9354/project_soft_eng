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
  Alert,
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { myStyle } from "../../style/newpocket_style";
import { LinearGradient } from "expo-linear-gradient";
import PocketCard from "../../components/pocketCard";
import BottomBar from "../../components/bottomBar";
import { useNavigation } from "@react-navigation/native";
import { ip } from "../../config";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";

const addPocket = () => {
  const [amount, setAmount] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedPocket, setSelectedPocket] = useState("");
  const [details, setDetails] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [resdata, setResdata] = useState();
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
            <Text style={myStyle.bigtext}>สร้าง Pocket</Text>
            <TouchableOpacity
              style={myStyle.imagePlaceholder} 
              onPress={pickImage}
            >
              <Image
                source={
                  selectedImage
                    ? { uri: selectedImage }
                    : require("../../assets/images/photoicon.png")
                } // เพิ่มรูปตาม URL หรือใช้โค้ดเพื่อให้ผู้ใช้เลือกรูป
                style={selectedImage ? myStyle.image : myStyle.image_icon}
              />
            </TouchableOpacity>
            <Text style={myStyle.label}>Pocket name</Text>
            <TextInput
              style={myStyle.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="ใส้ชื่อของ Pocket"
              keyboardType="standard"
            />

            <View style={myStyle.rowcheckbox}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => setChecked(!checked)}
                color="#4CAF50" // สีที่ต้องการ
              />
              <Text style={myStyle.goallabel}>ตั้งเป้าหมาย</Text>
            </View>
            {checked && (
              <TextInput
                style={myStyle.input}
                value={goalAmount}
                onChangeText={setGoalAmount}
                placeholder="กรอกเป้าหมาย"
                keyboardType="numeric"
              />
            )}

            {/* <Text style={myStyle.label}>รายละเอียด</Text>
            <TextInput
              style={[myStyle.input, myStyle.textArea]}
              value={details}
              onChangeText={setDetails}
              placeholder="รายละเอียด"
              multiline
              numberOfLines={4}
            /> */}
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      {/* bottom bar */}
      <View style={myStyle.bottom_barkub}>
        <View>
          <TouchableOpacity style={myStyle.button}>
            <Text style={myStyle.buttonText}>สร้าง cloud pocket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default addPocket;
