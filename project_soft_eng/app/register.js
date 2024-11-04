import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { myStyle } from '../style/register_style';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useSession } from '../components/ctx';
import { router } from 'expo-router';
import validator from 'validator';

export default function Register() {
  const { signUp } = useSession();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // สำหรับเช็คแสดงรหัสผ่าน

  async function register() {
    try {
      if (!validator.isEmail(email)) {
        return alert("Invalid email");
      }
      if (password !== confirm_password) {
        return alert("Passwords don't match");
      }
      await signUp(email, username, password, confirm_password);
    } catch (err) {
      alert("Register not successful");
    }
  }

  return (
    <LinearGradient
      colors={['#CDFADB', '#38E298']}
      locations={[0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={myStyle.bg}>
      
      <View style={myStyle.main_pocket}>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>I have money</Text>

        {/* Email Field */}
        <View style={[myStyle.pocket, { flexDirection: 'row', alignItems: 'center', marginTop: "12%" }]}>
          <Image source={require('../assets/images/person.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
          <TextInput
            value={email}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            style={{ flex: 1 }}
            placeholderTextColor="#7d7d7d"
          />
        </View>

        {/* Username Field */}
        <View style={[myStyle.pocket, { flexDirection: 'row', alignItems: 'center', marginTop: 15 }]}>
          <Image source={require('../assets/images/person.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
          <TextInput
            value={username}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
            style={{ flex: 1 }}
            placeholderTextColor="#7d7d7d"
          />
        </View>

        {/* Password Field with Show Password */}
        <View style={[myStyle.pocket, { flexDirection: 'row', alignItems: 'center', marginTop: 15 }]}>
          <Image source={require('../assets/images/lock.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
          <TextInput
            value={password}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            secureTextEntry={!showPassword} // ถ้า showPassword เป็น false จะซ่อนรหัสผ่าน
            style={{ flex: 1 }}
            placeholderTextColor="#7d7d7d"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{width:"50"}}>
            <Image 
              source={showPassword ? require('../assets/images/eye-open.png') : require('../assets/images/eye-closed.png')} 
              style={{ width: 25, height: 20, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Field with Show Password */}
        <View style={[myStyle.pocket, { flexDirection: 'row', alignItems: 'center', marginTop: 15 }]}>
          <Image source={require('../assets/images/lock.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
          <TextInput
            value={confirm_password}
            placeholder="Confirm Password"
            onChangeText={text => setConfirm_password(text)}
            secureTextEntry={!showPassword} // ถ้า showPassword เป็น false จะซ่อนรหัสผ่าน
            style={{ flex: 1 }}
            placeholderTextColor="#7d7d7d"
          />
          <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
            <Image 
              source={showPassword2 ? require('../assets/images/eye-open.png') : require('../assets/images/eye-closed.png')} 
              style={{ width: 25, height: 20, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={myStyle.add_pocket} onPress={register}>
          <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: 'bold' }}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Cancel Button */}
      <TouchableOpacity onPress={router.back} style={{ marginTop: 20 }}>
        <Text style={{ color: '#7d7d7d' }}>Cancel</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
