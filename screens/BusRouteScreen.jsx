import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BusRouteScreen = ({ route, navigation }) => {
    // Simulating stops for the bus route
    const { busId } = route.params; // Get bus ID from the previous screen
    const stops = [
        { name: 'Sathy', fare: 10 },
        { name: 'Pulliumpati', fare: 22 },
        { name: 'Athaani', fare: 34 },
        { name: 'Saravanampatti', fare: 42 },
        { name: 'Coimbatore', fare: 46 },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.busText}>Bus ID: {busId}</Text>
            <View style={styles.tripList}>
                {stops.map((stop, index) => (
                    <View key={index} style={styles.tripContainer}>
                        
                        <View style={styles.bulletPoint} /> 
                        {index !== stops.length - 1 && <View style={styles.verticalLine} />}

                        <View style={styles.tripCard}>
                            <View style={styles.tripInfo}>
                                <Text style={styles.placeName}>{stop.name}</Text>
                                <Text style={styles.fare}>₹{stop.fare}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.selectButton}
                                onPress={() => navigation.navigate('Payment', { stop })}
                            >
                                <Text style={styles.selectButtonText}>Select</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f7',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    busText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#007BFF',
    },
    tripList: {
        flexDirection: 'column',
        position: 'relative',
    },
    tripContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
        position: 'relative',
    },
    verticalLine: {
        position: 'absolute',
        width: 2,
        backgroundColor: '#007BFF',
        top: 20,
        bottom: 0,
        left: 15,
    },
    bulletPoint: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007BFF',
        marginRight: 10,
        marginTop: 5,
    },
    tripCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginLeft: 20,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tripInfo: {
        flexDirection: 'column',
    },
    placeName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    fare: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    selectButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    selectButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default BusRouteScreen;
