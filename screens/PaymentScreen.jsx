import React from 'react';
import { View, Text, StyleSheet, Button, Alert, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // To use the navigation prop for the back button
import { RNUpiPayment } from 'react-native-upi-payment';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for the back arrow icon

const PaymentScreen = () => {
  const navigation = useNavigation(); // Get navigation object for back navigation

  const paymentGateway = () => {
    RNUpiPayment.initializePayment(
      {
        vpa: 'kanish.aims@okhdfcbank', // Replace with your UPI ID
        payeeName: 'KANISH YATHRA RAJ', // Replace with the recipient's name
        amount: '1', // Amount to be paid
        transactionRef: 'aasf-332-aoei-fn', // Unique transaction reference
      },
      successCallback,
      failureCallback
    );
  };

  const successCallback = (data) => {
    Alert.alert("Payment Successful", `Transaction Data: ${JSON.stringify(data)}`, [
      { text: "OK" }
    ]);
  };

  const failureCallback = (data) => {
    Alert.alert("Payment Failed", `Transaction Data: ${JSON.stringify(data)}`, [
      { text: "Try Again" }
    ]);
  };

  return (
    <View style={styles.mainContainer}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      {/* StatusBar */}
      <StatusBar backgroundColor="#007BFF" barStyle="light-content" />

      {/* Payment Content */}
      <View style={styles.container}>
        <Text style={styles.heading}>Choose the Mode of Payment</Text>
        <Button title="Pay Now" onPress={paymentGateway} color="#007BFF"  />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Ensures the view takes up the full screen
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
});
export default PaymentScreen;
