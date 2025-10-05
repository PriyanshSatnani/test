import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';

// Assuming these are the components you want to navigate to
import AccountSettings from './AccountSettings';
import NotificationSettings from './NotificationSettings';
import ChangePassword from './ChangePassword';

// A reusable component for each settings row
const SettingsRow = ({ icon, name, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.settingRow}>
    <Ionicons name={icon} size={22} color={Colors.primary} style={styles.settingIcon} />
    <Text style={styles.settingText}>{name}</Text>
    <Ionicons name="chevron-forward-outline" size={22} color="#b0b0b0" />
  </TouchableOpacity>
);

// A reusable component for section titles
const SectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

function Settings({ onBack }) {
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // --- Navigation Logic ---
  if (showAccountSettings) {
    return <AccountSettings onBack={() => setShowAccountSettings(false)} />;
  }
  if (showNotificationSettings) {
    return <NotificationSettings onBack={() => setShowNotificationSettings(false)} />;
  }
  if (showChangePassword) {
    return <ChangePassword onBack={() => setShowChangePassword(false)} />;
  }
  // --- End Navigation Logic ---

  return (
    <View style={GlobalStyles.container}>
      {/* Header is now separate from the main scrollable card content */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        {/* Spacer */}
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <TouchableOpacity style={styles.profileSection}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=2' }} style={styles.avatar} />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>Manager</Text>
            <Text style={styles.profileEmail}>manager@company.com</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={22} color="#b0b0b0" />
        </TouchableOpacity>

        {/* General Settings */}
        <SectionTitle title="General" />
        <View style={styles.settingsGroup}>
          <SettingsRow
            icon="person-outline"
            name="Account Settings"
            onPress={() => setShowAccountSettings(true)}
          />
          <View style={styles.rowDivider} />
          <SettingsRow
            icon="notifications-outline"
            name="Notifications"
            onPress={() => setShowNotificationSettings(true)}
          />
        </View>

        {/* Management Settings */}
        <SectionTitle title="Management" />
        <View style={styles.settingsGroup}>
          <SettingsRow
            icon="people-outline"
            name="My Team"
            onPress={() => {}}
          />
        </View>
        
        {/* Security Settings */}
        <SectionTitle title="Security" />
        <View style={styles.settingsGroup}>
          <SettingsRow
            icon="lock-closed-outline"
            name="Change Password"
            onPress={() => setShowChangePassword(true)}
          />
        </View>

        {/* Other Settings */}
        <SectionTitle title="Others" />
        <View style={styles.settingsGroup}>
          <SettingsRow
            icon="document-text-outline"
            name="Leave Policy"
            onPress={() => {}}
          />
          <View style={styles.rowDivider} />
          <SettingsRow
            icon="help-circle-outline"
            name="Help Center"
            onPress={() => {}}
          />
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={[styles.settingsGroup, styles.logoutButton]}>
          <Ionicons name="log-out-outline" size={22} color="#e53935" style={styles.settingIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: '#fff', // Or your global container color
  },
  backBtn: {
    width: 32,
    height: 32,
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
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  profileTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
  },
  profileEmail: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 4,
  },
  settingsGroup: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginLeft: 54, // Aligns with text, skipping the icon
  },
  logoutButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    flex: 1,
    fontSize: 15,
    color: '#e53935',
    fontWeight: '600'
  }
});

export default Settings;