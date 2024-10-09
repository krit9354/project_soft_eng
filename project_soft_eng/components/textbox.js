import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { myStyle } from '../style/textbox_style';
export default function Textbox(item) {
  const items = item.props
  return (
    <View style={[items.Income ? myStyle.mincard : myStyle.card]}>
      <View style={myStyle.container}>
        <View style={{flexDirection : 'row',alignItems:"center"}}>
          <Text>{items.Money}</Text>
          {items.Have_target && <Text style={{fontSize:12}}> / {items.Target}</Text>}
          <Text> ฿</Text>
        </View>
        {items.Event != '' && <View>
         <Text> {items.Event}</Text>
          </View>}
        
        
      </View>
       {items.Have_ima  && <View>
        <Image 
       source={{ uri: items.Image}}
      style={myStyle.image}
      />
          </View>}
    </View>
  );
}