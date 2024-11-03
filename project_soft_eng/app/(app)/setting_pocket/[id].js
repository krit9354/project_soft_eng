import React, { useState, useEffect } from "react";
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
import { Checkbox } from "react-native-paper";
import { myStyle } from "../../../style/setting_pocket_style";
import { LinearGradient } from "expo-linear-gradient";
import BottomBar from "../../../components/bottomBar";
import { ip } from "../../../config";
import axios from "axios";
import { useSession } from "../../../components/ctx";
import { router, Redirect } from 'expo-router';
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from 'expo-router';

const SettingPocket = () => {
    const { id } = useLocalSearchParams();
    const { signOut, session } = useSession();
    const [pocketName, setPocketName] = useState();
    const [checked, setChecked] = useState(false);
    const [goalAmount, setGoalAmount] = useState(null);
    const [selectedImage, setSelectedImage] = useState({ uri: null });


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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post('http://' + ip + ':8080/pocket_data', { pocketId: id });
                setPocketName(res.data.pocket_name)
                setChecked(res.data.have_target)
                console.log(res.data.target)
                if (res.data.target != null && res.data.target != "NaN") {
                    setGoalAmount(String(res.data.target))
                }
                setSelectedImage({ uri: res.data.image })
            } catch (err) {
                console.log("err :", err.message)
            }
        };
        fetchData();
    }, []);

    const Submit = async () => {
        try {
            if ((checked && Number(goalAmount) == 0) || (checked && !goalAmount)) {
                Alert.alert("กรุณากรอกจำนวนเป้าหมาย(ที่ไม่ใช่ 0)");
                return;
            }
            const formData = new FormData();
            formData.append("pocketId", id);
            formData.append("pocket_name", pocketName);
            formData.append("have_target", checked)
            if (checked) {
                formData.append('target', Number(goalAmount));
            }
            console.log(selectedImage)
            // ตรวจสอบว่ามีการเลือกภาพหรือไม่
            if (selectedImage.uri !== null) {
                formData.append("image", {
                    uri: selectedImage.uri,
                    type: selectedImage.mimeType || "image/jpeg", // ใส่ประเภทไฟล์เริ่มต้นกรณีไม่เจอ
                    name: "image.png"
                });
            }

            const res = await axios.post(`http://${ip}:8080/edit_pocket`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Response from server:", res.data);
            Alert.alert("Success", "แก้ไขข้อมูลสำเร็จ");
            router.push("home"); // Uncomment เพื่อเปลี่ยนหน้า
        } catch (err) {
            console.error("Error submitting data:", err.message);
            Alert.alert("Error", "ไม่สามารถบันทึกข้อมูลได้");
        }
    };

    const deletePocket = async () => {
        try {
            const res = await axios.delete(`http://${ip}:8080/delete_pocket`, {
                data: { pocketId: id } // ระบุ pocketId ใน data ของคำขอ
            });
            console.log("delete success");
            Alert.alert("Success", "ลบPocketสำเร็จ");
        } catch (err) {
            console.log("Error deleting pocket:", err.message);
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                {/* main content */}
                <ScrollView
                    style={myStyle.main_content_box}
                >
                    <Text style={myStyle.bigtext}>การตั้งค่า Pocket</Text>
                    <Text style={myStyle.label}>รูป Pocket</Text>
                    <TouchableOpacity style={myStyle.imagePlaceholder} onPress={pickImage}>
                        <Image
                            source={
                                selectedImage.uri
                                    ? { uri: selectedImage.uri }
                                    : require("../../../assets/images/photoicon.png")
                            }
                            style={selectedImage.uri !== null ? myStyle.image : myStyle.image_icon}
                        />
                    </TouchableOpacity>

                    <Text style={myStyle.label}>Pocket name</Text>
                    <TextInput
                        style={myStyle.input}
                        value={pocketName}
                        onChangeText={setPocketName}
                        placeholder="pocket name"
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

                    <TouchableOpacity style={myStyle.save_button} onPress={Submit}>
                        <Text style={{ color: "white" }}>save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={myStyle.logout_button} onPress={async () => {
                        await deletePocket();
                        router.push("home");
                    }}>
                        <Text style={{ color: "white" }}>delete pocket</Text>
                    </TouchableOpacity>

                </ScrollView>

                {/* bottom bar */}

            </KeyboardAvoidingView>
            <BottomBar />
        </LinearGradient>
    );
};

export default SettingPocket;