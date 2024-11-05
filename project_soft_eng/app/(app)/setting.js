import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { myStyle } from "../../style/setting_style";
import { LinearGradient } from "expo-linear-gradient";
import BottomBar from "../../components/bottomBar";
import { ip } from "../../config";
import axios from "axios";
import { useSession } from "../../components/ctx";
import { router, Redirect } from 'expo-router';
import * as ImagePicker from "expo-image-picker";


const Setting = () => {
  const { signOut, session , setSession } = useSession();
  const [username, setUsername] = useState(session.username);
  const [bankName, setBankName] = useState(session.name_bank ? session.name_bank : null);
  const [selectedImage, setSelectedImage] = useState(session.avatar_url ? { uri: session.avatar_url } : null);
  const pickImage = async () => {
    // console.log(selectedImage)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const Submit = async () => {

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name_bank", bankName);
      formData.append("userId", session.id)


      if (selectedImage !== null) {
        formData.append("image", {
          uri: selectedImage.uri,
          type: selectedImage.mimeType || "image/jpeg", // ใส่ประเภทไฟล์เริ่มต้นกรณีไม่เจอ
          name: "image.png"
        });
      }


      const res = await axios.post(`http://${ip}:8080/edit_profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("user data in session :", res.data);
      if (res && res.data) {
        setSession(res.data);
        console.log("Session updated:", res.data);
      } else {
        console.error("No data received from API.");
        Alert.alert("Error", "No data received from API.");
      }
      console.log(session);


      Alert.alert("Success", "แก้ไขข้อมูลสำเร็จ");
      router.push("home");
    } catch (err) {
      console.error("Error submitting data:", err.response.data.error);
      Alert.alert("ไม่สามารถบันทึกข้อมูลได้", err.response.data.error);
    }
  };

  const handleButtonPress = async () => {
    Alert.alert(
      "Confirm",
      "ยืนยันที่ logout",
      [
        {
          text: "Yes",
          onPress: () => {
            signOut();
            router.push("login");
          }
        }
        ,
        {
          text: "Cancel",
          onPress: () => console.log("Action canceled"),
          style: "cancel"
        }
        
      ],
      { cancelable: true }
    );
  };
const handleButtonPressSave = async () => {
    Alert.alert(
      "Confirm",
      "ยืนยันที่จะแก้ไขข้อมูล Profile นี้",
      [
        {
          text: "Yes",
          onPress: () => {
            Submit();
            
          }
        }
        ,
        {
          text: "Cancel",
          onPress: () => console.log("Action canceled"),
          style: "cancel"
        }
        
      ],
      { cancelable: true }
    );
  };


  return (
    <LinearGradient
      colors={["#CDFADB", "#38E298"]}
      locations={[0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={myStyle.bg}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* main content */}
        <ScrollView
          style={myStyle.main_content_box}
        >
          <Text style={myStyle.bigtext}>การตั้งค่า</Text>
          <Text style={myStyle.label}>รูปโปรไฟล์</Text>
          <TouchableOpacity style={myStyle.imagePlaceholder} onPress={pickImage}>
            <Image
              source={
                selectedImage
                  ? { uri: selectedImage.uri }
                  : require("../../assets/images/photoicon.png")
              }
              style={selectedImage ? myStyle.image : myStyle.image_icon}
            />
          </TouchableOpacity>

          <Text style={myStyle.label}>username</Text>
          <TextInput
            style={myStyle.input}
            value={username}
            onChangeText={setUsername}
            placeholder="username"
          />

          <Text style={myStyle.label}>ชื่อในบัญชี (ไม่เอานามสกุล)</Text>
          <TextInput
            style={myStyle.input}
            value={bankName}
            onChangeText={setBankName}
            placeholder="Bank name"
          />

          {/* <TouchableOpacity style={myStyle.save_button} onPress={Submit}> */}
          <TouchableOpacity style={myStyle.save_button} onPress={handleButtonPressSave}>
            <Text style={{ color: "white" }}>save</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={myStyle.logout_button} onPress={() => {
            signOut();
            router.push("login");
          }}> */}
          <TouchableOpacity style={myStyle.logout_button} onPress={() => {
            handleButtonPress();
          }}>
            <Text style={{ color: "white" }}>logout</Text>
          </TouchableOpacity>

        </ScrollView>

        {/* bottom bar */}

      </KeyboardAvoidingView>
      <BottomBar />
    </LinearGradient>
  );
};

export default Setting;