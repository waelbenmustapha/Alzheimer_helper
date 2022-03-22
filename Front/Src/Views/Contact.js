import { View, Modal, Text, Image, TouchableOpacity, ScrollView, Button, StyleSheet, SafeAreaView, StatusBar, Pressable } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

const AddContact = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);



    return (

        <View style={styles.container}>

            <Text style={styles.sectionTitle}>Add Contact</Text>




            <View style={[styles.container, { flexDirection: "column" }]}>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.contactview} >
                        <View style={{ alignItems: 'center' }} >
                            <TouchableOpacity >
                                <Image

                                />
                            </TouchableOpacity>
                            <View style={styles.item}>
                                <Text style={{ fontSize: 32 }}>Name</Text>
                                <Text style={{ fontSize: 18 }}>Phone Number</Text>
                            </View>
                        </View>




                    </View>
                </ScrollView>


                <View style={styles.addbutton}>
                    <TouchableOpacity onPress={() => navigation.navigate("AddContact")}>

                    </TouchableOpacity>
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
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >


                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Hello World!</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                </View>



            </View>



        </View>


    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        padding: '4%',
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
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
});
export default AddContact;