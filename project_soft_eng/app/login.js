import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { myStyle } from '../style/login_style';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Link, Redirect } from 'expo-router';
import { useSession } from '../components/ctx';

export default function Login() {
  const { isLoading, session, signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // สำหรับเช็คแสดงรหัสผ่าน

  async function login() {
    try {
      const x = await signIn(email, password);
    } catch (err) { 
      alert("Email or password is incorrect");
    }
  }

  if (session) {
    return <Redirect href="home" />;
  } else if (isLoading) return <Text>LOADING...</Text>;
  else return (
    <LinearGradient
      colors={['#CDFADB', '#38E298']}
      locations={[0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={myStyle.bg}>
      
      <View style={myStyle.main_pocket}>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>I have money</Text>
        
        {/* Email or Username Field */}
        <View style={[myStyle.pocket, { flexDirection: 'row', alignItems: 'center', marginTop: "15%", marginBottom: "5%" }]}>
          <Image source={require('../assets/images/person.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
          <TextInput
            placeholder="Email or Username"
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={{ flex: 1 }}
            placeholderTextColor="#7d7d7d"
          />
        </View>

        {/* Password Field with Show/Hide Password */}
        <View style={[myStyle.pocket, { flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: "10%" }]}>
          <Image source={require('../assets/images/lock.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword} // ถ้า showPassword เป็น false จะซ่อนรหัสผ่าน
            style={{ flex: 1 }}
            placeholderTextColor="#7d7d7d"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image 
              source={showPassword ? require('../assets/images/eye-open.png') : require('../assets/images/eye-closed.png')} 
              style={{ width: 25, height: 20, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={myStyle.add_pocket} onPress={login}>
          <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Register Link */}
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text>Doesn't have an account?</Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={{ color: '#00A7BE', fontWeight: 'bold' }}>Create an Account</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}
