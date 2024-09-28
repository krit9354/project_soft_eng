import { View, Text, ScrollView, Image, TouchableOpacity,TextInput} from 'react-native';
import { myStyle } from '../style/home_style';
import { LinearGradient } from 'expo-linear-gradient';
import PocketCard from '../components/pocketCard';
import { useEffect, useState } from 'react';
import BottomBar from '../components/bottomBar';
import { useNavigation } from '@react-navigation/native';
import { ip } from '../config';
import axios from 'axios'

export default function Register() {
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

              placeholder="ID"
        
            />
            <TextInput
    
              placeholder="Password"
          
            />
            <TextInput
  
              placeholder="confirm Password"
          
            />
             <View >
              <TouchableOpacity >
                <Text >Register</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text >Cancle</Text>
              </TouchableOpacity>
            </View>
        </LinearGradient>

        
    );
  }