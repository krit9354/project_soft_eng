import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { myStyle } from '../../style/pocket_style';
import { LinearGradient } from 'expo-linear-gradient';
import Textbox from '../../components/textbox';
import { useSession } from '../../components/ctx';
import { useEffect, useState } from 'react';
import BottomBar from '../../components/bottomBar';
import { useNavigation } from '@react-navigation/native';
import { ip } from '../../config';
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import moment from 'moment';

export default function Transaction() {
   
  const { signOut, session ,isLoading} = useSession();


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
                const res = await axios.post('http://' + ip + ':8080/total_money',{pocketid: session.id });
                setPocket(res.data);

                 console.log(res.data);
            } catch (err) {
                console.log("err :", err.message)}


            try {
                const res = await axios.post('http://' + ip + ':8080/transaction_main_id', { pocketid: session.id });
                setPockets(res.data);
                
            } catch (err) {
                console.log("err :", err.message)
            }
        };
        
        
    


  useEffect(() => {
      if (!pockets) return;

      // เรียงลำดับ pockets ตามวันที่จากใหม่ไปเก่า
      const sortedPockets = [...pockets].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      const groupedElements = [];
      let lastDate = null;

      sortedPockets.forEach((pocket, index) => {
          const currentDate = moment(pocket.created_at).format('YYYY-MM-DD');

          if (currentDate !== lastDate) {
              // หากวันที่ปัจจุบันไม่เท่ากับวันที่ก่อนหน้า ให้เพิ่ม divider
              groupedElements.push(
                  <Text key={`date-${index}`} style={{  fontSize: 16, marginVertical: 10, textAlign: 'center' ,color: '#A9A9A9'}}>
                      {currentDate}
                  </Text>
              );
              lastDate = currentDate;
          }

          groupedElements.push(<Textbox key={index} props={pocket} />);
      });

      setPockets_element(groupedElements);
  }, [pockets]);




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
                        <Image   source={session.avatar_url?{ uri: session.avatar_url }:(require("../../assets/images/avatar.png"))} style={{ width: 70, height: 70, borderRadius: 35 }} />
                        <View style={{ flexDirection: 'colum', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginLeft: 10 }}>{session.username ?? "ERROR"}</Text>
                        <Text style={{ fontSize: 15, marginLeft: 10 }}>{pocket?.sum}฿</Text>
                        </View>
                    </View>                    
                   
                </View>
            </View>

            {/* main content */}
            <ScrollView showsVerticalScrollIndicator={false} style={myStyle.main_content_box}>
                <View style={{ marginBottom: "5%" }} />

                {pockets_element}



            </ScrollView>

            {/* bottom bar */}

            <BottomBar />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />

    </View>

           
        </LinearGradient>
        

    );
}