// screens/ChangePassword.jsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Screen, Button, FormInput, Form, Card } from '../../components/ui';
import Header from '../../components/common/Header';

function ChangePassword({ onBack }) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleChangePassword = () => {
    if (!current.trim() || !newPass.trim() || !confirm.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (newPass !== confirm) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    Alert.alert('Success', 'Password changed successfully');
    if (onBack) onBack();
  };

  return (
    <Screen scrollable backgroundColor={Colors.background}>
      <Header title="Change Password" onBack={onBack} />
      
      <View style={styles.content}>
        <Card>
          <Form>
            <FormInput
              label="Current Password"
              value={current}
              onChangeText={setCurrent}
              placeholder="Enter current password"
              secureTextEntry
            />
            <FormInput
              label="New Password"
              value={newPass}
              onChangeText={setNewPass}
              placeholder="Enter new password"
              secureTextEntry
            />
            <FormInput
              label="Confirm New Password"
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Confirm new password"
              secureTextEntry
            />
            
            <View style={styles.buttonContainer}>
              <Button 
                title="Save Password" 
                onPress={handleChangePassword}
                size="large"
              />
            </View>
          </Form>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
});

export default ChangePassword;