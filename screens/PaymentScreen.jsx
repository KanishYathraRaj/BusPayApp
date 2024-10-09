import React from 'react';
import { Button, Alert, Linking } from 'react-native';

const PaymentScreen = () => {
  const upiId = 'durgadevi.aims@oksbi';
  const amount = '1.00';  
  const transactionNote = 'Bus ticket payment';
  const payerName = 'Dhurga Devi'; 

  const initiateUpiPayment = async () => {
    const upiUri = `upi://pay?pa=${upiId}&pn=${payerName}&tn=${transactionNote}&am=${amount}&cu=INR`;

    try {
      const supported = await Linking.canOpenURL(upiUri);
      if (supported) {
        // Opens the UPI app
        await Linking.openURL(upiUri);
      } else {
        Alert.alert('Error', 'UPI apps not found on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to initiate payment.');
    }
  };

  return (
    <Button title="Pay with UPI" onPress={initiateUpiPayment} />
  );
};

export default PaymentScreen;
