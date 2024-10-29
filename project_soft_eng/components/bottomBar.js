import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PocketCardStyle } from '../style/pocketCard_style';
import { myStyle } from '../style/bottomBar_style';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { router, Redirect } from 'expo-router';

export default function BottomBar() {
  const [adding,setAdding] = useState(false)
  const navigation = useNavigation();
  const pressAdd = () => {
    setAdding(!adding)
  }

  return (
    <View style={myStyle.bottom_bar}>
      <View>
      <TouchableOpacity onPress={() => router.push("summary")}>
          <Image style={myStyle.icon} source={require('../assets/images/summary.png')} />
      </TouchableOpacity>
      </View>
      <TouchableOpacity  style={myStyle.add} onPress={() => router.push("addincome")}>
      <Image source={require("../assets/images/Add.png")}/>
      </TouchableOpacity>
      <View>
      <Image  style={myStyle.icon} source={require("../assets/images/setting.png")}/>
      </View>
    </View>
  );
}