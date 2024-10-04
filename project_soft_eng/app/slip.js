import React, { useState } from "react";
import { Button, Image, View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";




const Slip = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImage = async () => {

  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      console.log(result.assets[0])
    }
  };


  const uploadImage = async () => {
    console.log(decodeQR())
    const formData = new FormData();
    formData.append("data","")
    
    console.log("formdata :",formData)
    // formData.append("files",{
    //   uri: selectedImage.uri,
    //   type: selectedImage.type,
    //   name: selectedImage.fileName,
    // });

    try {
      const response = await fetch("https://api.slipok.com/api/line/apikey/30772", {
        method: "POST",
        headers: {
          "x-authorization": "SLIPOKPR1FEHV",
        },
        body: formData,
      });

      // ตรวจสอบสถานะการตอบกลับ
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        Alert.alert("Upload failed", errorData.message || "Something went wrong.");
        return;
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      Alert.alert("Upload successful", "Your image has been uploaded successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert("Upload error", error.message || "An error occurred while uploading.");
    }
  };


  return (
    <View style={styles.container}>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.image}
        />
      )}
      <Button title="Upload Image" onPress={uploadImage} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 10,
  },
});

export default Slip;
