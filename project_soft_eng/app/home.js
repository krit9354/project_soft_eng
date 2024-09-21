import { View, Text, ScrollView, Image, FlatList,TouchableOpacity } from 'react-native';
import { myStyle } from '../style/home_style';
import { LinearGradient } from 'expo-linear-gradient';
import PocketCard from '../components/pocketCard';
import { useEffect, useState } from 'react';
import BottomBar from '../components/bottomBar';
import { useNavigation } from '@react-navigation/native';
import { ip } from '../config';
import axios from 'axios'

export default function HomeScreen() {
    const navigation = useNavigation();
    const [pockets,setPockets] = useState([
        {pocket_name:"food",money:2000,have_target:false,target:0},
        // {pocket_name:"saving",money:3000,have_target:true,target:5000},
        // {pocket_name:"car",money:10000,have_target:true,target:20000},
        // {pocket_name:"cat",money:3000,have_target:false,target:0},
        // {pocket_name:"snack",money:100,have_target:false,target:0},
        // {pocket_name:"cat",money:3000,have_target:false,target:0},
        // {pocket_name:"snack",money:100,have_target:false,target:0}
    ])
    const [pockets_element,setPockets_element] = useState()
    

        useEffect(() => {
            // ฟังก์ชันในการดึงข้อมูลจาก API
            const fetchData = async () => {
              try {
                const res = await axios.get('http://'+ip+':8080/pockets');
                setPockets(res.data);
              } catch (err) {
                console.log("err :",err.message)
              }
            };
        
            fetchData();
          }, []);

    useEffect(() => {
        setPockets_element(pockets.map((pocket,index)=>{
            return <PocketCard key={index} props={pocket}/>
        }))
    },[pockets])
    


    return (

        <LinearGradient
        colors={['#CDFADB', '#38E298']}
        locations={[0.75, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={myStyle.bg}>
            {/* top bar */}
            <View style={myStyle.top_bar}>
                <View style={myStyle.top_bar_content}>
                    <View style={{flexDirection : 'row', alignItems:'center'}}>
                        <Image source={require("../assets/images/nongP.jpg")} style={{width : 70,height:70,borderRadius:35}}/>
                        <Text style={{fontSize : 20,marginLeft:10}}>Milanoob</Text>
                    </View>
                    
                    <TouchableOpacity  style={{alignItems :'center'}} onPress={() => navigation.navigate('pocket')} >
                        <Image source={require("../assets/images/history.png")} style={{width : 30,height:30,overflow:'visible'}} />
                        <Text>history</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* main content */}
            <ScrollView showsVerticalScrollIndicator={false}  style={myStyle.main_content_box}>
                
                <View style={myStyle.main_pocket}>
                    <Image source={require("../assets/images/dollar.png")}/>
                    <Text style={{fontSize : 20}}> 2,552.30</Text>
                    <View style={{alignItems :'center'}}>
                        <Image source={require("../assets/images/transfer.png")}/>
                        <Text>transfer</Text>
                    </View>
                </View>

                <View style={myStyle.grid}>
                    {pockets_element}
                </View>
            
            </ScrollView>

            {/* bottom bar */}
            <View style={myStyle.add_pocket}>
                <Text style={{fontSize:16,color:"white"}} onPress={() => navigation.navigate('Test')}>Add Pocket</Text>
            </View>
            <BottomBar/>
        </LinearGradient>

        
    );
  }