import { View, StatusBar, StyleSheet, ImageBackground, SafeAreaView, TextInput, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'


import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
    MaskSymbol,
    isLastFilledCell,
} from 'react-native-confirmation-code-field';


const PinCode = ({ navigation }) => {
    const CELL_COUNT = 4;


    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const renderCell = ({ index, symbol, isFocused }) => {
        let textChild = null;

        if (symbol) {
            textChild = (
                <MaskSymbol
                    maskSymbol="*"
                    isLastFilledCell={isLastFilledCell({ index, value })}>
                    {symbol}
                </MaskSymbol>
            );
        } else if (isFocused) {
            textChild = <Cursor />;
        }


        return (
            <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {textChild}
            </Text>
        );
    };

    /* return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.title}>Field with custom mask</Text>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
            />
            
        </SafeAreaView>

    ); */

    return (
        <ImageBackground source={require("./../../../assets/old.png")} resizeMode="cover" style={styles.image}>

            <SafeAreaView style={styles.root}>
                <Text style={styles.title}>Alzheimer Helper</Text>
                <View style={styles.container}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        caretHidden={false}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={renderCell}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            console.log("it's done"), navigation.navigate("Home");
                        }}
                        style={styles.donebutton}
                    >
                        <Text> Verify</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ImageBackground>

    );
};



const styles = StyleSheet.create({
    root: {
        flex: 2,
        marginTop: StatusBar.currentHeight

    },
    container: {
        flex: 1,
        margin: 40,
        justifyContent: 'flex-end',

    },
    title: {
        color: "#359A8E",
        fontSize: 28,
        paddingLeft: '2%',
        paddingTop: '2%',

    },
    image: {
        flex: 1,
        height: '90%',
        width: '100%',
    },

    codeFieldRoot: {
        marginTop: 5
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#4A0D66',
        textAlign: 'center',
        borderRadius: 10,

    },
    focusCell: {
        borderColor: '#000',
    },
    donebutton: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 25,
        paddingVertical: 12,
        borderRadius: 10,
        elevation: 3,
        borderColor: '#093F38',
        backgroundColor: '#fff',
        shadowColor: '#093F38',
        shadowOpacity: 0.55,
        shadowRadius: 2.22,
        elevation: 11,
    },
});

export default PinCode;
