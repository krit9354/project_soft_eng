import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { myStyle } from '../style/home_style';
import { LinearGradient } from 'expo-linear-gradient';
import PocketCard from '../components/pocketCard';
import { useEffect, useState } from 'react';
import BottomBar from '../components/bottomBar';
import { ip } from '../config';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Link} from 'expo-router';
import { useSession } from '../components/ctx'
import { router, Redirect } from 'expo-router';

export default function Login() {
  const { isLoading, session, signIn } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      await signIn(email, password);

    } catch (err) {
      console.error(err.message);
      Alert.alert("Email or password is incorrect");
    }
  };
  
  if (session) return (
    <Redirect href="home" />
  );
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
      <TextInput

        placeholder="ID"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput

        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View >
        <TouchableOpacity >
          <Text onPress={login} >Login</Text>
        </TouchableOpacity>
        <Link href="/register" asChild>
        <TouchableOpacity >
          <Text >Register</Text>
        </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>


  );
}