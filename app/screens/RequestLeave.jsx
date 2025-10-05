// screens/RequestLeave.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../constants/Colors';
import { Screen, Button, FormInput, Form, Card, Picker as CustomPicker } from '../../components/ui';
import Header from '../../components/common/Header';

function RequestLeave({ onBack }) {
  const [leaveType, setLeaveType] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reason, setReason] = useState('');
  const [showLeaveTypePicker, setShowLeaveTypePicker] = useState(false);

  const leaveTypes = [
    { label: 'Select Leave Type', value: '', color: Colors.textSecondary },
    { label: 'Sick Leave', value: 'sick' },
    { label: 'Vacation Leave', value: 'vacation' },
    { label: 'Personal Leave', value: 'personal' },
    { label: 'Casual Leave', value: 'casual' },
    { label: 'Maternity Leave', value: 'maternity' },
    { label: 'Paternity Leave', value: 'paternity' },
    { label: 'Bereavement Leave', value: 'bereavement' },
    { label: 'Unpaid Leave', value: 'unpaid' },
    { label: 'Other', value: 'other' },
  ];

  const handleSubmit = () => {
    if (!leaveType || !startDate || !endDate || !reason.trim()) {
      Alert.alert('Validation Error', 'Please fill all fields.');
      return;
    }
    Alert.alert('Request Submitted', 'Your leave request has been submitted.');
    if (onBack) onBack();
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString() : 'Select Date';
  };

  return (
    <Screen backgroundColor={Colors.background}>
      <Header title="Request Leave" onBack={onBack} />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconCircle}>
            <Ionicons name="airplane-outline" size={38} color={Colors.primary} />
          </View>

          <Card>
            <Form>
              {/* Leave Type Picker */}
              <CustomPicker
                label="Leave Type"
                value={leaveTypes.find(t => t.value === leaveType)?.label || ''}
                placeholder="Select Leave Type"
                onPress={() => setShowLeaveTypePicker(true)}
              />

              {/* Start Date */}
              <CustomPicker
                label="Start Date"
                value={formatDate(startDate)}
                placeholder="Select Start Date"
                onPress={() => setShowStartPicker(true)}
              />

              {/* End Date */}
              <CustomPicker
                label="End Date"
                value={formatDate(endDate)}
                placeholder="Select End Date"
                onPress={() => setShowEndPicker(true)}
              />

              {/* Reason */}
              <FormInput
                label="Reason for Leave"
                value={reason}
                onChangeText={setReason}
                placeholder="Enter your reason for leave..."
                multiline
                numberOfLines={4}
              />
            </Form>
          </Card>
        </View>
      </ScrollView>
      
      {/* Submit Button */}
      <View style={styles.footer}>
        <Button 
          title="Submit Request" 
          onPress={handleSubmit}
          size="large"
        />
      </View>

      {/* Leave Type Modal */}
      <Modal
        visible={showLeaveTypePicker}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Leave Type</Text>
              <TouchableOpacity 
                onPress={() => setShowLeaveTypePicker(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={leaveType}
              onValueChange={(val) => {
                setLeaveType(val);
                setShowLeaveTypePicker(false);
              }}
              style={styles.picker}
            >
              {leaveTypes.map((type) => (
                <Picker.Item 
                  key={type.value} 
                  label={type.label} 
                  value={type.value} 
                  color={type.color || Colors.textPrimary} 
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>

      {/* Date Pickers */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  iconCircle: {
    alignSelf: 'center',
    marginVertical: 24,
    backgroundColor: Colors.primaryLight,
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16,
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  picker: {
    marginHorizontal: 20,
  },
});

export default RequestLeave;