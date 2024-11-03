import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { myStyle } from '../style/register_style';
import { LinearGradient } from 'expo-linear-gradient';
import PocketCard from '../components/pocketCard';
import { useEffect, useState } from 'react';
import BottomBar from '../components/bottomBar';
import { useNavigation } from '@react-navigation/native';
import { ip } from '../config';
import axios from 'axios'
import { useSession } from '../components/ctx';
import { router } from 'expo-router';
import validator from 'validator';

export default function Register() {
  const { signUp } = useSession();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');


  async function register() {
    try {
      console.log(!validator.isEmail(email))
      if (!validator.isEmail(email)) {
        console.log("Invalid email")
        return alert("Invalid email");
      }
      if (password != confirm_password) {
        return alert("Passwords don't match");
      }
      console.log("REGISTERING!!!")
      await signUp(email, username, password, confirm_password);
    } catch (err) {
      // console.log("err_register :",err.message)
      alert("Register not successful");
    }
  };
  // validate = (text) => {
  //   console.log(text);
  //   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //   if (reg.test(text) === false) {
  //     console.log("Email is Not Correct");
  //     this.setState({ email: text })
  //     return false;
  //   }
  //   else {
  //     this.setState({ email: text })
  //     console.log("Email is Correct");
  //   }
  // }
  return (

    <LinearGradient
      colors={['#CDFADB', '#38E298']}
      locations={[0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={myStyle.bg}>
      {/* top bar */}

      <View style={myStyle.bg}>
        <View style={myStyle.main_pocket}>

          <Text style={{ fontSize: 32 }}>I have money</Text>
          <TextInput
            value={email}
            placeholder="email"
            onChangeText={text => setEmail(text)}
            style={myStyle.pocket}
          />
          <TextInput
            value={username}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
            style={myStyle.pocket}
          />
          <TextInput
            value={password}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            style={myStyle.pocket}
          />
          <TextInput
            style={myStyle.pocket}
            value={confirm_password}
            placeholder="confirm Password"
            onChangeText={text => setConfirm_password(text)}
          />

          <TouchableOpacity style={myStyle.add_pocket} onPress={register} >
            <Text >Sign in</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={register}>
          <Text >Cancle</Text>
        </TouchableOpacity>

      </View>

    </LinearGradient>


  );
}