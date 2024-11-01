
import React, { useState } from "react";
import { Button, Image, View, StyleSheet, Alert, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";



const Slip = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [data, setData] = useState('');
  const option = {
    title : 'select Image',
    type : 'library',
    options : {
      selectionlimit : 1,
      mediaType : 'photo',
      includeBase64 : false,
    },
  }

   

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
    const formData = new FormData();
    formData.append("files",{
      uri : selectedImage.uri,
      type : selectedImage.mimeType,
      name : "image.png",
      fileName : "image"
    })
    try {
      const response = await fetch("https://api.slipok.com/api/line/apikey/33139", {
        method: "POST",
        headers: {
          "x-authorization": "SLIPOKR3QLPUQ",
          "Content-Type": "multipart/form-data"
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        Alert.alert("Upload failed", errorData.message || "Something went wrong.");
        return;
      }

      const res = await response.json();
      console.log("Upload successful:", res.data);
      setData(res.data)
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
      {data && (<Text>{data.sender.displayName} send to {data.receiver.displayName} {data.amount} bath</Text>)}
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
    height: 400,
    marginVertical: 10,
  },
});

export default Slip;
