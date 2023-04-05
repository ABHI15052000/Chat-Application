import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const UsersScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const collectionRef = collection(db, "users");
  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { email, name } = doc.data();
        users.push({
          id: doc.id,
          email,
          name,
        });
      });
      setUsers(users);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{marginBottom: 20}}>
      <View style={{marginVertical: 20}}>
        <Text style={{ textAlign: "center", fontSize: 28, fontWeight: 700, marginTop: 30 }}>
          Users List
        </Text>
      </View>
      <FlatList
        style={{}}
        data={users}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              borderRadius: 10,
              height: 50,
              borderWidth: 3,
              borderColor: "#662D91",
              marginVertical: 20,
              marginHorizontal: 10,
            }}
          >
            <AntDesign
              name="user"
              size={26}
              color="black"
              style={{ marginRight: 10, marginTop: 6, marginLeft: 4 }}
            />
            <Text style={{ fontWeight: 500, fontSize: 22, color: "#000000", marginTop: 5  }}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({});
