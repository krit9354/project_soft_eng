import { View, Text, Image,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { myStyle } from '../style/pocketCard_style';
export default function PocketCard(item) {
  const items = item.props
  const navigation = useNavigation();
  return (<TouchableOpacity  style={myStyle.card} onPress={() => navigation.navigate('pocket')} >
    
      <Image 
       source={{ uri: items.Image}}
      style={myStyle.image}
      />
      <View style={myStyle.container}>
        <Text>{items.Pocket_name}</Text>
        <View style={{flexDirection : 'row',alignItems:"center"}}>
          <Text>{items.Money}</Text>
          {items.Have_target && <Text style={{fontSize:12}}> / {items.Target}</Text>}
          <Text> ฿</Text>
        </View>
        
        {items.Have_target && <View style={myStyle.bg_bar}>
          <View style={{
            backgroundColor : "#38E298", 
            height : 10,
            borderRadius : 20,
            width : items.Money/items.Target*100
            }}>
          </View>
          </View>}
      </View>

    </TouchableOpacity>
  );
}