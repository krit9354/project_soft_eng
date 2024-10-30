import { View, Text, ScrollView, Image, FlatList,TouchableOpacity } from 'react-native';
import { myStyle } from '../../../style/pocket_style';
import { LinearGradient } from 'expo-linear-gradient';
import Textbox from '../../../components/textbox';
import { useEffect, useState } from 'react';
import BottomBar from '../../../components/bottomBar';
import { useNavigation } from '@react-navigation/native';
import { ip } from '../../../config';
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
export default function Pocket() {
    const { id } = useLocalSearchParams();

    const navigation = useNavigation();
    
    const [pockets,setPockets] = useState()

    const [pockets_element,setPockets_element] = useState()
    

        useEffect(() => {
       
            const fetchData = async () => {
            //   try {
            //     const res = await axios.post('http://'+ip+':8080/transaction');
            //     setPockets(res.data);
            //   } catch (err) {
            //     console.log("err :",err.message)
            //   }
              try {
                const res = await axios.post('http://' + ip + ':8080/transactionid',{pocketid : id});
                setPockets(res.data);
                  console.log(res.data);
            } catch (err) {
                console.log("err :", err.message)
            }
            };
            console.log(id);
            fetchData();
          }, []);

    useEffect(() => {
        setPockets_element(pockets?.map((pocket,index)=>{
            return <Textbox key={index} props={pocket} />
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
                        <Image source={require("../../../assets/images/test_image.png")} style={{width : 70,height:70,borderRadius:35}}/>
                        <Text style={{fontSize : 20,marginLeft:10}}>food</Text>
                    </View>
                    
                    <TouchableOpacity  style={{alignItems :'center'}} onPress={() => router.push("../summary_pocket/"+id)} >
                        <Image source={require("../../../assets/images/history.png")} style={{width : 30,height:30,overflow:'visible'}} />
                        <Text>history</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* main content */}
            <ScrollView showsVerticalScrollIndicator={false}  style={myStyle.main_content_box}>
                <View>
                    {pockets_element}
                </View>
            
            </ScrollView>

            {/* bottom bar */}
          
            <BottomBar/>
        </LinearGradient>

        
    );
  }