import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./screens/AuthScreen";
import MainScreen from "./screens/MainScreen";
import BusRouteScreen from "./screens/BusRouteScreen";
import PaymentScreen from "./screens/PaymentScreen";
import QRScanner from "./screens/QRScanner";
import { onAuthStateChanged } from "firebase/auth";
import { firebase_auth } from "./firebaseConfig";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase_auth, (authUser) => {
      if (authUser) {
        setUser(authUser); 
      } else {
        setUser(null); 
      }
    });
    
    return () => unsubscribe(); 
  }, []);

  return (
    < >
      <Stack.Navigator initialRouteName="Main">
        {true ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BusRoute" component={BusRouteScreen} options={{ headerShown: false }} />
            <Stack.Screen name="QRScan" component={QRScanner} options={{ headerShown: false }} />
            <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </>
  );
}
