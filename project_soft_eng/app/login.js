import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { myStyle } from '../style/login_style';
import { LinearGradient } from 'expo-linear-gradient';
import PocketCard from '../components/pocketCard';
import { useEffect, useState } from 'react';
import BottomBar from '../components/bottomBar';
import { ip } from '../config';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Link} from 'expo-router';
import { useSession } from '../components/ctx'
import { router, Redirect } from 'expo-router';

export default function Login() {
  const { isLoading, session, signIn } = useSession();

  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');

  async function login() {
    try {
      
      const x = await signIn(email, password);
      
      console.log(x)
    } catch (err) { 
      //  console.error(err.message);
     alert("Email or password is incorrect");
    }
  };
  
  if (session) {
    console.log("REDIRECTING TO HOME!");
    return (
      <Redirect href="home" />
    );
  }
  else if (isLoading) return (
    <Text>LOADING...</Text>
  );
  else return (
    <LinearGradient
      colors={['#CDFADB', '#38E298']}
      locations={[0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={myStyle.bg}>
      {/* top bar */}
      <View style={myStyle.bg}>
        <View style={myStyle.main_pocket}>
          
          <Text style={{fontSize:32}}>I have money</Text>
           <TextInput
        
        placeholder="ID"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={myStyle.pocket}
           />
        <TextInput
        style={myStyle.pocket}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
       />
      
        <TouchableOpacity style={myStyle.add_pocket} onPress={login} >
          <Text >Login</Text>
        </TouchableOpacity>
           </View>


            <Link href="/register" asChild >
        <TouchableOpacity >
          <Text >Register</Text>
        </TouchableOpacity>
          </Link>
      </View>
     

    </LinearGradient>


  );
}