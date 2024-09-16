import { View, Text } from 'react-native';
import { myStyle } from '../style/index_style';
import { LinearGradient } from 'expo-linear-gradient';

export default function Main() {
    return (
        <View style={myStyle.bg}>
            <LinearGradient
            colors={['#CDFADB', '#D5FFD0']}
            locations={[0.635, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={myStyle.bg}>
                <View style={myStyle.top_bar}>
                    <View style={myStyle.top_bar_content}>
                        <Text>User</Text>
                        <Text>history</Text>
                    </View>
                </View>

                {/* main content */}
                <View>

                </View>

                {/* bottom bar */}
            </LinearGradient>
        </View>
        
    );
  }