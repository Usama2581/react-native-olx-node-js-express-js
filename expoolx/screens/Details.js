import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function Details({ route }) {
    const { adId } = route.params;
    

    const [data, setData] = useState({})

    useEffect(() => {
        axios.get(`http://192.168.3.115:4000/ads/single/${adId}`)
          .then(res => setData(res.data))
          .catch(err => console.log('err', err))
      }, [data])
    
      if(!data) {
        return <Text>Loading...</Text>
      }

      let {title, price, description, img, location} = data
  return (
    <View style={styles.container} >
    <View style={styles.container1} >
        <Image source={{uri: img}} 
          style={styles.img}
        ></Image>
      <Text style={styles.title} >{title}</Text>
      <Text style={styles.price} >Rs {price}/=</Text>
      <Text style={styles.location} >{location}</Text>
      <Text style={styles.description} >{description}</Text>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'flex-start'
      },
      container1: {
         margin: 20
      },
      img: {
        width: '100%',
        height: 300
      },
      title: {
        fontSize: 25,
        fontWeight: '500'
      },
      price: {
        fontSize: 17,
        fontWeight: '900'
      },
      location: {
        fontSize: 15,
        fontWeight: '500'
      },
      description: {
        fontSize: 15,
        fontWeight: '400'
      }
})