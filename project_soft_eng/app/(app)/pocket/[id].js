import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
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
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Pocket() {
   
    const { id } = useLocalSearchParams();

    const [total, setTotal] = useState([])

    const [pockets, setPockets] = useState()

    const [pocket, setPocket] = useState()

    const [pockets_element, setPockets_element] = useState()

    useFocusEffect(
        useCallback(() => {
          fetchData();
        }, [])
      );

   
        const fetchData = async () => {
            try {
                const res = await axios.post('http://' + ip + ':8080/pocketpocket',{pocketid: id });
                setPocket(res.data);

                 console.log(res.data);
            } catch (err) {
                console.log("err :", err.message)}


            try {
                const res = await axios.post('http://' + ip + ':8080/transactionid', { pocketid: id });
                setPockets(res.data);
                
            } catch (err) {
                console.log("err :", err.message)
            }
        };
        
        
    

    useEffect(() => {
        setPockets_element(pockets?.map((pocket, index) => {
            return <Textbox key={index} props={pocket} />
        }))
    }, [pockets])

    


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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image   source={{ uri: pocket?.image }} style={{ width: 70, height: 70, borderRadius: 35 }} />
                        <View style={{ flexDirection: 'colum', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginLeft: 10 }}>{pocket?.pocket_name}</Text>
                        <Text style={{ fontSize: 15, marginLeft: 10 }}>{pocket?.money}฿</Text>
                        </View>
                    </View>                    
                    <TouchableOpacity  style={{alignItems :'center'}} onPress={() => router.push("../summary_pocket/"+id)} >
                        <Image source={require("../../../assets/images/Vector.png")} style={{}} />
                        
                    </TouchableOpacity>
                </View>
            </View>

            {/* main content */}
            <ScrollView showsVerticalScrollIndicator={false} style={myStyle.main_content_box}>
                <View style={{ marginBottom: "5%" }} />

                {pockets_element}



            </ScrollView>

            {/* bottom bar */}

            <BottomBar />
        </LinearGradient>


    );
}