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
import { myStyle } from "../style/addincome";
import { LinearGradient } from "expo-linear-gradient";
import PocketCard from "../components/pocketCard";
import BottomBar from "../components/bottomBar";
import { useNavigation } from "@react-navigation/native";
import { ip } from "../config";
import axios from "axios";

const Slip = () => {
  const [amount, setAmount] = useState("");
  const [selectedPocket, setSelectedPocket] = useState("");
  const [details, setDetails] = useState("");

  return (
    <LinearGradient
      colors={["#CDFADB", "#38E298"]}
      locations={[0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={myStyle.bg}
    >

    </LinearGradient>
  );
};

export default Slip;
