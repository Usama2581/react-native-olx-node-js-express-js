import { StyleSheet, Text, View, Image, TextInput, Button ,TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'


export default function Postad({ navigation }) {

  let [form, setForm] = useState({})
  const [image, setImage] = useState(null);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

   console.log('result',result)
    if (!result.cancelled) {
      setImage(result.uri)
    }
  };

  console.log('img',image)

  const updateForm = (e, key) => {
    setForm({ ...form, [key]: e })
  }

  const submit = async () => {
    if (!image) {
      alert('image required')
    }
    else {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      })
     const ref = firebase.storage().ref().child(`Pictures/Image1${Math.random()}`)
     
      const snapshot = ref.put(blob)
      snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{
          // setUploading(true)
          console.log("")
        },
        (error) => {
          // setUploading(false)
          console.log(error)
          blob.close()
          return 
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then((url) => {
            // setUploading(false)  
            console.log("Download URL: ", url)
            setForm({...form, ['img']: url})
            blob.close()
            return url
          })
        }
        )
        
          if(!form.title || !form.description || !form.price || !form.location || !form.img){
            alert('all fields are required')
          }
          else{
            axios.post('http://192.168.3.115:4000/ads/insert', form )
            .then((res) => done(res))
            .catch(err => console.log('err',err))
            // alert('posted')
          }
    
        
    }

  }

  const done = () => {
    alert("posted")
    console.log(res)
    setForm('')
  }

  console.log(form)
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image source={require('../assets/logo.jpg')} style={styles.img}></Image>
        <Text style={styles.text}>SELL ON OLX</Text>
      </View>
      <ScrollView style={styles.form}>
        <View style={styles.box}>
          <TextInput placeholder='Title' style={styles.input} onChangeText={(e) => updateForm(e, 'title')} />
        </View>
        <View style={styles.box}>
          <TextInput placeholder='Price' style={styles.input} onChangeText={(e) => updateForm(e, 'price')} keyboardType='number-pad' keyboardAppearance='dark' />
        </View>
        <View style={styles.box}>
          <TextInput placeholder='Description' style={styles.input} onChangeText={(e) => updateForm(e, 'description')} />
        </View>
        <View style={styles.box}>
          <TextInput placeholder='Location' style={styles.input} onChangeText={(e) => updateForm(e, 'location')} />
        </View>
        <TouchableOpacity style={styles.btn1} onPress={pickImage}>
          <Text style={styles.log}>Select image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn2} onPress={submit}>
          <Text style={styles.log}>Post</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    backgroundColor : 'white'
  },
  img: {
    flex: 1,
    width: 400,
    height: 50,
    marginLeft: 70,
    marginTop: -80,
  },
  text: {
    color: '#002F34',
    fontSize: 20,
    fontWeight: '600',
    position: 'relative',
    top: -130,
  },
  head: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    flex: 4,
    marginTop: -120
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
    marginBottom: 30,
    height: 50,
    justifyContent: 'center',
    borderColor: '#002F34',
    backgroundColor: '#002F34',
    borderWidth: 2,
    alignItems: 'center'
  },
  btn2: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    // marginTop: 30,
    marginBottom: 30,
    height: 50,
    justifyContent: 'center',
    borderColor: '#002F34',
    backgroundColor: '#002F34',
    borderWidth: 2,
    alignItems: 'center'
  },
  log: {
    fontSize: 17,
    color: 'white'
  },
  img1: {
    width: 200,
    height: 200
  }
})
//tekRevol