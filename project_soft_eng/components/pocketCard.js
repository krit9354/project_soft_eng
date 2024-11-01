import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { myStyle } from '../style/pocketCard_style';
import { Link, router } from 'expo-router';
export default function PocketCard(item) {
  const items = item.props
  console.log(items)
  return (
    <TouchableOpacity style={myStyle.card} onPress={() => router.push("/pocket/" + items.id)}>
      <Image
        source={{ uri: items.image }}
        style={myStyle.image}
      />
      <View style={myStyle.container}>
        <Text>{items.pocket_name}</Text>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <Text>{items.money}</Text>
          {items.have_target && <Text style={{ fontSize: 12 }}> / {items.target}</Text>}
          <Text> ฿</Text>
        </View>

        {items.have_target && <View style={myStyle.bg_bar}>
          <View style={{
            backgroundColor: "#38E298",
            height: 10,
            borderRadius: 20,
            width: items.money / items.target * 100
          }}>
          </View>
        </View>}
      </View>

    </TouchableOpacity>

  );
}