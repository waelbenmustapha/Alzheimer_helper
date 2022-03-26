import { View, Modal, Text, Image, TouchableOpacity, ScrollView, Button, StyleSheet, SafeAreaView, StatusBar, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const reload = () => window.location.reload();

const Contact = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [phonenumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [contact, setContact] = useState([]);

    const [userData, setuserData] = useState(null);

    const isFocused = useIsFocused();

    //image piker
    const loadImages = async () => {
        try {
            const res = await fetch('/api/images');
            const data = await res.json();
            setImage(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadImages();
    }, []);

    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`

                }
                handleUpload(newfile)
            }
        } else {
            Alert.alert("you need to give up permission to work")
        }
    }


    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [2, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`

                }
                handleUpload(newfile)
            }
        } else {
            Alert.alert("you need to give up permission to work")
        }
    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'dementia')
        data.append("cloud_name", "elaa")

        fetch("https://api.cloudinary.com/v1_1/elaa/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {
                setImage(data.url)
                setModal(false)
            }).catch(err => {
                Alert.alert("error while uploading")
            })
    }

    //addcontact
    function AddContact(async) {

        AsyncStorage.getItem('user')
            .then(value => {
                console.log(JSON.parse(value));
                console.log(JSON.parse(value).type)
                if (JSON.parse(value).type) {
                    axios.post(`http://192.168.1.26:8090/contacts/add/${JSON.parse(value).dementia.id}`,
                        { phonenumber: phonenumber, name: name /*, image */ })
                    alert("Successful contact added!");
                }
            }).then(reload)

    }

    function getData() {
        AsyncStorage.getItem('user')
            .then(value => {
                console.log(JSON.parse(value));
                console.log(JSON.parse(value).type)
                /* if (JSON.parse(value).type) {
                    axios.get(`http://192.168.1.26:8090/contacts/get-contacts/${JSON.parse(value).dementia.id}`)
                        .then((res) => {
                            console.log(res.data)
                            if (res.data != null)
                                setContact(res.data)
                        }
                        )
                } */
                if (JSON.parse(value).type == 'dementia') {
                    axios.get(`http://192.168.1.26:8090/contacts/get-contacts/${JSON.parse(value).id}`)
                        .then((res) => {
                            console.log(res.data)
                            if (res.data != null)
                                setContact(res.data)
                            navigation.navigate("Contact")

                        }
                        )


                }
                else {
                    axios.get(`http://192.168.1.26:8090/contacts/get-contacts/${JSON.parse(value).dementia.id}`)
                        .then((res) => { setContact(res.data); console.log(res.data) })
                }
            })
    }
    useEffect(() => {
        AsyncStorage.getItem('user', (err, item) => { setuserData(JSON.parse(item)); console.log("++++++" + item) })

        getData();
    }, [isFocused]);



    return (

        <View style={styles.container}>



            <Text style={styles.sectionTitle}>Add Contact</Text>
            <View style={[styles.container, { flexDirection: "column" }]}>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.contactview} >
                        <View style={styles.container1}>
                            <View style={{ alignItems: 'center' }} >

                                {/* <View style={styles.item}>
                                    <Text style={{ fontSize: 32 }}>Name</Text>
                                    <Text style={{ fontSize: 18 }}>Phone Number</Text>
                                </View> */}

                                {contact.map((el) => (
                                    <View>
                                        <View key={el.id}
                                            style={styles.item}>
                                            <TouchableOpacity >
                                                <Image
                                                    source={{ uri: 'data:image/png;base64,' + image }}
                                                />
                                            </TouchableOpacity>
                                            <Text>Name : {el.name}</Text>
                                            <Text>Phone : {el.phonenumber}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.addbutton}>
                    <Pressable
                        style={styles.addbutton}
                        onPress={() => setModalVisible(true)}
                    >
                        <AntDesign name="pluscircleo" size={50} color="#4A0D66" />
                    </Pressable>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                    <AntDesign name="closecircleo" size={40} color="black" />
                                </Pressable>
                                <View>
                                    <View style={styles.form} >
                                        <View style={{ alignItems: "center",flexDirection:"row" }}>
                                            <Text>Choose picture
                                                <Pressable
                                                    onPress={() => pickFromGallery()}>
                                                    <Entypo name="image" size={40} color="black" />
                                                </Pressable></Text>
                                        </View>
                                        <TextInput
                                            style={styles.input}
                                            value={name}
                                            placeholder='Name'
                                            autoCapitalize="none"
                                            placeholderTextColor='#00000080'
                                            onChangeText={(name) => setName(name)}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Phone Number'
                                            autoCapitalize="none"
                                            keyboardType="number-pad"
                                            value={phonenumber}
                                            placeholderTextColor='#00000080'
                                            onChangeText={(phonenumber) => setPhoneNumber(phonenumber)}
                                        />
                                    </View>
                                    <Pressable
                                        onPress={() => { AddContact(); setModalVisible(!modalVisible); }}
                                        style={styles.addbutton1}>
                                        <Text >Add</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View >


    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        padding: '4%',
    },
    container1: {
        backgroundColor: "#359A8E20",
        borderRadius: 40,
    },
    contactview: {
        flex: 1,
        padding: "5%",
    },
    scrollView: {
        marginHorizontal: 5,
    },
    item: {
        alignItems: "center",
        padding: "7%",
        paddingStart: 20,
        borderRadius: 10,
    },

    Title: {
        fontWeight: "bold",
        fontSize: 24,
    },
    addbutton: {
        position: "relative",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "column",
    },
    addbutton1: {
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "3%",
        marginLeft: "50%",
        marginTop: "10%",
        borderRadius: 10,
        elevation: 3,
        borderColor: "#359A8E",
        backgroundColor: "#fff",
        shadowColor: "#359A8E",
        shadowOpacity: 0.2,
        shadowRadius: 1.22,
        elevation: 11,
    },
    image: {
        height: 200,
        borderRadius: 20
    },
    sectionTitle: {
        margin: "5%",
        marginLeft: "10%",
        fontSize: 28,
        fontWeight: "bold",
        color: "#359A8E",
    },
    form: {
        alignItems: "center",
        paddingTop: "5%"
    },
    input: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: "60%",
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#4A0D66',
        color: 'black',
        margin: 10,
        padding: 8,
        borderRadius: 10,
        fontSize: 18,
        fontWeight: '500',
        shadowColor: "#4A0D66",
        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        justifyContent: "flex-end",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
export default Contact;