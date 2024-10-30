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

const Setting = () => {
  const { signOut, session } = useSession();
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
        <TouchableOpacity style={myStyle.logout_button} onPress={() => {signOut();
          router.push("login");
        }}>
          <Text style={{color:"white"}}>logout</Text>
        </TouchableOpacity>
        
      </ScrollView>

      {/* bottom bar */}
      <BottomBar />
    </LinearGradient>
  );
};

export default Setting;