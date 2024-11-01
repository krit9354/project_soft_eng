import React, { useState, useEffect } from "react";
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
import { myStyle } from "../../style/addincome_style";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import { ip } from "../../config";
import { useSession } from "../../components/ctx";

const NewIncomeScreen = () => {
  const [amount, setAmount] = useState("");
  const [pocketId, setPocketId] = useState(null);
  const [details, setDetails] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageforshow, setSelectedImageforshow] = useState("");
  const [resdata, setResdata] = useState();
  const [is_income, setIs_income] = useState(true);
  const [pockets, setPockets] = useState([]);
  const { session } = useSession();

  const option = {
    title: "select Image",
    type: "library",
    options: {
      selectionlimit: 1,
      mediaType: "photo",
      includeBase64: false,
    },
  };

  useEffect(() => {
    const fetchPockets = async () => {
      try {
        const res = await axios.post(`http://${ip}:8080/get-pockets`, {
          userId: session.id,
        });
        const formattedData = res.data.map((item) => ({
          label: item.pocket_name,
          value: item.id,
        }));
        setPockets(formattedData);
      } catch (err) {
        console.error("Error fetching pockets:", err.message);
      }
    };
    fetchPockets();
  }, []);

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

  const Submit = async () => {
    if (!amount || !pocketId) {
      Alert.alert("Error", "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("pocket_id", pocketId);
      formData.append("details", details ? details : null);
      formData.append("is_income", is_income);
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={myStyle.bigtext}>รายการใหม่</Text>
                <TouchableOpacity style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/Scanpic.png")}
                    style={{ width: 33, height: 33, marginLeft: 10 }}
                  />
                  <Text style={{ fontSize: 11}}>
                    นำเข้าด้วยรูป
                  </Text>
                </TouchableOpacity>
              </View>

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
                  data={pockets}
                  textStyle={{
                    marginLeft: 10,
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
                    setPocketId(item.value);
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
              <TouchableOpacity
                onPress={pickImage}
                style={myStyle.imagePlaceholder}
              >
                <Image
                  source={
                    selectedImageforshow
                      ? { uri: selectedImageforshow }
                      : require("../../assets/images/photoicon.png")
                  }
                  style={
                    selectedImageforshow ? myStyle.image : myStyle.image_icon
                  }
                />
              </TouchableOpacity>
            </View>
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

export default NewIncomeScreen;
