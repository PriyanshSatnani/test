// screens/Login.jsx
import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import loginInfo from '../../data/logininfo.js';
import EmployeeDashboard from './EmployeeDashboard.jsx';
import ManagerDashboard from './ManagerDashboard.jsx';
import HRDashboard from './HRDashboard.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import CheckEmail from './CheckEmail.jsx';
import { Colors } from '../../constants/Colors.js';
import { Screen, Button, FormInput } from '../../components/ui';

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [role, setRole] = useState('Employee');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [showCheckEmail, setShowCheckEmail] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showManagerDashboard, setShowManagerDashboard] = useState(false);
  const [showHRDashboard, setShowHRDashboard] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const animateButton = (pressed = false) => {
    Animated.spring(buttonScale, {
      toValue: pressed ? 0.95 : 1,
      useNativeDriver: true,
      tension: 150,
      friction: 4,
    }).start();
  };

  const handleLogin = () => {
    if (!employeeId.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please enter your Employee ID and password');
      return;
    }

    const user = loginInfo.find(
      (admin) =>
        admin.adminid?.toLowerCase() === employeeId.trim().toLowerCase() &&
        admin.password === password &&
        admin.role === role
    );

    if (!user) {
      Alert.alert('Authentication Failed', 'Invalid credentials. Please check your Employee ID, password, and role.');
      return;
    }

    if (role === 'Employee') {
      setShowDashboard(true);
    } else if (role === 'Manager') {
      setShowManagerDashboard(true);
    } else if (role === 'HR Administrator') {
      setShowHRDashboard(true);
    }
  };

  const handleBackPress = () => {
    router.push('/');
  };

  if (showDashboard) {
    return <EmployeeDashboard onBack={() => setShowDashboard(false)} />;
  }
  if (showManagerDashboard) {
    return <ManagerDashboard onBack={() => setShowManagerDashboard(false)} />;
  }
  if (showHRDashboard) {
    return <HRDashboard onBack={() => setShowHRDashboard(false)} />;
  }
  if (showCheckEmail) {
    return <CheckEmail onBackToLogin={() => { setShowCheckEmail(false); setShowForgot(false); }} />;
  }
  if (showForgot) {
    return <ForgotPassword onBack={() => setShowForgot(false)} onEmailSent={() => setShowCheckEmail(true)} />;
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Animated.View style={[styles.backButtonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primaryDark} />
        </TouchableOpacity>
      </Animated.View>

      {/* Header Section */}
      <Animated.View style={[styles.headerSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.logoContainer} />
        <Text style={styles.heading}>ATTENDANCE</Text>
      </Animated.View>

      {/* Form Section - move to center */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Animated.View
          style={[styles.formSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          {/* Employee ID */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.inputActive]}
              placeholder="Employee ID"
              placeholderTextColor={Colors.textSecondary}
              value={employeeId}
              onChangeText={setEmployeeId}
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.inputActive]}
              placeholder="Password"
              placeholderTextColor={Colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Role Selection */}
          <View style={styles.roleContainer}>
            {['Employee', 'Manager', 'HR Administrator'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.roleButton, role === r ? styles.roleButtonActive : styles.roleButtonInactive]}
                onPress={() => setRole(r)}
              >
                <Text style={[styles.roleButtonText, role === r ? styles.roleButtonTextActive : styles.roleButtonTextInactive]}>
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.buttonWrapper}
            activeOpacity={0.8}
            onPressIn={() => animateButton(true)}
            onPressOut={() => animateButton(false)}
            onPress={handleLogin}
          >
            <Animated.View style={[styles.btn, { transform: [{ scale: buttonScale }] }]}>
              <Text style={styles.btnText}>SIGN IN</Text>
            </Animated.View>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotWrapper}
            onPress={() => setShowForgot(true)}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.primaryLight,
    justifyContent: 'space-between',
    padding: 20,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,128,128,0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  headerSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primaryDark,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  formSection: {
    flex: 0.5,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    shadowColor: 'rgba(0,128,128,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  inputActive: {
    borderColor: Colors.primary,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: 'rgba(0,128,128,0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
  },
  btnText: {
    color: Colors.cardBackground,
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  roleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  roleButtonActive: {
    backgroundColor: Colors.primary + '22',
    borderColor: Colors.primary,
  },
  roleButtonInactive: {
    backgroundColor: '#f3f4f6',
    borderColor: Colors.border,
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: Colors.primary,
  },
  roleButtonTextInactive: {
    color: Colors.textSecondary,
  },
  forgotWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },
  forgotText: {
    color: Colors.primary,
    fontWeight: '500',
    fontSize: 15,
  },
});

export default Login;