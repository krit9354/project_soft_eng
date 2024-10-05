import { View, Text, ScrollView, Image, TouchableOpacity,TextInput} from 'react-native';
import { myStyle } from '../style/home_style';
import { LinearGradient } from 'expo-linear-gradient';
import PocketCard from '../components/pocketCard';
import { useEffect, useState } from 'react';
import BottomBar from '../components/bottomBar';
import { useNavigation } from '@react-navigation/native';
import { ip } from '../config';
import axios from 'axios'
import { useSession } from '../components/ctx';
import { router } from 'expo-router';

export default function Register() {
    const { signUp } = useSession();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');

    async function  register  (){
      try{
        if (password != confirm_password) {
          return Alert.alert("Passwords don't match");
        }
        await signUp(email, username, password, confirm_password);
      } catch (err) {
        console.log("err_register :",err.message)
        Alert.alert("Register not successful");
      }
    };
    
    return (

        <LinearGradient
        colors={['#CDFADB', '#38E298']}
        locations={[0.75, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={myStyle.bg}>
            {/* top bar */}
            <TextInput
              value={email}
              placeholder="email"
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              value={username}
              placeholder="Username"
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              value={password}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
            />
            <TextInput
              value={confirm_password}
              placeholder="confirm Password"
              onChangeText={text => setConfirm_password(text)}
            />
             <View >
              <TouchableOpacity >
                <Text onPress={register} >
                  Register</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text onPress={() => navigation.goBack()} >Cancle</Text>
              </TouchableOpacity>
            </View>
        </LinearGradient>

        
    );
  }