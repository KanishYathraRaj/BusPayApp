import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { firebase_auth } from '../firebaseConfig'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAvoidingView } from 'react-native';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); 

  // Sign In function
  const signIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(firebase_auth, email, password);
      // Handle successful login
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('Email not found. Please sign up.');
      } else if (error.code === 'auth/invalid-credential') {
        setError('Incorrect password.');
      } else {
        console.log("Error during log in : " ,error.code);
        setError('Error signing in. Try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Sign Up function
  const signUp = async () => {
    setLoading(true);
    setError('');
    try {
      await createUserWithEmailAndPassword(firebase_auth, email, password);
      // Handle successful sign-up
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already exists.');
      } else {
        console.log("Error using Signup : ",error.code);
        setError('Error signing up. Try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp); // Toggle between Sign Up and Sign In  
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.header}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
        <Text style={styles.subheader}>
          {isSignUp ? 'Sign up to get started' : 'Login to continue'}
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#888"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="#888"
          onChangeText={(text) => setPassword(text)}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={isSignUp ? signUp : signIn}>
              <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleAuthMode}>
              <Text style={styles.switchText}>
                {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'lightblue',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subheader: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  switchText: {
    color: '#007bff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AuthScreen;
