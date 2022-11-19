import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home';
import Landing from '../screens/Landing';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Postad from '../screens/Postad';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Details from '../screens/Details';
import Chats from '../screens/Chats';
import Account from '../screens/Account';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon form 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Ionicons';


export default function Navigator() {
    const [user, setUser] = useState('')

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(true)
            } else {
                setUser(false)
            }
        });
    }, [])
    return (
        <NavigationContainer>
            {
                user ? 
                <Authnavigator />
                : 
                <Stacknavigator />
            }
         </NavigationContainer>
    )
}


function Stacknavigator() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Landingpage' component={Landing} />
            <Stack.Screen name='LoginPage' component={Login} />
            <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
    )
}

function Authnavigator() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{
            activeTintColor: "black",
            inactiveTintColor: "gray",
            tabBarLabelStyle: {
                fontSize: 13,
            },
        }}>
            <Tab.Screen name='Home' component={Home} options={{ headerShown: false,
        tabBarIcon: () => {
            return <Icon name='home' size={20} />
        }    
        
        }
        
        }/>
            <Tab.Screen name='Post Ad' component={Postad} options={{ headerShown: false,
               tabBarIcon: () => {
                return <Icon name='add-circle' size={20}/>
            } 
            }}/>
            <Tab.Screen name='Chat' component={Chats}  options={{
                  tabBarIcon: () => {
                    return <Icon name='chatbox' size={20}/>
                }

            }} size={30} />
            <Tab.Screen name='Account' component={Account} options={{
                  tabBarIcon: () => {
                    return <Icon name='person' size={20}/>
                },
                
                
            }} />
             <Tab.Screen name='Detail' component={Details} />
        </Tab.Navigator>
    )
}