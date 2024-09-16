import { View, Text, ScrollView, Image, FlatList } from 'react-native';
import { myStyle } from '../style/index_style';
import { LinearGradient } from 'expo-linear-gradient';
import PocketCard from '../components/pocketCard';
import { useEffect, useState } from 'react';

export default function Main() {
    const [pockets,setPockets] = useState([
        {pocket_name:"food",money:2000,have_target:false,target:0},
        {pocket_name:"saving",money:3000,have_target:true,target:5000},
        {pocket_name:"car",money:10000,have_target:true,target:20000},
        {pocket_name:"cat",money:3000,have_target:false,target:0},
        {pocket_name:"snack",money:100,have_target:false,target:0},
        {pocket_name:"cat",money:3000,have_target:false,target:0},
        {pocket_name:"snack",money:100,have_target:false,target:0}
    ])
    
    const pockets_element = pockets.map((pocket,index)=>{
        return <PocketCard key={index} props={pocket}/>
    });


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
                        {pockets_element}
                    </View>
                
                </ScrollView>

                {/* bottom bar */}
            </LinearGradient>
        </View>
        
    );
  }