// screens/ForgotPassword.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Screen, Button, FormInput, Form } from '../../components/ui';

function ForgotPassword({ onBack, onEmailSent }) {
  const [email, setEmail] = useState('');

  const handleBackPress = () => {
    if (onBack) onBack();
  };

  const handleSendResetLink = () => {
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email address.');
      return;
    }
    if (onEmailSent) onEmailSent();
  };

  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Forgot Password?</Text>
          <Text style={styles.subHeading}>
            No worries, we'll send you reset instructions.
          </Text>
        </View>

        <Form>
          <FormInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Form>
      </View>

      {/* Footer Button */}
      <View style={styles.footer}>
        <Button
          title="Send Reset Link"
          onPress={handleSendResetLink}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary + '1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});

export default ForgotPassword;