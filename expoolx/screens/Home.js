import { StyleSheet, Text, View, Image, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'



export default function Home({ navigation }) {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://192.168.3.115:4000/ads/')
      .then(res => setData(res.data))
      .catch(err => console.log('err', err))
  }, [data])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/olx.jpg')}
          style={styles.icon1}
        ></Image>
        <Image
          source={require('../assets/car.png')}
        ></Image>
        <Text style={styles.txt}>Motors</Text>
        <Image
          source={require('../assets/property.png')}
        ></Image>
        <Text style={styles.txt} >Property</Text>
      </View>

      <View style={styles.search}>
        <View style={styles.bar}>
          <Image source={require('../assets/search.png')}
            style={styles.icon2}
          ></Image>
          <TextInput placeholder='What you are looking for?' style={styles.input} />
        </View>
      </View>

      


      <ScrollView>
        <View style={styles.ads}>

          {
            data.map(item => {
              return <TouchableOpacity style={styles.cont} 
              onPress={() => navigation.navigate('Detail', {adId: item._id})}
               >
                <Image source={{ uri: item.img }} style={styles.image} ></Image>
                <Text style={styles.title} >{item.title}</Text>
                <Text style={styles.location}  >{item.location}</Text>
                <Text style={styles.price}>Rs {item.price}/=</Text>
              </TouchableOpacity>
            })
          }

        </View>
      </ScrollView>


      {/* <Navigation /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  img: {
    width: 300,
    height: 300
  },
  olx: {
    fontSize: 40,
    fontWeight: '600',
    color: 'blue'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20
  },
  txt: {
    position: 'relative',
    left: -20
  },
  icon1: {
    width: 80
  },
  search: {
    width: '100%',
    height: 70,
    backgroundColor: '#D3D3D3',
    display: 'flex',
    justifyContent: 'center',
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
    height: 40,
    marginLeft: 30,
    marginRight: 30
  },
  icon2: {
    position: 'relative',
    left: -30,
    width: 20
  },
  input: {
    position: 'relative',
    left: -20
  },
  image: {
    width: 320,
    height: 180
  },
  ads: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cont: {
    alignItems: 'center',
    width: 350,
    height: 300,
    borderColor: 'grey',
    borderWidth: 2,
    padding: 20,
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  price: {
    fontSize: 17,
    fontWeight: '900'
  },
  location: {
    fontSize: 15,
    fontWeight: '400'
  }

})