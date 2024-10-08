import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';


const MainScreen = ({ navigation }) => {
    const [busId, setBusId] = useState('');
   
    const handleEnterBusID = () => {
        navigation.navigate('BusRoute', { busId });
    };

    const handleScanQRCode = () => {
        navigation.navigate('QRScan');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to Bus Ticket App!</Text>
            <View style={styles.buttonContainer}>
                <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.scanButton} onPress={handleScanQRCode}>
                        <Image 
                            source={require('../assets/qr-code.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter The Unique 6 Letter Bus Code here.."
                        value={busId}
                        onChangeText={setBusId}
                        placeholderTextColor="#888"
                    />

                    <TouchableOpacity style={styles.enterButton} onPress={handleEnterBusID}>
                        <Text style={styles.buttonText}>Enter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: 'lightblue',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 200,
        marginBottom: 20,
        color: '#333',
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
    },
    scanButton: {
        marginLeft: 20,
        marginRight: 20,
    },
    enterButton: {
        backgroundColor: '#28a745',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        width: '60%',
        backgroundColor: '#fff',
        elevation: 2,
        marginRight: 10,
    },
    icon: {
        width: 50,
        height: 50,
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    cancelButton: {
        backgroundColor: '#ff5c5c',
        borderRadius: 8,
        padding: 10,
        alignSelf: 'center',
        marginBottom: 20,
    },
});

export default MainScreen;
