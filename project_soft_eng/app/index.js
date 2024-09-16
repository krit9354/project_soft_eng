import { View, Text, ScrollView, Image } from 'react-native';
import { myStyle } from '../style/index_style';
import { LinearGradient } from 'expo-linear-gradient';
import PocketCard from '../components/pocketCard';

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
                        <View>
                            <Image source={require("../assets/images/history.png")}/>
                            <Text>transfer</Text>
                        </View>
                    </View>
                </View>

                {/* main content */}
                <ScrollView showsVerticalScrollIndicator={false}  style={myStyle.main_content_box}>
                    
                    <View style={myStyle.main_pocket}>
                        <Image source={require("../assets/images/dollar.png")}/>
                        <Text> 152,552.30</Text>
                        <View>
                            <Image source={require("../assets/images/transfer.png")}/>
                            <Text>transfer</Text>
                        </View>
                    </View>

                    <View style={myStyle.grid}>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                        <PocketCard/>
                    </View>
                
                </ScrollView>

                {/* bottom bar */}
            </LinearGradient>
        </View>
        
    );
  }