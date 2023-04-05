import React, { useState, useLayoutEffect, useCallback } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebase";
import { View, Image, TouchableOpacity } from "react-native";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { AntDesign } from "@expo/vector-icons";

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { user } = route.params;
  useLayoutEffect(() => {
    const unsubscribe = fetchMessages();
    return () => {
      unsubscribe();
    };
  }, []);
  const fetchMessages = () => {
    const collectionRef = collection(
      db,
      "chats",
      "btU9hIxXFJkt9cRj4pkp",
      "messages"
    );
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    return onSnapshot(
      q,
      (querySnapshot) => {
        setLoading(false);
        setMessages(
          querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const message = {
              _id: data._id,
              createdAt: data.createdAt.toDate(),
              user: data.user,
            };
            if (data.text) {
              message.text = data.text;
            }
            if (data.message) {
              message.text = data.message;
            }
            if (data.image) {
              message.image = data.image;
            }
            return message;
          })
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const sendMessage = (messages = []) => {
    const { _id, createdAt, text, name, user, image } = messages[0];
    const userEmail = auth?.currentUser?.email;
    console.log(auth?.currentUser?.email);
    if (image) {
      addDoc(collection(db, "chats", "btU9hIxXFJkt9cRj4pkp", "messages"), {
        _id,
        createdAt,
        user,
        image,
      }).catch((error) => {
        console.log(error);
      });
    } else {
      addDoc(collection(db, "chats", "btU9hIxXFJkt9cRj4pkp", "messages"), {
        _id,
        createdAt,
        message: text,
        user,
      }).catch((error) => {
        console.log(error);
      });
    }
  };
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    sendMessage(messages);
  }, []);
  const renderMessageImage = (props) => {
    return (
      <Image
        source={{ uri: props.currentMessage.image }}
        style={{ width: 200, height: 150, borderRadius: 10 }}
      />
    );
  };
  const renderActions = (props) => {
    const handleChoosePhoto = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          const { uri } = result.assets[0];
          setImage(uri);
          console.log("Image picked successfully", uri);
          uploadImage(uri);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const uploadImage = async (uri) => {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = ref(storage, `samurai/${Date.now()}`);
        const uploadTask = await uploadBytesResumable(storageRef, blob);
        console.log("Image uploaded successfully");
        const url = await getDownloadURL(storageRef);
        console.log(url);
        const message = {
          _id: new Date().getTime(),
          createdAt: new Date(),
          user: {
            _id: user.user.email,
            avatar:
              "https://git.scc.kit.edu/uploads/-/system/user/avatar/2/tt_avatar_small.jpg?width=400",
          },
          image: url,
        };
        onSend([message]);
      } catch (error) {
        console.log(error);
      }
    };

    const handleTakePhoto = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          const { uri } = result.assets[0];
          setImage(uri);
          console.log("Image picked successfully", uri);
          uploadImage(uri);
        }
      } else {
        alert("Camera permission not granted");
      }
    };

    return (
      <View style={{ flexDirection: "row-reverse" }}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <AntDesign
            name="upload"
            size={26}
            color="#662D91"
            style={{ marginHorizontal: 8, marginBottom: 10}}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTakePhoto}>
          <AntDesign
            name="camerao"
            size={26}
            color="#662D91"
            style={{ marginHorizontal: 4, }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Image source={
       require("../assets/back.jpg")
      } style={{position:"absolute", width: 800, height: 800}}/>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={true}
        onSend={onSend}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "#662D91",
                },
              }}
            />
          );
        }}
        renderActions={renderActions}
        renderMessageImage={renderMessageImage}
        textInputStyle={{
          backgroundColor: "white",
          borderRadius: 10,
        }}
        user={{
          _id: user.user.email,
          avatar:
            "https://git.scc.kit.edu/uploads/-/system/user/avatar/2/tt_avatar_small.jpg?width=400",
        }}
      />
    </View>
  );
}
