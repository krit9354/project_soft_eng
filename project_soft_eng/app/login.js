import { View, Text, ScrollView, Image, TouchableOpacity,TextInput} from 'react-native';
import { myStyle } from '../style/home_style';
import { LinearGradient } from 'expo-linear-gradient';
import PocketCard from '../components/pocketCard';
import { useEffect, useState } from 'react';
import BottomBar from '../components/bottomBar';
import { useNavigation } from '@react-navigation/native';
import { ip } from '../config';
import axios from 'axios'

export default function Login() {
    const navigation = useNavigation();
    
    return (

        <LinearGradient
        colors={['#CDFADB', '#38E298']}
        locations={[0.75, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={myStyle.bg}>
            {/* top bar */}
            <TextInput
            //   style={myStyle.input}
            //   value={amount}
            //   onChangeText={setAmount}
              placeholder="ID"
        
            />
            <TextInput
            //   style={myStyle.input}
            //   value={amount}
            //   onChangeText={setAmount}
              placeholder="Password"
          
            />
             <View >
              <TouchableOpacity >
                <Text >Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                <Text >Register</Text>
              </TouchableOpacity>
            </View>
        </LinearGradient>

        
    );
  }