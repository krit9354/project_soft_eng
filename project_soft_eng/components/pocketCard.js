import { View, Text, Image,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { myStyle } from '../style/pocketCard_style';
export default function PocketCard(item) {
  const items = item.props
  const navigation = useNavigation();
  return (<TouchableOpacity  style={myStyle.card} onPress={() => navigation.navigate('pocket')} >
    
      <Image 
       source={{ uri: items.image}}
      style={myStyle.image}
      />
      <View style={myStyle.container}>
        <Text>{items.pocket_name}</Text>
        <View style={{flexDirection : 'row',alignItems:"center"}}>
          <Text>{items.money}</Text>
          {items.have_target && <Text style={{fontSize:12}}> / {items.target}</Text>}
          <Text> ฿</Text>
        </View>
        
        {items.have_target && <View style={myStyle.bg_bar}>
          <View style={{
            backgroundColor : "#38E298", 
            height : 10,
            borderRadius : 20,
            width : items.money/items.target*100
            }}>
          </View>
          </View>}
      </View>

    </TouchableOpacity>
  );
}