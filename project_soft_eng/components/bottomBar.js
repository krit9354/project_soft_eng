import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PocketCardStyle } from '../style/pocketCard_style';
import { myStyle } from '../style/bottomBar_style';
import { useState } from 'react';

export default function BottomBar() {
  const [adding,setAdding] = useState(false)

  const pressAdd = () => {
    setAdding(!adding)
  }

  return (
    <View style={myStyle.bottom_bar}>
      <View>
        {!adding && <Image  style={myStyle.icon} source={require("../assets/images/summary.png")}/>}
        {adding && <Image  style={myStyle.icon} source={require("../assets/images/positive.png")}/>}
      </View>
      <TouchableOpacity  style={myStyle.add} onPress={pressAdd}>
      <Image source={require("../assets/images/Add.png")}/>
      </TouchableOpacity>
      <View>
      {!adding && <Image  style={myStyle.icon} source={require("../assets/images/setting.png")}/>}
      {adding && <Image  style={myStyle.icon} source={require("../assets/images/negative.png")}/>}
      </View>
    </View>
  );
}