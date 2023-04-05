import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.log(error);
  }
};

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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    getUserData().then((userData) => {
      if (userData) {
        navigation.navigate("Home");
        setUser(userData);
      }
    });
  }, []);
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((userData) => {
      console.log(userData);
      saveUserData(userData);
      setUser(userData);
      console.log(auth.currentUser.email);
      navigation.navigate("Home");
    }).catch((e)=> {
      setError(e.toString());
      Alert.alert("Invalid Details", error, [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK" },
      ]);
    })
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, marginTop: 120, marginBottom: 20 }}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/4096/4096358.png",
        }}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <Text style={{ fontSize: 22, color: "#662D91", fontWeight: "bold" }}>
          Sign In
        </Text>
        <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
          Sign in to your account
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="mail" size={24} color="black" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{
              fontSize: email ? 18 : 18,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              width: 250,
              marginLeft: 10,
              marginVertical: 10,
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="md-key-outline" size={24} color="black" />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="black"
            style={{
              fontSize: email ? 18 : 18,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              width: 250,
              marginLeft: 10,
              marginVertical: 20,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => login(email, password)}
          style={{
            width: 200,
            backgroundColor: "#662D91",
            borderRadius: 15,
            padding: 15,
            marginTop: 40,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              color: "gray",
              fontWeight: "500",
            }}
          >
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
