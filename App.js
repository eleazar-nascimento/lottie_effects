import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { View,
  TextInput,
  KeyboardAvoidingView,
  Image, 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  Keyboard,
  Animated } from 'react-native';


export default function App() {

    const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({x: 150, y: 170}));

    useEffect(()=> {
      KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
      KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
      Animated.parallel([
        Animated.spring(offset.y, {
          toValue: 0,
          speed: 4,
          bounciness: 20
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
        })
      ]).start();

    }, []);


  function keyboardDidShow() {
    
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 75,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 75,
        duration: 100,
      }),
    ]).start();
  }

  function keyboardDidHide() {

    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 150,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 170,
        duration: 100,
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image 
        style={{
          width: logo.x,
          height: logo.y,
        }}
        source={require('./assets/sun.png')}/>
      </View>
      
      <Animated.View 
    style={[
      styles.container,
      {
        opacity: opacity,
        transform: [
          { translateY: offset.y}
        ]
      }
    ]}>
      <TextInput
      style={styles.input}
      placeholder="E-mail" 
      autoCorrect={false} 
      onChangeText={()=> {}}
      />

      <TextInput
      style={styles.input}
      placeholder="Password"
      autoCorrect={false}
      onChangeText={()=> {}}
      />

      <TouchableOpacity style={styles.btnSubmit}>
        <Text style={styles.submitText}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnRegister}>
        <Text style={styles.registerText}>Crie sua conta gratuitamente</Text>
      </TouchableOpacity>

    </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#191919',
  },
  containerLogo:{
    flex: 1,
    justifyContent: 'center',
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText:{
    color: '#FFF',
  }
});

