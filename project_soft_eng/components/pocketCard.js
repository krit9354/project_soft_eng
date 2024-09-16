import { View, Text, Image } from 'react-native';
import { myStyle } from '../style/index_style';
import { LinearGradient } from 'expo-linear-gradient';
import { PocketCardStyle } from '../style/pocketCard_style';
export default function PocketCard(item) {
  console.log(item)
  const items = item.props
  return (
    <View style={PocketCardStyle.card}>
      <Image 
      source={require("../assets/images/test_image.png")} 
      style={PocketCardStyle.image}
      />
      <View style={PocketCardStyle.container}>
        <Text>{items.pocket_name}</Text>
        <Text>{items.money} $</Text>
        {items.have_target && <View style={PocketCardStyle.bg_bar}>
          <View style={{
            backgroundColor : "#38E298", 
            height : 10,
            borderRadius : 20,
            width : items.money/items.target*100
            }}>
          </View>
          </View>}
      </View>
    </View>
  );
}