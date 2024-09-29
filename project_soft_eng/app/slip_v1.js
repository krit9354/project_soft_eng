import React, { useState } from "react";
import { Button, Image, View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const SlipV1 = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "We need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert("No image selected", "Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("files", {selectedImage});

    try {
      const response = await fetch("https://api.slipok.com/api/line/apikey/30772", {
        method: "POST",
        headers: {
          "x-authorization": "SLIPOKPR1FEHV",
          "Content-Type": "multipart/form-data",
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

export default SlipV1;
