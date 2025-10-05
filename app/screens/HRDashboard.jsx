// src/screens/HRDashboard.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import Header from '../../components/common/Header';
import BottomNavigationBar from '../../components/common/BottomNavigationBar';
import UserRoleManagement from './UserRoleManagement';
import ConfigurationSettings from './ConfigurationSettings';
import Settings from './Settings';
import Notifications from './Notifications';

function HRDashboard({ onBack }) {
  const [currentRoute, setCurrentRoute] = useState('Dashboard');
  const [showClockPopup, setShowClockPopup] = useState(false);
  const [showUserMgmt, setShowUserMgmt] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [logout, setLogout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (logout && onBack) {
      onBack();
    }
  }, [logout, onBack]);

  // Connect UserRoleManagement page
  if (showUserMgmt) {
    return <UserRoleManagement onBack={() => setShowUserMgmt(false)} />;
  }

  // Connect ConfigurationSettings page
  if (showConfig) {
    return <ConfigurationSettings onBack={() => setShowConfig(false)} />;
  }

  // Connect Settings page
  if (showSettings) {
    return <Settings onBack={() => setShowSettings(false)} />;
  }

  // Connect Notifications page
  if (showNotifications) {
    return <Notifications onBack={() => setShowNotifications(false)} />;
  }

  const totalEmployees = 120;
  const openPositions = 5;
  const urgentAlerts = 2;

  const headerRightContent = (
    <TouchableOpacity onPress={() => setShowNotifications(true)} style={styles.notifIcon}>
      <Ionicons name="notifications-outline" size={22} color={Colors.primary} />
      <View style={styles.notifBadge}>
        <Text style={styles.notifBadgeText}>2</Text>
      </View>
    </TouchableOpacity>
  );

  const navItems = [
    { label: 'Dashboard', route: 'Dashboard', icon: 'grid-outline', activeIcon: 'grid', onPress: () => setCurrentRoute('Dashboard') },
    { label: 'Users', route: 'Users', icon: 'people-outline', activeIcon: 'people', onPress: () => setShowUserMgmt(true) },
    { label: 'Settings', route: 'Settings', icon: 'settings-outline', activeIcon: 'settings', onPress: () => setShowSettings(true) },
  ];

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => setLogout(true)} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Header
          title="HR Dashboard"
          rightContent={headerRightContent}
        />
      </View>

      {/* Quick Stats */}
      <View style={styles.quickStatsRow}>
        <View style={styles.quickStatBox}>
          <Text style={styles.quickStatLabel}>Total Employees</Text>
          <Text style={styles.quickStatValue}>{totalEmployees}</Text>
        </View>
        <View style={styles.quickStatBox}>
          <Text style={styles.quickStatLabel}>Open Positions</Text>
          <Text style={styles.quickStatValue}>{openPositions}</Text>
        </View>
        <View style={styles.quickStatBox}>
          <Text style={[styles.quickStatLabel, { color: Colors.accentRed }]}>System Alerts</Text>
          <Text style={styles.alertValue}>{urgentAlerts} Urgent</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.section}>
          <Text style={GlobalStyles.sectionTitle}>Management</Text>
          <TouchableOpacity style={styles.mgmtCard} onPress={() => setShowUserMgmt(true)}>
            <View style={styles.mgmtIconCircle}>
              <Ionicons name="people-outline" size={22} color={Colors.primary} />
            </View>
            <Text style={styles.mgmtText}>User & Role Management</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mgmtCard} onPress={() => setShowConfig(true)}>
            <View style={styles.mgmtIconCircle}>
              <Ionicons name="settings-outline" size={22} color={Colors.primary} />
            </View>
            <Text style={styles.mgmtText}>Configuration Settings</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mgmtCard}>
            <View style={styles.mgmtIconCircle}>
              <Ionicons name="help-circle-outline" size={22} color={Colors.primary} />
            </View>
            <Text style={styles.mgmtText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        {/* Clock In/Out Button (Inside ScrollView) */}
        <TouchableOpacity style={GlobalStyles.clockBtn} onPress={() => setShowClockPopup(true)}>
          <Ionicons name="timer-outline" size={22} color="#fff" style={{ marginRight: 6 }} />
          <Text style={GlobalStyles.clockBtnText}>CLOCK IN/OUT</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Popup Modal */}
      {showClockPopup && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={styles.popupTitle}>Clock In/Out</Text>
            <Text style={styles.popupMsg}>Your attendance has been recorded!</Text>
            <TouchableOpacity style={styles.popupBtn} onPress={() => setShowClockPopup(false)}>
              <Text style={styles.popupBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <BottomNavigationBar navItems={navItems} currentRoute={currentRoute} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  notifIcon: {
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.accentRed,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    color: Colors.cardBackground,
    fontSize: 11,
    fontWeight: 'bold',
  },
  quickStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
    marginTop: 8,
    marginBottom: 8,
  },
  quickStatBox: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  quickStatLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 4,
  },
  quickStatValue: {
    fontWeight: 'bold',
    fontSize: 22,
    color: Colors.primary,
  },
  alertValue: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.accentRed,
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
  },
  mgmtCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mgmtIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mgmtText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  popupOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  popupBox: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    width: 260,
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  popupMsg: {
    fontSize: 15,
    color: '#333',
    marginBottom: 18,
    textAlign: 'center',
  },
  popupBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  popupBtnText: {
    color: Colors.cardBackground,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 2,
  },
  logoutBtn: {
    marginRight: 8,
    padding: 5,
  },
});

export default HRDashboard;