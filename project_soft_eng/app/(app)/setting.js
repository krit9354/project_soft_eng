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
import { myStyle } from "../../style/setting_style";
import { LinearGradient } from "expo-linear-gradient";
import PocketCard from "../../components/pocketCard";
import BottomBar from "../../components/bottomBar";
import { useNavigation } from "@react-navigation/native";
import { ip } from "../../config";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import { useSession } from "../../components/ctx";
import { router, Redirect } from 'expo-router';
import * as ImagePicker from "expo-image-picker";

const Setting = () => {
  const { signOut, session } = useSession();
  const [username, setUsername] = useState(session.user_metadata.username);
  const [bankName, setBankName] = useState();
  const [selectedImage, setSelectedImage] = useState("");


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
  return (
    <LinearGradient
      colors={["#CDFADB", "#38E298"]}
      locations={[0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={myStyle.bg}
    >
      {/* main content */}
      <View
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

        <TouchableOpacity style={myStyle.save_button}>
          <Text style={{ color: "white" }}>save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={myStyle.logout_button} onPress={() => {
          signOut();
          router.push("login");
        }}>
          <Text style={{ color: "white" }}>logout</Text>
        </TouchableOpacity>

      </View>

      {/* bottom bar */}
      <BottomBar />
    </LinearGradient>
  );
};

export default Setting;