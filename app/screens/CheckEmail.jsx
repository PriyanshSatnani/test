// src/screens/CheckEmail.jsx
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

function CheckEmail({ onBackToLogin }) {
  const handleBackToLogin = () => {
    if (onBackToLogin) onBackToLogin();
  };

  const handleResendEmail = () => {
    Alert.alert('Resend Email', 'Password reset email has been resent.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToLogin}>
          <Ionicons name="arrow-back" size={24} color={Colors.textLink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ATTENDANCE</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="mark-email-read" size={50} color={Colors.textLink} />
        </View>
        <Text style={styles.heading}>Check Your Email</Text>
        <Text style={styles.description}>
          A password reset link has been sent to your email address. Please check your inbox and spam folder.
        </Text>
        <TouchableOpacity onPress={handleResendEmail}>
          <Text style={styles.resendLink}>Resend Email</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleBackToLogin}>
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: Colors.textPrimary,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.textLink + '1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.textPrimary,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.textSecondary,
    maxWidth: 300,
    marginBottom: 16,
  },
  resendLink: {
    color: Colors.textLink,
    fontWeight: '600',
    marginBottom: 32,
  },
  footer: {
    padding: 16,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.textLink,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.cardBackground,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckEmail;