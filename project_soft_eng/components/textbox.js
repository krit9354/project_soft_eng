import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { myStyle } from '../style/textbox_style';
export default function Textbox(item) {
  const items = item.props
  return (
    <View style={[items.is_income ? myStyle.card : myStyle.mincard]}>
      <View style={myStyle.container}>
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", }}>
          
          <Text style={myStyle.text}>{items.is_income ? items.money : "-"+items.money}฿</Text>

          {items.target && <Text style={{ fontSize: 12 }}> / {items.Target}</Text>}
          
        </View>
        {items.event != null && <View>
          <Text> {items.event}</Text>
        </View>}


      </View>
      {items.have_img && <View>
        <Image
          source={{ uri: items.img }}
           style={myStyle.image}
        />
      </View>}
    </View>
  );
}