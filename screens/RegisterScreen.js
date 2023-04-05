import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = (email, password) => {
    if (password === "" || email === "" || password !== confirmPassword) {
      Alert.alert("Invalid Details", "Please enter all the fields correctly", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK" },
      ]);
    } else
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const myUserUid = auth.currentUser.uid;
          updateProfile(user, {
            displayName: name,
          });
          navigation.navigate("Home");
          setDoc(doc(db, "users", `${myUserUid}`), {
            id: myUserUid,
            email,
            name,
          });
        })
        .catch((e) => {
          setError(e.toString());
          Alert.alert("Invalid Details", error, [
            {
              text: "Cancel",
              style: "cancel",
            },
            { text: "OK" },
          ]);
        });
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
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 22, color: "#662D91", fontWeight: "bold" }}>
            Register
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Create a new account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="user" size={24} color="black" />
            <TextInput
              placeholder="Name"
              placeholderTextColor="black"
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 250,
                marginLeft: 10,
                marginBottom: 20,
              }}
            />
          </View>
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Ionicons name="md-key-outline" size={24} color="black" />
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholderTextColor="black"
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 250,
                marginLeft: 10,
              }}
            />
          </View>
          <Pressable
            onPress={() => register(email, password)}
            style={{
              width: 200,
              backgroundColor: "#662D91",
              borderRadius: 15,
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
              Register
            </Text>
          </Pressable>
          <Pressable
            style={{ marginTop: 20 }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "500",
              }}
            >
              Already have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
