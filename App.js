import {View, Text, TouchableOpacity, Image,StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AutoTypingText from 'react-native-auto-typing-text';

export default function App() {
  const [color, setColor] = useState('#000');
  const [imageUri, setimageUri] = useState(' ');

  const openCamera = () => {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchCamera(options, response => {
      console.log('Respnse = ', response);
      if (response.didCancel) {
        console.log('user cancelled image picer');
      } else if (response.error) {
        console.log('Image Picker error', response.error);
      } else if (response.cusomButton) {
        console.log('User tapped Custom Button', response.cusomButton);
      } else {
        const source = {uri: response.assets[0]?.uri};
        setimageUri(source);
      }
    });
  };

  // const openGallery = () => {
  //   let options = {
  //     storageOptions: {
  //       path: 'images',
  //       mediaType: 'photo',
  //     },
  //     includeBase64: true,
  //   };
  //   launchImageLibrary(options, response => {
  //     console.log('Respnse = ', response);
  //     if (response.didCancel) {
  //       console.log('user cancelled image picer');
  //     } else if (response.error) {
  //       console.log('Image Picker error', response.error);
  //     } else if (response.cusomButton) {
  //       console.log('User tapped Custom Button', response.cusomButton);
  //     } else {
  //       // const source = {uri: 'data:image/jpeg;base64,' + response.base64};
  //       // setimageUri(source);

  //       const source = {uri: response.assets[0]?.uri};
  //       console.log('---source--->', source)
  //       setimageUri(source);

  //     }
  //   });
  // };


  const changeColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    setColor('#' + randomColor);
  }


  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',borderWidth: 8 ,borderColor: color,backgroundColor:'#E5E5E5'}}>
      <AutoTypingText
        text={`In this Task You can Captured Image through Mobile Camera and Show In this Circle Box That this  Image`}
        charMovingTime={80}
        delay={0}
        style={{
          fontSize: 25,
          justifyContent: 'center',
          top: 20,
          textAlign: 'center',
          color: color
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          bottom: 10,
          top: -250,
    
        }}
        onPress={() => {
          openCamera();
        }}>
        <Text style={{color: color, fontSize: 25}}>Open Camera</Text>
      </TouchableOpacity>

      <Image
        source={imageUri}
        style={{
          height: 250,
          width: 250,
          borderWidth: 2,
          borderColor: color,
          marginBottom: 10,
          borderRadius: 200,
          top: -200,
        }}
      />

      {/* <TouchableOpacity
        style={{
        }}
        onPress={() => {
          openGallery();
        }}>
        <Text style={{color: 'white', fontSize: 25}}>Open Gallery</Text>
      </TouchableOpacity>

      <Image
        source={imageUri}
      /> */}
      <Text style={[styles.text, { color: color }]} onPress={changeColor}>
        Click On Me
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    top:-100
  },
});
