import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { myStyle } from '../../style/home_style';
import { LinearGradient } from 'expo-linear-gradient';
import PocketCard from '../../components/pocketCard';
import { useEffect, useState } from 'react';
import BottomBar from '../../components/bottomBar';
import { ip } from '../../config';
import axios from 'axios'
import { useSession } from '../../components/ctx';
import { router, Redirect } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { signOut, session } = useSession();
    const [pockets, setPockets] = useState([])
    const [mainPockets, setMainPockets] = useState([])
    const [pockets_element, setPockets_element] = useState()
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://' + ip + ':8080/pockets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: session.id }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            setPockets(data.filter(pocket => pocket.pocket_name !== "main"));
            setMainPockets(data.find(pocket => pocket.pocket_name === "main"));
        } catch (err) {
            console.log("err :", err.message);
        }
        setIsLoading(false);


    };


    useEffect(() => {
        setPockets_element(pockets.map((pocket, index) => {
            return <PocketCard key={index} props={pocket} />
        }))
    }, [pockets])



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

            (<LinearGradient
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
                            <Text style={{ fontSize: 20, marginLeft: 10 }}>{session?.user_metadata?.username ?? "ERROR"}</Text>
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
                        <Text style={{ fontSize: 20 }}> {mainPockets?.money}</Text>
                        <View style={{ alignItems: 'center' }}>
                            <Image onPress={() => router.push("newpocket")} source={require("../../assets/images/transfer.png")} />
                            <Text onPress={() => router.push("transfermoney")}>transfer</Text>
                        </View>
                    </View>
                    <View style={myStyle.grid}>
                        {pockets_element}
                    </View>
                </ScrollView>
                {/* bottom bar */}
                <View style={myStyle.add_pocket}>
                    <Text style={{ fontSize: 16, color: "white" }} onPress={() => router.push("newpocket")}>Add Pocket</Text>
                </View>
                <BottomBar />
            </LinearGradient>)


    );
}