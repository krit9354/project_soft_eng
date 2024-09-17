import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PocketCardStyle } from '../style/pocketCard_style';
import { myStyle } from '../style/bottomBar_style';

export default function BottomBar() {

  return (
    <View style={myStyle.bottom_bar}>
      <View style={myStyle.summary}>
        <Image source={require("../assets/images/summary.png")}/>
      </View>
      <View style={myStyle.add}>
      <Image source={require("../assets/images/Add.png")}/>
      </View>
      <View style={myStyle.setting}>
      <Image source={require("../assets/images/setting.png")}/>
      </View>
    </View>
  );
}