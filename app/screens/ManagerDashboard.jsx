import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LeaveApprovalQueue from './LeaveApprovalQueue'; // Assuming this component exists
import BottomNavigationBar from '../../components/common/BottomNavigationBar'; // Assuming this component exists

const ManagerDashboard = ({ onBack }) => {
  const [currentRoute, setCurrentRoute] = useState('Dashboard');
  const [showApprovals, setShowApprovals] = useState(false);

  // Data matching the screenshot's layout
  const teamStatus = [
    {
      name: 'Ethan Carter',
      role: 'In Office',
      avatar: { uri: 'https://i.pravatar.cc/150?img=68' },
      status: 'Clocked In: 9:02 AM',
      statusColor: '#009966',
    },
    {
      name: 'Sophia Bennett',
      role: 'Remote',
      avatar: { uri: 'https://i.pravatar.cc/150?img=47' },
      status: 'Clocked In: 8:58 AM',
      statusColor: '#009966',
    },
    {
      name: 'Liam Harper',
      role: 'On Leave',
      avatar: { uri: 'https://i.pravatar.cc/150?img=32' },
      status: 'Sick Leave',
      statusColor: '#ff9800',
    },
  ];
  const teamMembersIn = 12;
  const pendingApprovals = 3;

  // Navigation items for the bottom bar
  const navItems = [
    { label: 'Dashboard', route: 'Dashboard', icon: 'grid-outline', activeIcon: 'grid' },
    { label: 'Team Reports', route: 'TeamReports', icon: 'bar-chart-outline', activeIcon: 'bar-chart' },
    { label: 'Approvals', route: 'Approvals', icon: 'checkmark-done-outline', activeIcon: 'checkmark-done' },
    { label: 'Settings', route: 'Settings', icon: 'settings-outline', activeIcon: 'settings' },
  ];
  
  const handleNavigation = (route) => {
    if (route === 'Approvals') {
        setShowApprovals(true);
    } else {
        setCurrentRoute(route);
    }
  };

  if (showApprovals) {
    return <LeaveApprovalQueue onBack={() => setShowApprovals(false)} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Header */}
          <View style={styles.headerRow}>
            {/* LOGOUT BUTTON ADDED HERE */}
            <TouchableOpacity style={styles.headerIconBtn} onPress={onBack}>
               <Ionicons name="log-out-outline" size={28} color="#555" />
            </TouchableOpacity>
            
            <View style={styles.headerTextCol}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.managerText}>Manager</Text>
            </View>

            {/* Profile Avatar moved to the right for better balance */}
            <TouchableOpacity style={styles.avatarCircle}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?img=56' }} style={styles.avatar} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons name="notifications-outline" size={26} color="#555" />
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Quick Stats */}
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.quickStatsRow}>
            <View style={styles.quickStatBox}>
              <Text style={styles.quickStatLabel}>Team Members Currently IN</Text>
              <Text style={styles.quickStatValue}>{teamMembersIn}</Text>
            </View>
            <View style={styles.quickStatBox}>
              <Text style={styles.quickStatLabel}>Total Pending Approvals</Text>
              <Text style={styles.quickStatValue}>{pendingApprovals}</Text>
            </View>
          </View>

          {/* Team Status */}
          <Text style={styles.sectionTitle}>All Team Status Today</Text>
          <View style={styles.teamStatusList}>
            {teamStatus.map((member) => (
              <View key={member.name} style={styles.teamStatusRow}>
                <Image source={member.avatar} style={styles.teamAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.teamName}>{member.name}</Text>
                  <Text style={styles.teamRole}>{member.role}</Text>
                </View>
                <Text style={[styles.teamStatusText, { color: member.statusColor }]}>{member.status}</Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <TouchableOpacity style={styles.actionBtn} onPress={() => setShowApprovals(true)}>
            <Text style={styles.actionBtnText}>Leave Approval Queue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Team Reports</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity style={styles.clockBtn}>
            <Ionicons name="time-outline" size={24} color="#fff" />
            <Text style={styles.clockBtnText}>CLOCK IN/OUT</Text>
        </TouchableOpacity>

        <BottomNavigationBar 
            navItems={navItems} 
            currentRoute={currentRoute}
            onPress={handleNavigation}
        />
      </View>
    </SafeAreaView>
  );
};

// Styles updated with refinements
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 160,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerIconBtn: {
    padding: 5,
    position: 'relative',
  },
  headerTextCol: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12, // Added margin for spacing from logout icon
  },
  welcomeText: {
    color: '#666',
    fontSize: 14,
  },
  managerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#111',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  notifBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#e53935',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  notifBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginLeft: 16,
    marginTop: 20, // Increased top margin
    marginBottom: 12,
  },
  quickStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  quickStatBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12, // Slightly larger radius
    paddingVertical: 20, // Increased vertical padding
    paddingHorizontal: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eaf0f4', // Lighter border color
  },
  quickStatLabel: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10, // Increased margin
    height: 35,
  },
  quickStatValue: {
    fontWeight: 'bold',
    fontSize: 42, // Increased font size for impact
    color: '#111',
  },
  teamStatusList: {
    paddingHorizontal: 16,
  },
  teamStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eaf0f4',
  },
  teamAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  teamName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111',
  },
  teamRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  teamStatusText: {
    fontWeight: '500',
    fontSize: 14,
  },
  actionBtn: {
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#009688',
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  actionBtnText: {
    color: '#009688',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clockBtn: {
    backgroundColor: '#009688',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    marginHorizontal: 16,
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  clockBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ManagerDashboard;