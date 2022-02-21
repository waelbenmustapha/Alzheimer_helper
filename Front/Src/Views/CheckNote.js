import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CheckNote = () => {

    return (


        <View style={styles.container}>
            <View style={styles.items}>
                <TouchableOpacity onPress={()=>{console.log("it's working out")}}>
                    <AntDesign style={styles.backarrow} name="left" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.items}>
                    <Text style={styles.sectionTitle}>Check Note</Text>
                    <View style={styles.item}>
                        <Text>Note name</Text>
                        <Text>  Time, Date</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.scrollView}>

                <View style={styles.item}>
                    <Text style={styles.square}>Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</Text>
                </View>

                <View style={styles.fixToText}>
                    <TouchableOpacity onPress={()=>{console.log("it's deleted")}} style={styles.deletebutton}>
                        <Text> Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{console.log("it's done")}} style={styles.donebutton}>
                        <Text> Done</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    )
}


const styles = StyleSheet.create({
    items: {
        padding: 5,
    },
    item: {
        backgroundColor: '#fff',
        margin: 20,
        padding: 5,
        borderRadius: 10,
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    sectionTitle: {
        marginTop: 5,
        marginLeft: 40,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#359A8E',
    },
    scrollView: {
        marginHorizontal: 5,
    },
    square: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        alignSelf: 'center',
        shadowColor: '#093F38',
        shadowOpacity: 0.55,
        shadowRadius: 2.22,
        elevation: 8,
    },

    backarrow: {
        paddingLeft: 50,
        paddingTop: 50,
        shadowColor: '#D86363',
        shadowOpacity: 0.55,
        shadowRadius: 2.22,
        elevation: 6,

    },
    deletebutton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        borderColor: '#D86363',
        backgroundColor: '#fff',
        shadowColor: '#D86363',
        shadowOpacity: 0.2,
        shadowRadius: 1.22,
        elevation: 11,
    },
    donebutton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        borderColor: '#093F38',
        backgroundColor: '#fff',
        shadowColor: '#093F38',
        shadowOpacity: 0.55,
        shadowRadius: 2.22,
        elevation: 11,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 100,
        paddingRight: 30,
        paddingBottom: 30,

    },
})
export default CheckNote;