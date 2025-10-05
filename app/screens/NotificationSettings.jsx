import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';

function NotificationSettings({ onBack }) {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [reminderNotif, setReminderNotif] = useState(false);

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notification Settings</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.divider} />

        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.sectionTitle}>Manage your notification preferences</Text>
          <View style={styles.settingRow}>
            <Ionicons name="mail-outline" size={22} color={Colors.primary} style={styles.settingIcon} />
            <Text style={styles.settingText}>Email Notifications</Text>
            <Switch
              value={emailNotif}
              onValueChange={setEmailNotif}
              thumbColor={emailNotif ? Colors.primary : '#ccc'}
              trackColor={{ false: '#eee', true: Colors.primaryLight }}
              style={{ marginLeft: 'auto' }}
            />
          </View>
          <View style={styles.settingRow}>
            <Ionicons name="notifications-outline" size={22} color={Colors.primary} style={styles.settingIcon} />
            <Text style={styles.settingText}>Push Notifications</Text>
            <Switch
              value={pushNotif}
              onValueChange={setPushNotif}
              thumbColor={pushNotif ? Colors.primary : '#ccc'}
              trackColor={{ false: '#eee', true: Colors.primaryLight }}
              style={{ marginLeft: 'auto' }}
            />
          </View>
          <View style={styles.settingRow}>
            <Ionicons name="alarm-outline" size={22} color={Colors.primary} style={styles.settingIcon} />
            <Text style={styles.settingText}>Reminders</Text>
            <Switch
              value={reminderNotif}
              onValueChange={setReminderNotif}
              thumbColor={reminderNotif ? Colors.primary : '#ccc'}
              trackColor={{ false: '#eee', true: Colors.primaryLight }}
              style={{ marginLeft: 'auto' }}
            />
          </View>
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
    marginBottom: 18,
    marginTop: 8,
    paddingLeft: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontWeight: '500',
    fontSize: 15,
    color: Colors.textPrimary,
  },
});

export default NotificationSettings;
