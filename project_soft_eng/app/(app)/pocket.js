import { View, Text, ScrollView, Image, FlatList,TouchableOpacity } from 'react-native';
import { myStyle } from '../../style/pocket_style';
import { LinearGradient } from 'expo-linear-gradient';
import Textbox from '../../components/textbox';
import { useEffect, useState } from 'react';
import BottomBar from '../../components/bottomBar';
import { useNavigation } from '@react-navigation/native';
import { ip } from '../../config';
import axios from 'axios'

export default function Pocket() {
    const navigation = useNavigation();
    
    const [pockets,setPockets] = useState([
        {Money: -2000, Income: false, Event: "ตีdot", Have_ima: true, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Money: +3000, Income: true, Event: "", Have_ima: true, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Money: +3000, Income: true, Event: "", Have_ima: true, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},
	{Money: +3000, Income: true, Event: "แทงบอล", Have_ima: false, Image: "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM="},

    ])
    const [pockets_element,setPockets_element] = useState()
    

        useEffect(() => {
            // ฟังก์ชันในการดึงข้อมูลจาก API
            const fetchData = async () => {
              try {
                const res = await axios.get('http://'+ip+':8080/foods');
                setPockets(res.data);
              } catch (err) {
                console.log("err :",err.message)
              }
            };
        
            fetchData();
          }, []);

    useEffect(() => {
        setPockets_element(pockets.map((pocket,index)=>{
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
                        <Image source={require("../../assets/images/test_image.png")} style={{width : 70,height:70,borderRadius:35}}/>
                        <Text style={{fontSize : 20,marginLeft:10}}>food</Text>
                    </View>
                    
                    <TouchableOpacity  style={{alignItems :'center'}} onPress={() => navigation.navigate('Test')} >
                        <Image source={require("../../assets/images/history.png")} style={{width : 30,height:30,overflow:'visible'}} />
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