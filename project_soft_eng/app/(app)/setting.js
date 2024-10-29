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



const Setting = () => {
  
  return (
    <LinearGradient
      colors={["#CDFADB", "#38E298"]}
      locations={[0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={myStyle.bg}
    >
      {/* main content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={myStyle.main_content_box}
      >

      </ScrollView>

      {/* bottom bar */}
      <BottomBar />
    </LinearGradient>
  );
};

export default Setting;
