import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QRScanner = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        navigation.navigate('BusRoute', { busId: data });
    };

    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {/* Ensuring full screen by overlaying StatusBar */}
            <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.navigate('Main')}
            >
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    cancelButton: {
        backgroundColor: '#ff5c5c',
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
    },
    cancelText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default QRScanner;
