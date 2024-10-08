import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QRScanner = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanning, setScanning] = useState(true);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanning(false); // Stop scanning once a QR code is detected
        navigation.navigate('BusRoute', { busId: data });
    };

    const resetScanner = () => {
        setScanning(true); // Reset scanning state when navigating back
    };

    // Listen for focus events to reset scanner
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', resetScanner);
        return unsubscribe;
    }, [navigation]);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {scanning && (
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )}
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.navigate('Main')}
            >
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            {!scanning && (
                <Text style={styles.scannedText}>Scanned! Press back to scan again.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cancelButton: {
        marginTop: 60,
        backgroundColor: '#ff5c5c',
        padding: 10,
        borderRadius: 10,
    },
    cancelText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    scannedText: {
        marginTop: 20,
        fontSize: 16,
    },
});

export default QRScanner;
