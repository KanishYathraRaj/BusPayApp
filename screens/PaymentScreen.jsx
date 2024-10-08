import React from 'react'
import { View , Text} from 'react-native' ;
import { Button } from 'react-native';

import { RNUpiPayment }  from 'react-native-upi-payment';

const PaymentScreen = () => {

  const paymentGateway = () => {


    RNUpiPayment.initializePayment(
      {
        vpa: 'kanish.aims@okhdfcbank', // or can be john@ybl or mobileNo@upi
        payeeName: 'KANISH YATHRA RAJ',
        amount: '1',
        transactionRef: 'aasf-332-aoei-fn',
      },
      successCallback,
      failureCallback
    );

  }

  function successCallback(data) {
    // do whatever with the data
    alert(data)
  }
  
  function failureCallback(data) {
    // do whatever with the data
    alert(data)
  }

  return (
    <View>
      <Text > Choose the mode of payment </Text>
      <Button title='pay' onPress={paymentGateway}></Button>
    </View>
  )
}

export default PaymentScreen