import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';

function AccountSettings({ onBack }) {
  const [gracePeriod, setGracePeriod] = useState(15);
  const [leaveTypes, setLeaveTypes] = useState([
    { label: 'Sick Leave', editable: false },
    { label: 'Vacation Leave', editable: false },
    { label: 'Personal Leave', editable: false },
  ]);
  const [newLeaveType, setNewLeaveType] = useState('');
  const [editIdx, setEditIdx] = useState(null);

  const handleEdit = (idx) => setEditIdx(idx);
  const handleSaveEdit = (idx, value) => {
    const updated = [...leaveTypes];
    updated[idx].label = value;
    setLeaveTypes(updated);
    setEditIdx(null);
  };
  const handleAddLeaveType = () => {
    if (newLeaveType.trim()) {
      setLeaveTypes([...leaveTypes, { label: newLeaveType, editable: false }]);
      setNewLeaveType('');
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configuration Settings</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.divider} />

        <ScrollView contentContainerStyle={styles.form}>
          {/* Attendance Rules */}
          <Text style={styles.sectionTitle}>Attendance Rules</Text>
          <View style={styles.ruleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ruleLabel}>Late Arrival Grace Period</Text>
              <Text style={styles.ruleDesc}>
                Set the grace period for late arrivals before deductions apply.
              </Text>
            </View>
            <Text style={styles.ruleValue}>{gracePeriod} minutes</Text>
          </View>

          {/* Leave Types Management */}
          <Text style={styles.sectionTitle}>Leave Types Management</Text>
          <View style={styles.leaveTypesList}>
            {leaveTypes.map((type, idx) => (
              <View key={idx} style={styles.leaveTypeRow}>
                {editIdx === idx ? (
                  <TextInput
                    style={styles.leaveTypeInput}
                    value={type.label}
                    onChangeText={val => handleSaveEdit(idx, val)}
                    onBlur={() => setEditIdx(null)}
                    autoFocus
                  />
                ) : (
                  <>
                    <Text style={styles.leaveTypeText}>{type.label}</Text>
                    <TouchableOpacity onPress={() => handleEdit(idx)}>
                      <Ionicons name="pencil-outline" size={18} color={Colors.textSecondary} />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ))}
            <View style={styles.leaveTypeRow}>
              <TextInput
                style={styles.leaveTypeInput}
                value={newLeaveType}
                onChangeText={setNewLeaveType}
                placeholder="Add New Leave Type"
                placeholderTextColor={Colors.textSecondary}
              />
              <TouchableOpacity onPress={handleAddLeaveType}>
                <Ionicons name="add-circle-outline" size={22} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 18,
    marginBottom: 8,
  },
  form: {
    paddingHorizontal: 0,
    paddingTop: 0,
    width: '100%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 10,
    marginTop: 18,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 8,
  },
  ruleLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
    marginBottom: 2,
  },
  ruleDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  ruleValue: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  leaveTypesList: {
    marginBottom: 18,
  },
  leaveTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  leaveTypeText: {
    fontSize: 15,
    color: '#222',
    flex: 1,
  },
  leaveTypeInput: {
    fontSize: 15,
    color: '#222',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 4,
    width: '100%',
    alignSelf: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default AccountSettings;
