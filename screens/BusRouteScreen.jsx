import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window'); // Get the screen dimensions

const BusRouteScreen = ({ route, navigation }) => {
    const { busId } = route.params;
    const stops = [
        { name: 'Sathy', fare: 10 },
        { name: 'Pulliumpati', fare: 22 },
        { name: 'Athaani', fare: 34 },
        { name: 'Saravanampatti', fare: 42 },
        { name: 'Coimbatore', fare: 46 },
    ];

    return (
        <View style={styles.container}>
            {/* Full screen including notification bar */}
            <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
            <Text style={styles.busText}>Bus ID: {busId}</Text>
            <ScrollView contentContainerStyle={styles.tripList}>
                {stops.map((stop, index) => (
                    <View key={index} style={styles.tripContainer}>
                        <Ionicons name="bus-outline" size={24} color="#007BFF" />
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
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f7',
        paddingTop: StatusBar.currentHeight || height * 0.05, // Dynamic padding to cover notification bar
        paddingHorizontal: width * 0.05,
    },
    busText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#007BFF',
        textAlign: 'center',
    },
    tripList: {
        flexGrow: 1, // Ensures the ScrollView occupies the full space
    },
    tripContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 30,
        position: 'relative',
    },
    verticalLine: {
        position: 'absolute',
        width: 2,
        backgroundColor: '#007BFF',
        top: 30,
        bottom: 0,
        left: 15,
    },
    tripCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginLeft: 20,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 7,
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
        borderRadius: 12,
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    selectButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default BusRouteScreen;
