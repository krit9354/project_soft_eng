import { View, Text, Image, TextInput, } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { myStyle } from '../style/summary_style';


export default function Summary() {
  const moneyIn = 2000
  const moneyOut = 1000
  return (
    <LinearGradient
      colors={['#CDFADB', '#38E298']}
      locations={[0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={myStyle.bg}>
      {/* top bar */}
      <View style={myStyle.bg_white}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 20 }}>Summary</Text>
        <TextInput placeholder="Name"></TextInput>
        <View style={myStyle.containerShow}>
          <View style={myStyle.box}>
            <Text>รวมเงินเข้า (บาท)</Text>
            <Text>{moneyIn}</Text>
          </View>
          <View style={myStyle.box}>
            <Text>รวมเป็นออก (บาท)</Text>
            <Text>{moneyOut}</Text>
          </View>
        </View>


      </View>
    </LinearGradient>
  );
}