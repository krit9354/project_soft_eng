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
  Platform,
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

import { useSession } from "../../components/ctx";

const addPocket = () => {
  const { session } = useSession();
  const [amount, setAmount] = useState("");
  const [goalAmount, setGoalAmount] = useState(null);
  const [checked, setChecked] = useState(false);
  const [selectedPocket, setSelectedPocket] = useState("");
  const [details, setDetails] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageforshow, setSelectedImageforshow] = useState("");
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

  //   const senddata = async () => {
  //     console.log(amount)
  //     try {
  //         const res = await axios.post('http://' + ip + ':8080/createpockets',{userId : session.id , pocketname : amount, goal : goalAmount ,havetarget : checked});
  //         // setPockets(res.data);
  //         console.log(res.data);
  //     } catch (err) {
  //         console.log("err :", err.message)
  //     }ds

  // };

  const senddata = async () => {
    const formData = new FormData();
    formData.append('pocketname', amount);
    formData.append('havetarget', checked);
    formData.append('userId', session.id);
    if (goalAmount !== null && goalAmount !== "") {
      formData.append('goal', goalAmount);
    }
  
    // ตรวจสอบว่ามีการตั้งค่า selectedImage หรือไม่
    if (selectedImage && selectedImage.uri) {
      const fileUri = selectedImage.uri;
      const filename = fileUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
  
      formData.append('image', {
        uri: fileUri,
        name: filename,
        type
      });
    }
  
    try {
      const res = await axios.post(`http://${ip}:8080/createpockets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
    } catch (err) {
      console.log('err:', err.message);
    }
  };

  

  const pickImage = async () => {
    // console.log(selectedImage)
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
            <View style={myStyle.container}>
              <Text style={myStyle.bigtext}>สร้าง Pocket</Text>
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
                  style={selectedImageforshow ? myStyle.image : myStyle.image_icon}
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
          <TouchableOpacity style={myStyle.button} onPress={senddata}>
            <Text style={myStyle.buttonText}>สร้าง cloud pocket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default addPocket;
