import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    if (rememberMe) {
      await AsyncStorage.setItem('rememberedEmail', values.email);
    } else {
      await AsyncStorage.removeItem('rememberedEmail');
    }
    alert('Login Successful');
    navigation.navigate('SignUp'); 
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            value={values.email}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={handleChange('password')}
            value={values.password}
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={rememberMe}
              onValueChange={setRememberMe}
            />
            <Text>Remember Me</Text>
          </View>

          <Button title="Login" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
  error: { color: 'red' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
});

export default LoginScreen;
