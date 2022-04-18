import { View, Modal, Text, Image, TouchableOpacity, ScrollView, Button, StyleSheet, SafeAreaView, StatusBar, Pressable, TextInput } from 'react-native'
import React, { isValidElement, useEffect, useState } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Linking } from 'react-native';

const Contact = ({ navigation, route }) => {


    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
    const [phonenumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [contact, setContact] = useState([]);
    const [userData, setuserData] = useState();
    const isFocused = useIsFocused();
    const [loader, setloader] = useState(false);

    let base64Img = `data:image/jpg;base64,${image}`;

    //image piker



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
                console.log(data.url)
                setImage(data.url)
            }).catch(err => {
                alert("error while uploading")
            })
    }

    //updatecontact

    const updateContact = () => {
        console.log(edit)
        axios.put(`https://alzhelper.herokuapp.com/contacts/edit/${edit}`,
            { number: phonenumber, name: name, image: image })
            .then(getData()
            )
        alert("Successful contact updated!");
    }

    //deletecontact


    /*   function deleteContact(id) {
          console.log(id)
          axios.delete(`https://alzhelper.herokuapp.com/contacts/delete/${id}`);
          alert("Successful contact deleted!");
      } */

    const deleteContact = () => {
        axios.delete(`https://alzhelper.herokuapp.com/contacts/delete/${edit}`)
            .then(getData())
        getData();
    }




    //addcontact

    function AddContact(async) {
        if (!name.trim())
            return alert("Name is vide");
        if (name.length > 25)
            return alert("Name is too long");
        if (phonenumber.length < 8)
            return alert("Invalid Number");
        AsyncStorage.getItem('user')
            .then(value => {
                console.log(JSON.parse(value));
                if (JSON.parse(value).type) {
                    axios.post(`https://alzhelper.herokuapp.com/contacts/add/${JSON.parse(value).dementia.id}`,
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
                if (JSON.parse(value).type == 'dementia') {
                    axios.get(`https://alzhelper.herokuapp.com/contacts/get-contacts/${JSON.parse(value).id}`)
                        .then((res) => {
                            console.log(res.data)
                            if (res.data != null)
                                setContact(res.data)
                        })
                }
                else {
                    axios.get(`https://alzhelper.herokuapp.com/contacts/get-contacts/${JSON.parse(value).dementia.id}`)
                        .then((res) => {
                            setContact(res.data);
                            console.log(res.data)
                        })
                }
            })
    }
    useEffect(() => {
        AsyncStorage.getItem('user', (err, item) => { setuserData(JSON.parse(item)); console.log("++++++" + item) });

        getData();
    }, [isFocused]);


    const [edit, setedit] = useState();

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


    if (userData == null) {
        return (
            <Text> Loading  </Text>
        )
    }
    return (

        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Contact</Text>
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
                                                onPress={() => Linking.openURL(`tel:${el.number}`)}
                                                style={{ alignItems: 'center', flexDirection: "column" }} >
                                                <View >
                                                    <Image
                                                        resizeMode='stretch'
                                                        style={styles.image}
                                                        source={{ uri: el.image }}
                                                    />
                                                </View>
                                                <View style={{ padding: "1%", alignItems: 'center', }}>
                                                    <Text style={{ fontSize: 28 }}>{el.name}</Text>
                                                    <Text style={{ fontSize: 18 }}>{el.number}</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>

                                        {userData.type == "guardian" ?

                                            <Pressable style={{ alignItems: "flex-end" }}
                                                onPress={() => [setedit(el.id), setModalVisibleUpdate(true)]}>
                                                <AntDesign name="edit" size={40} color="black" />
                                            </Pressable>
                                            : null}
                                    </View>))}
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleUpdate}
                                onRequestClose={() => {
                                    setModalVisibleUpdate(!modalVisibleUpdate);
                                }}
                            ><ScrollView>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Pressable onPress={() => setModalVisibleUpdate(!modalVisibleUpdate)}>
                                                <AntDesign name="closecircleo" size={40} color="black" />
                                            </Pressable>
                                            <ScrollView>
                                                <View style={styles.form} >

                                                    <Pressable
                                                        onPress={() => pickFromGallery()}>
                                                        {loader == false ? <Entypo name="image" size={40} color="black" /> :
                                                            <Text>loading</Text>}
                                                        <View >
                                                           <Image
                                                                resizeMode='stretch'
                                                                style={styles.image}
                                                                source={{ uri: image }}
                                                            />
                                                        </View>
                                                    </Pressable>

                                                    <TextInput
                                                        style={styles.input}
                                                        value={name}
                                                        placeholder='Name'
                                                        placeholderTextColor='#00000080'
                                                        onChangeText={(value) => setName(value)}
                                                    />
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='Phone Number'
                                                        autoCapitalize="none"
                                                        keyboardType="number-pad"
                                                        value={phonenumber}
                                                        placeholderTextColor='#00000080'
                                                        onChangeText={(value) => setPhoneNumber(value)}
                                                    />
                                                </View>

                                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>
                                                    <Pressable
                                                        onPress={() => { deleteContact(); setModalVisibleUpdate(!modalVisibleUpdate); }}
                                                        style={styles.deletebutton}>
                                                        <Text>Delete</Text>
                                                    </Pressable>
                                                    <Pressable
                                                        onPress={() => { updateContact(); setModalVisibleUpdate(!modalVisibleUpdate); }}
                                                        style={styles.addbutton1}>
                                                        <Text>Update</Text>
                                                    </Pressable>

                                                </View>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </ScrollView>
                            </Modal>
                        </View>
                    </View>
                </ScrollView>
                {userData.type == "guardian" ?
                    <View style={styles.addbutton}>
                        <Pressable
                            style={styles.addbutton}
                            onPress={() => setModalVisible(true)}>
                            <AntDesign name="pluscircleo" size={50} color="#4A0D66" />
                        </Pressable>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
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
                                            <Text> Add </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View> : null}
                <View>

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
        backgroundColor: "#359A8E10",
        borderRadius: 20,
        margin: "2%",
    },
    contactview: {
        flex: 1,
        padding: "1%",
    },
    scrollView: {
        marginHorizontal: 5,
    },
    item: {
        alignItems: "center",/* 
        paddingStart: 10,
        borderRadius: 10, */
        padding: "1%"

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
        padding: "3%",
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
    deletebutton: {
        alignItems: "center",
        padding: "3%",
        marginTop: "10%",
        borderRadius: 10,
        elevation: 3,
        borderColor: "#D86363",
        backgroundColor: "#D86363",
        shadowColor: "#D86363",
        shadowOpacity: 0.2,
        shadowRadius: 1.22,
        elevation: 11,
    },
    image: {
        height: 300,
        width: 300,
        borderRadius: 20
    },
    sectionTitle: {
        marginTop: "10%",
        textAlign:"center",
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
        backgroundColor: "#F5F5F3",
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