import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData !== null) {
      return JSON.parse(userData);
    }
  } catch (error) {
    console.log(error);
  }
};
const HomeSceen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const logout = () => {
    AsyncStorage.removeItem("userData");
    navigation.navigate("Login");
  };
  useEffect(() => {
    getUserData().then((userData) => {
      if (userData) {
        setUser(userData);
      }
    });
  }, []);
  const handle2 = async () => {
        const supported = await Linking.canOpenURL("https://meet.google.com/mjb-fofr-rje?authuser=1");
        if (supported) {
          await Linking.openURL("https://meet.google.com/mjb-fofr-rje?authuser=1");
        } else {
          console.log(`Don't know how to open URL: ${"https://meet.google.com/mjb-fofr-rje?authuser=1"}`);
        }
      };
  console.log(user)
  return (
    <View style={{ flex: 1, backgroundColor: "#E6E6FA", }}>
      <View>
        <Image
          style={{
            backgroundColor: "#E6E6FA",
            height: 100,
            width: 100,
            marginBottom: 50,
            marginTop: 200,
            alignSelf: "center",
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4096/4096358.png",
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("UsersScreen")}
          style={{
            width: 250,
            height: 70,
            backgroundColor: "#662D91",
            borderRadius: 15,
            padding: 15,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Users List
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 250,
            height: 70,
            backgroundColor: "#662D91",
            borderRadius: 15,
            padding: 15,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 20,
          }}
          onPress={() =>
            navigation.navigate("ChatScreen", {
              user: user,
            })
          }
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Chat-Adda
          </Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          onPress={handle2}
          style={{
            width: 250,
            height: 70,
            backgroundColor: "#662D91",
            borderRadius: 15,
            padding: 15,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Group Meeting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={{
            width: 250,
            height: 70,
            backgroundColor: "#662D91",
            borderRadius: 15,
            padding: 15,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeSceen;
