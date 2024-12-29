import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUpScreen = () => {
  const [passwordStrength, setPasswordStrength] = useState('');

  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) {
      setPasswordStrength('Weak');
    } else if (password.length < 10) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Strong');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={(values) => alert('Sign Up Successful')}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={(text) => {
              handleChange('password')(text);
              checkPasswordStrength(text);
            }}
            value={values.password}
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
          
          {}
          {touched.password && (
            <Text>Password Strength: {passwordStrength}</Text>
          )}

          <Button title="Sign Up" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
  error: { color: 'red' },
});

export default SignUpScreen;
