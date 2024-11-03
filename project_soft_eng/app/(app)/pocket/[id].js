import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { myStyle } from '../../../style/pocket_style';
import { LinearGradient } from 'expo-linear-gradient';
import Textbox from '../../../components/textbox';
import moment from 'moment';
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


    const [pockets, setPockets] = useState()

    const [pocket, setPocket] = useState()

    const [pockets_element, setPockets_element] = useState()

    const [modalVisible, setModalVisible] = useState(false);

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
                        <Image   source={pocket?.image?{ uri: pocket?.image }:(require("../../../assets/images/pocket.png"))} style={{ width: 70, height: 70, borderRadius: 35 }} />
                        <View style={{ flexDirection: 'colum', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginLeft: 10 }}>{pocket?.pocket_name}</Text>
                        <Text style={{ fontSize: 15, marginLeft: 10 }}>{pocket?.money}฿</Text>
                        </View>
                    </View>                    
                    <TouchableOpacity  style={{alignItems :'center'}} onPress={() => setModalVisible(true)} >
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

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // กดปุ่มย้อนกลับบน Android เพื่อปิด
      >
        <TouchableOpacity
          style={myStyle.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)} // กดที่พื้นที่นอก modal เพื่อปิด
        >
          <View style={myStyle.modalContent}>
            
            <TouchableOpacity style={myStyle.menuItem} onPress={() => router.push("/summary_pocket/" + id)}>
            <Image source={require("../../../assets/images/summary.png")}  />
              <Text style={myStyle.menuText}>Summary</Text>
            </TouchableOpacity>

            <View style={myStyle.separator} />

            <TouchableOpacity style={myStyle.menuItem} onPress={() => router.push({ pathname: "transfermoney", params: { pocketId: id } })}>
            <Image source={require("../../../assets/images/transfer.png")}  />
              <Text style={myStyle.menuText}>Transfer</Text>
            </TouchableOpacity>

            <View style={myStyle.separator} />

            <TouchableOpacity style={myStyle.menuItem} onPress={() => alert('Setting selected')}>
            <Image source={require("../../../assets/images/setting.png")}  />
              <Text style={myStyle.menuText}>Setting</Text>
            </TouchableOpacity>
            
          </View>

        </TouchableOpacity>
      </Modal>
    </View>

           
        </LinearGradient>
        

    );
}