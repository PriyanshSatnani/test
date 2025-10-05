// src/screens/LeaveApprovalQueue.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import Header from '../../components/common/Header';
import BottomNavigationBar from '../../components/common/BottomNavigationBar';
import Settings from './Settings';

function LeaveApprovalQueue({ onBack }) {
  const [filter, setFilter] = useState('All');
  const [currentRoute, setCurrentRoute] = useState('Approvals');
  const [showSettings, setShowSettings] = useState(false);

  const pendingRequests = [
    {
      id: 0,
      name: 'Ethan Carter',
      type: 'Leave Request',
      profilePic: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 1,
      name: 'Sophia Bennett',
      type: 'WFH Request',
      profilePic: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      name: 'Liam Harper',
      type: 'Leave Request',
      profilePic: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: 3,
      name: 'Olivia Hayes',
      type: 'WFH Request',
      profilePic: 'https://i.pravatar.cc/150?img=3',
    },
  ];

  const filteredRequests =
    filter === 'All'
      ? pendingRequests
      : pendingRequests.filter((r) =>
          filter === 'Leave'
            ? r.type === 'Leave Request'
            : r.type === 'WFH Request'
        );

  const RequestItem = ({ name, type, profilePic }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Image style={styles.avatar} source={{ uri: profilePic }} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>{type}</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.approveBtn}>
          <Text style={styles.approveText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectBtn}>
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (showSettings) {
    return <Settings onBack={() => setShowSettings(false)} />;
  }

  const navItems = [
    { label: 'Dashboard', route: 'Dashboard', icon: 'grid-outline', activeIcon: 'grid', onPress: onBack },
    { label: 'Team', route: 'Team', icon: 'people-outline', activeIcon: 'people', onPress: onBack },
    { label: 'Approvals', route: 'Approvals', icon: 'document-text-outline', activeIcon: 'document-text', onPress: () => setCurrentRoute('Approvals') },
    { label: 'Settings', route: 'Settings', icon: 'settings-outline', activeIcon: 'settings', onPress: () => setShowSettings(true) },
  ];

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Header
        title="Pending Requests"
        onBack={onBack}
      />
      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filter === 'All' && styles.filterBtnActive,
          ]}
          onPress={() => setFilter('All')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'All' && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filter === 'Leave' && styles.filterBtnActive,
          ]}
          onPress={() => setFilter('Leave')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'Leave' && styles.filterTextActive,
            ]}
          >
            Leave
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filter === 'WFH' && styles.filterBtnActive,
          ]}
          onPress={() => setFilter('WFH')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'WFH' && styles.filterTextActive,
            ]}
          >
            WFH
          </Text>
        </TouchableOpacity>
      </View>
      {/* Requests List */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View style={{ paddingHorizontal: 18 }}>
          {filteredRequests.map((request) => (
            <RequestItem key={request.id} {...request} />
          ))}
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>

      <BottomNavigationBar navItems={navItems} currentRoute={currentRoute} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 18,
    marginBottom: 10,
    gap: 8,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  filterTextActive: {
    color: Colors.cardBackground,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
    elevation: 0,
    width: '100%',
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  type: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  approveBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  approveText: {
    color: Colors.cardBackground,
    fontWeight: 'bold',
    fontSize: 15,
  },
  rejectBtn: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: Colors.cardBackground,
  },
  rejectText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default LeaveApprovalQueue;