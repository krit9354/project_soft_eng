import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { myStyle } from '../style/textbox_style';
export default function Textbox(item) {
  const items = item.props
  return (
    <View style={[items.income ? myStyle.mincard : myStyle.card]}>
      <View style={myStyle.container}>
        <View style={{flexDirection : 'row',alignItems:"center"}}>
          <Text>{items.money}</Text>
          {items.have_target && <Text style={{fontSize:12}}> / {items.target}</Text>}
          <Text> ฿</Text>
        </View>
        {items.event != '' && <View>
         <Text> {items.event}</Text>
          </View>}
        
        
      </View>
       {items.have_ima  && <View>
        <Image 
       source={{ uri: items.image}}
      style={myStyle.image}
      />
          </View>}
    </View>
  );
}