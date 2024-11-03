import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Button, ActivityIndicator } from 'react-native';
import { myStyle } from '../../style/pocket_style';
import { LinearGradient } from 'expo-linear-gradient';
import Textbox from '../../components/textbox';
import { useSession } from '../../components/ctx';
import { useEffect, useState, useRef } from 'react';
import BottomBar from '../../components/bottomBar';
import { ip } from '../../config';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';

export default function Transaction() {
    const { signOut, session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [pockets, setPockets] = useState();
    const [pocket, setPocket] = useState();
    const [pockets_element, setPockets_element] = useState();
    const scrollViewRef = useRef(null); // สร้าง ref สำหรับ ScrollView

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('http://' + ip + ':8080/total_money', { pocketid: session.id });
            setPocket(res.data);
            console.log(res.data);
        } catch (err) {
            console.log("err :", err.message);
        }

        try {
            const res = await axios.post('http://' + ip + ':8080/transaction_main_id', { pocketid: session.id });
            setPockets(res.data);
        } catch (err) {
            console.log("err :", err.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (!pockets) return;

        // เรียงลำดับ pockets ตามวันที่จากเก่าไปใหม่
        const sortedPockets = [...pockets].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        const groupedElements = [];
        let lastDate = null;

        sortedPockets.forEach((pocket, index) => {
            const currentDate = moment(pocket.created_at).format('YYYY-MM-DD');

            if (currentDate !== lastDate) {
                // หากวันที่ปัจจุบันไม่เท่ากับวันที่ก่อนหน้า ให้เพิ่ม divider
                groupedElements.push(
                    <Text 
                        key={`date-${index}`} 
                        style={{ 
                            fontWeight: 'bold', 
                            fontSize: 16, 
                            marginVertical: 10, 
                            textAlign: 'center', 
                            color: '#A9A9A9'  // ใช้สีเทาจาง
                        }}
                    >
                        {currentDate}
                    </Text>
                );
                lastDate = currentDate;
            }

            groupedElements.push(<Textbox key={index} props={pocket} />);
        });

        setPockets_element(groupedElements); 
    }, [pockets]);

    // เพิ่ม useEffect สำหรับการเลื่อนลงด้านล่าง
    useEffect(() => {
        if (pockets && scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: false });
        }
    }, [pockets_element]);

    return (
        isLoading ?
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ActivityIndicator size="large" />
        </SafeAreaView>
        :
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
                        <Image source={session.avatar_url ? { uri: session.avatar_url } : (require("../../assets/images/avatar.png"))} style={{ width: 70, height: 70, borderRadius: 35 }} />
                        <View style={{ flexDirection: 'colum', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginLeft: 10 }}>{session.username ?? "ERROR"}</Text>
                            <Text style={{ fontSize: 15, marginLeft: 10 }}>{pocket?.sum}฿</Text>
                        </View>
                    </View>                    
                </View>
            </View>

            {/* main content */}
            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} style={myStyle.main_content_box}>
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
