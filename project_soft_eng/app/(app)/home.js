import { View, Text, ScrollView, Image, FlatList } from 'react-native';
import { myStyle } from '../../style/home_style';
import { LinearGradient } from 'expo-linear-gradient';
import PocketCard from '../../components/pocketCard';
import { useEffect, useState } from 'react';
import BottomBar from '../../components/bottomBar';
import { ip } from '../../config';
import axios from 'axios'
import { useSession } from '../../components/ctx';
import { router, Redirect } from 'expo-router';
export default function HomeScreen() {
    const { signOut, session } = useSession();
    const [pockets, setPockets] = useState([])
    const [total, setTotal] = useState([])
    const [pockets_element, setPockets_element] = useState()


    useEffect(() => {
        // ฟังก์ชันในการดึงข้อมูลจาก API
        const fetchData = async () => {
            try {
                const res = await axios.post('http://' + ip + ':8080/pockets',{userId : session.id});
                setPockets(res.data);
                // console.log(res.data);
            } catch (err) {
                console.log("err :", err.message)
            }
            try {
                const res = await axios.post('http://' + ip + ':8080/total_money',{userId : session.id});
                setTotal(res.data.total);
                // console.log(res.data);
            } catch (err) {
                console.log("err :", err.message)
            }
        };
        // console.log(session);
        fetchData();
    }, []);

    useEffect(() => {
        setPockets_element(pockets.map((pocket, index) => {
            return <PocketCard key={index} props={pocket} />
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
                        <Image source={require("../../assets/images/nongP.jpg")} style={{ width: 70, height: 70, borderRadius: 35 }} />
                        <Text style={{ fontSize: 20, marginLeft: 10 }}>{ session?.user_metadata?.username ?? "ERROR" }</Text>
                        {/* <Text onPress={() => {
                            
                            signOut();
                        }}>Sign out</Text> */}
                    </View>
                    <View style={{ alignItems: 'center' }} >
                        <Image source={require("../../assets/images/history.png")} style={{ width: 30, height: 30, overflow: 'visible' }} />
                        <Text>history</Text>
                    </View>
                </View>
            </View>
            {/* main content */}
            <ScrollView showsVerticalScrollIndicator={false} style={myStyle.main_content_box}>
                <View style={myStyle.main_pocket}>
                    <Image source={require("../../assets/images/dollar.png")} />
                    <Text style={{ fontSize: 20 }}> {total}</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require("../../assets/images/transfer.png")} />
                        <Text>transfer</Text>
                    </View>
                </View>
                <View style={myStyle.grid}>
                    {pockets_element}
                </View>
            </ScrollView>
            {/* bottom bar */}
            <View style={myStyle.add_pocket}>
                <Text style={{ fontSize: 16, color: "white" }} onPress={() => router.push("addincome")}>Add Pocket</Text>
            </View>
            <BottomBar />
        </LinearGradient>


    );
}