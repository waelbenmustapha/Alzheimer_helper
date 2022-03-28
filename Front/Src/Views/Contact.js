import { View, Modal, Text, Image, TouchableOpacity, ScrollView, Button, StyleSheet, SafeAreaView, StatusBar, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Linking } from 'react-native';

const Contact = ({ navigation }) => {


    const [modalVisible, setModalVisible] = useState(false);
    const [phonenumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [contact, setContact] = useState([]);
    const [userData, setuserData] = useState();
    const isFocused = useIsFocused();
    const [loader, setloader] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let base64Img = `data:image/jpg;base64,${image}`;

    //image piker

    useEffect(() => {
    }, []);


    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
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
            alert("you need to give up permission to work")
        }
    }

    const handleUpload = (image) => {
        setloader(true)

        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'dementia')
        data.append("cloud_name", "elaa")
        fetch("https://api.cloudinary.com/v1_1/elaa/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {
                setloader(false)

                setImage(data.url)
            }).catch(err => {
                alert("error while uploading")
            })
    }

    //addcontact

    function AddContact(async) {
        AsyncStorage.getItem('user')
            .then(value => {
                console.log(JSON.parse(value));
                if (JSON.parse(value).type) {
                    axios.post(`http://172.16.17.177:8090/contacts/add/${JSON.parse(value).dementia.id}`,
                        { number: phonenumber, name: name, image: image }).then(res => getData())
                    alert("Successful contact added!");
                }
            })
    }

    function getData() {
        AsyncStorage.getItem('user')
            .then(value => {
                console.log(JSON.parse(value));
                console.log(JSON.parse(value).type)
                /* if (JSON.parse(value).type) {
                    axios.get(`http://172.16.17.177:8090/contacts/get-contacts/${JSON.parse(value).dementia.id}`)
                        .then((res) => {
                            console.log(res.data)
                            if (res.data != null)
                                setContact(res.data)
                        }
                        )
                } */
                if (JSON.parse(value).type == 'dementia') {
                    axios.get(`http://172.16.17.177:8090/contacts/get-contacts/${JSON.parse(value).id}`)
                        .then((res) => {
                            console.log(res.data)
                            if (res.data != null)
                                setContact(res.data)
                        }
                        )
                }
                else {
                    axios.get(`http://172.16.17.177:8090/contacts/get-contacts/${JSON.parse(value).dementia.id}`)
                        .then((res) => { setContact(res.data); console.log(res.data) })
                }
            })
    }
    useEffect(() => {
        AsyncStorage.getItem('user', (err, item) => { setuserData(JSON.parse(item)); console.log("++++++" + item) })

        getData();
    }, [isFocused]);


    //contact permission
    /* useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails],
                });
                if (data.length > 0) {
                    const contact = data[0];
                    console.log(contact);
                }
            }
        })();
    }, []); */

if (userData ==null){
    return (
        <Text> Loading  </Text>
    )
}
    return (

        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Add Contact</Text>
            <View style={[styles.container, { flexDirection: "column" }]}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.contactview} >
                        <View >
                            <View>
                                {contact.map((el) => (
                                    <View style={styles.container1}
                                        key={el.id}>

                                        <View
                                            style={styles.item}>
                                            <TouchableOpacity 
                                            onPress={()=> Linking.openURL(`tel:${el.number}`)}
                                            style={{ alignItems: 'center', flexDirection: "row" }} >
                                                <View >
                                                    <Image
                                                        resizeMode='stretch'
                                                        style={styles.image}
                                                        source={{ uri: el.image }}
                                                    />
                                                </View>
                                                <View style={{ padding: "5%", }}>
                                                    <Text style={{ fontSize: 18 }}>Name : {el.name}</Text>
                                                    <Text style={{ fontSize: 14 }}>Phone number : {el.phonenumber}</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                        <Pressable style={{ alignItems: "flex-end" }}
                                            onPress={() => updateContact()}>
                                            <AntDesign name="edit" size={40} color="black" />
                                        </Pressable>
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
                                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                                            <Pressable
                                                onPress={() => pickFromGallery()}>
                                                {loader == false ? <Entypo name="image" size={40} color="black" /> : <Text>loading</Text>}
                                            </Pressable>
                                        </View>
                                        {image === null ? null : <Image
                                            resizeMode='stretch'
                                            style={styles.image}
                                            source={{ uri: image }}
                                        />}
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
        padding: '3%',
    },
    container1: {
        backgroundColor: "#359A8E90",
        borderRadius: 20,
        margin: "2%",
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
        paddingStart: 20,
        borderRadius: 10,
        padding: "2%"

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
        backgroundColor: "#359A8E",
        shadowColor: "#359A8E",
        shadowOpacity: 0.2,
        shadowRadius: 1.22,
        elevation: 11,
    },
    image: {
        height: 200,
        width: 200,
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