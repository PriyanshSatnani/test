// screens/ConfigurationSettings.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Screen, Button, FormInput, Form, Card } from '../../components/ui';
import Header from '../../components/common/Header';

function ConfigurationSettings({ onBack }) {
  const [gracePeriod, setGracePeriod] = useState('15');
  const [leaveTypes, setLeaveTypes] = useState([
    { label: 'Sick Leave', id: 1 },
    { label: 'Vacation Leave', id: 2 },
    { label: 'Personal Leave', id: 3 },
  ]);
  const [newLeaveType, setNewLeaveType] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (idx, currentValue) => {
    setEditIdx(idx);
    setEditValue(currentValue);
  };

  const handleSaveEdit = () => {
    if (editValue.trim()) {
      const updated = [...leaveTypes];
      updated[editIdx].label = editValue.trim();
      setLeaveTypes(updated);
    }
    setEditIdx(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditIdx(null);
    setEditValue('');
  };

  const handleAddLeaveType = () => {
    if (newLeaveType.trim()) {
      const newId = Math.max(...leaveTypes.map(t => t.id), 0) + 1;
      setLeaveTypes([...leaveTypes, { 
        label: newLeaveType.trim(), 
        id: newId 
      }]);
      setNewLeaveType('');
    }
  };

  const handleDeleteLeaveType = (idx) => {
    Alert.alert(
      'Delete Leave Type',
      `Are you sure you want to delete "${leaveTypes[idx].label}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            const updated = leaveTypes.filter((_, i) => i !== idx);
            setLeaveTypes(updated);
          }
        }
      ]
    );
  };

  const handleSave = () => {
    Alert.alert('Success', 'Configuration settings saved successfully');
    if (onBack) onBack();
  };

  return (
    <Screen scrollable backgroundColor={Colors.background}>
      <Header title="Configuration Settings" onBack={onBack} />
      
      <View style={styles.content}>
        {/* Attendance Rules Card */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Attendance Rules</Text>
          <View style={styles.ruleRow}>
            <View style={styles.ruleInfo}>
              <Text style={styles.ruleLabel}>Late Arrival Grace Period</Text>
              <Text style={styles.ruleDesc}>
                Set the grace period for late arrivals before deductions apply.
              </Text>
            </View>
            <View style={styles.ruleValueContainer}>
              <FormInput
                value={gracePeriod}
                onChangeText={setGracePeriod}
                placeholder="15"
                keyboardType="numeric"
                style={styles.gracePeriodInput}
              />
              <Text style={styles.unitText}>minutes</Text>
            </View>
          </View>
        </Card>

        {/* Leave Types Management Card */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Leave Types Management</Text>
          
          {/* Existing Leave Types */}
          <View style={styles.leaveTypesList}>
            {leaveTypes.map((type, idx) => (
              <View key={type.id} style={styles.leaveTypeRow}>
                {editIdx === idx ? (
                  <View style={styles.editRow}>
                    <FormInput
                      value={editValue}
                      onChangeText={setEditValue}
                      style={styles.editInput}
                    />
                    <View style={styles.editActions}>
                      <TouchableOpacity 
                        onPress={handleSaveEdit}
                        style={styles.saveButton}
                      >
                        <Ionicons name="checkmark" size={20} color={Colors.primary} />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={handleCancelEdit}
                        style={styles.cancelButton}
                      >
                        <Ionicons name="close" size={20} color={Colors.accentRed} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.leaveTypeContent}>
                    <Text style={styles.leaveTypeText}>{type.label}</Text>
                    <View style={styles.leaveTypeActions}>
                      <TouchableOpacity 
                        onPress={() => handleEdit(idx, type.label)}
                        style={styles.actionButton}
                      >
                        <Ionicons name="pencil-outline" size={18} color={Colors.textSecondary} />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => handleDeleteLeaveType(idx)}
                        style={styles.actionButton}
                      >
                        <Ionicons name="trash-outline" size={18} color={Colors.accentRed} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Add New Leave Type */}
          <View style={styles.addLeaveTypeRow}>
            <FormInput
              value={newLeaveType}
              onChangeText={setNewLeaveType}
              placeholder="Enter new leave type"
              style={styles.addInput}
            />
            <Button
              title="Add"
              onPress={handleAddLeaveType}
              size="small"
              disabled={!newLeaveType.trim()}
            />
          </View>
        </Card>

        {/* Save Button */}
        <View style={styles.footer}>
          <Button 
            title="Save Configuration" 
            onPress={handleSave}
            size="large"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  sectionCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  ruleInfo: {
    flex: 1,
    marginRight: 16,
  },
  ruleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  ruleDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  ruleValueContainer: {
    alignItems: 'center',
  },
  gracePeriodInput: {
    marginBottom: 8,
    width: 80,
  },
  unitText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  leaveTypesList: {
    marginBottom: 16,
  },
  leaveTypeRow: {
    marginBottom: 8,
  },
  leaveTypeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  leaveTypeText: {
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
  },
  leaveTypeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editInput: {
    flex: 1,
    marginBottom: 0,
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    padding: 8,
    backgroundColor: Colors.primaryLight,
    borderRadius: 6,
  },
  cancelButton: {
    padding: 8,
    backgroundColor: '#fee',
    borderRadius: 6,
  },
  addLeaveTypeRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  addInput: {
    flex: 1,
    marginBottom: 0,
  },
  footer: {
    marginTop: 24,
  },
});

export default ConfigurationSettings;