import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { register } from '../config/firebase'


export default function Register ({ navigation }) {
  const [form, setForm] = useState({})

  const updateForm = (e, key) => {
    setForm({ ...form, [key]: e })
  }

  const signup = async () => {
    try {
      await register(form)
      alert("logged in")
      navigation.navigate('LoginPage')
    alert('registered')
    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image source={require('../assets/logo.jpg')} style={styles.img}></Image>
        <Text style={styles.text}>REGISTER IN OLX</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.box}>
          <TextInput placeholder='Name' keyboardType='default' style={styles.input} onChangeText={(e) => updateForm(e, 'name')} />
        </View>
        <View style={styles.box}>
          <TextInput placeholder='Email' keyboardType='email-address' style={styles.input} onChangeText={(e) => updateForm(e, 'email')} />
        </View>
        <View style={styles.box}>
          <TextInput placeholder='Password' style={styles.input} onChangeText={(e) => updateForm(e, 'password')} secureTextEntry={true} autoCapitalize="none" />
        </View>
        <TouchableOpacity style={styles.btn1} onPress={signup} >
          <Text style={styles.log}>Register</Text>
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.txt}>Already have an Account?</Text>
        </View>
        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.reg}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'white'
  },
  img: {
    flex: 1,
    width: 400,
    height: 50,
    marginLeft: 40,
    marginTop: -30,
  },
  text: {
    color: '#002F34',
    fontSize: 20,
    fontWeight: '600',
    position: 'relative',
    top: -120,
  },
  head: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    flex: 1,
    marginTop: -130
  },
  box: {
    marginLeft: 30,
    marginRight: 30
  },
  input: {
    borderWidth: 2,
    borderColor: '#002F34',
    padding: 10,
    marginTop: 30,
    fontSize: 17
  },
  btn1: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    borderColor: '#002F34',
    backgroundColor: '#002F34',
    borderWidth: 2,
    alignItems: 'center'
  },
  btn2: {
    borderWidth: 2,
    marginLeft: 30,
    marginRight: 30,
    borderColor: '#002F34',
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reg: {
    fontSize: 17,
    color: '#002F34'
  },
  log: {
    fontSize: 17,
    color: 'white'
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 15,
  },
  txt: {
    fontSize: 15
  }
})