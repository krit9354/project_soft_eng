import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { myStyle } from '../style/textbox_style';
export default function Textbox(item) {
  const items = item.props
  return (
    <View style={[items.is_income ? myStyle.mincard : myStyle.card]}>
      <View style={myStyle.container}>
        <View style={{flexDirection : 'row',alignItems:"center"}}>
          <Text>{items.money}</Text>
          {items.target && <Text style={{fontSize:12}}> / {items.Target}</Text>}
          <Text> ฿</Text>
        </View>
        {items.event != null && <View>
         <Text> {items.event}</Text>
          </View>}
        
        
      </View>
       {items.have_img  && <View>
        <Image 
       source={{ uri: items.Image}}
      style={myStyle.image}
      />
          </View>}
    </View>
  );
}