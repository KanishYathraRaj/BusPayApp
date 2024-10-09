import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

const MainScreen = ({ navigation }) => {
    const [busId, setBusId] = useState('');
    const [error, setError] = useState('');

    const handleEnterBusID = () => {
        if (busId.length !== 6) {
            setError('Bus code must be exactly 6 characters.');
            return;
        }
        setError('');
        navigation.navigate('BusRoute', { busId });
    };

    const handleScanQRCode = () => {
        navigation.navigate('QRScan');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to Bus Ticket App!</Text>

            <View style={styles.qrSection}>
                <TouchableOpacity style={styles.scanButton} onPress={handleScanQRCode}>
                    <Image 
                        source={require('../assets/qr-code.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.scanText}>Scan QR Code</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholder="Enter 6 Letter Bus Code"
                value={busId}
                onChangeText={setBusId}
                placeholderTextColor="#888"
                autoCapitalize="characters" // Ensure user input is in uppercase
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.enterButton} onPress={handleEnterBusID}>
                <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f8ff', // Light background color
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 30,
        textShadowColor: '#ddd', // Add text shadow for depth
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    qrSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    scanButton: {
        alignItems: 'center',
        backgroundColor: '#4682B4', // Steel blue color
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 40,
        elevation: 5, // Add shadow for Android
        shadowColor: '#000', // iOS shadow color
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    scanText: {
        color: '#fff',
        fontSize: 20,
        marginTop: 10,
    },
    icon: {
        width: 80,
        height: 80,
        marginBottom: 10, // Add space below the icon
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginBottom: 20,
        fontSize: 16,
        elevation: 3, // Add elevation for shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    inputError: {
        borderColor: '#ff6347', // Error color
    },
    enterButton: {
        backgroundColor: '#32CD32', // Lime green
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    errorText: {
        color: '#ff6347',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default MainScreen;
