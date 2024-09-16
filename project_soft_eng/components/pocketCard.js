import { View, Text, Image } from 'react-native';
import { myStyle } from '../style/index_style';
import { LinearGradient } from 'expo-linear-gradient';
import { PocketCardStyle } from '../style/pocketCard_style';
export default function PocketCard(props) {
  return (
    <View style={PocketCardStyle.card}>
      <Image 
      source={require("../assets/images/test_image.png")} 
      style={PocketCardStyle.image}
      />
      <View style={PocketCardStyle.container}>
        <Text>food</Text>
        <Text>5000 $</Text>
        <View style={PocketCardStyle.bg_bar}>
          <View style={{
            backgroundColor : "#38E298", 
            height : 10,
            borderRadius : 20,
            width : 2500/5000*100
            }}>
          </View>
          </View>
      </View>
    </View>
  );
}