// src/screens/TeamReports.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import Header from '../../components/common/Header';
import BottomNavigationBar from '../../components/common/BottomNavigationBar';

function TeamReports({ onBack }) {
  const [viewBy, setViewBy] = useState('Date Range');
  const [currentRoute, setCurrentRoute] = useState('Reports');

  const teamData = [
    {
      name: 'Ethan Carter',
      status: 'Present',
      checkIn: '9:00 AM',
      checkOut: '5:00 PM',
      totalHours: '8 hrs',
      breakTime: '1 hr',
      lateIn: '0 hrs',
    },
    {
      name: 'Olivia Bennett',
      status: 'Present',
      checkIn: '9:05 AM',
      checkOut: '5:05 PM',
      totalHours: '8 hrs',
      breakTime: '1 hr',
      lateIn: '5 mins',
    },
    {
      name: 'Noah Thompson',
      status: 'Present',
      checkIn: '9:00 AM',
      checkOut: '5:00 PM',
      totalHours: '8 hrs',
      breakTime: '1 hr',
      lateIn: '0 hrs',
    },
    {
      name: 'Ava Martinez',
      status: 'Present',
      checkIn: '9:00 AM',
      checkOut: '5:00 PM',
      totalHours: '8 hrs',
      breakTime: '1 hr',
      lateIn: '0 hrs',
    },
  ];

  const navItems = [
    { label: 'Dashboard', route: 'Dashboard', icon: 'grid-outline', activeIcon: 'grid', onPress: onBack },
    { label: 'Team', route: 'Team', icon: 'people-outline', activeIcon: 'people', onPress: onBack },
    { label: 'Approvals', route: 'Approvals', icon: 'document-text-outline', activeIcon: 'document-text', onPress: onBack },
    { label: 'Reports', route: 'Reports', icon: 'bar-chart-outline', activeIcon: 'bar-chart', onPress: () => setCurrentRoute('Reports') },
  ];

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Header
        title="Team Reports"
        onBack={onBack}
      />
      {/* Filter Row */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            viewBy === 'Date Range' && styles.filterBtnActive,
          ]}
          onPress={() => setViewBy('Date Range')}
        >
          <Text
            style={[
              styles.filterText,
              viewBy === 'Date Range' && styles.filterTextActive,
            ]}
          >
            Date Range
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            viewBy === 'Team Member' && styles.filterBtnActive,
          ]}
          onPress={() => setViewBy('Team Member')}
        >
          <Text
            style={[
              styles.filterText,
              viewBy === 'Team Member' && styles.filterTextActive,
            ]}
          >
            View By Team Member
          </Text>
        </TouchableOpacity>
      </View>
      {/* Team Cards */}
      <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ paddingBottom: 16 }}>
        {teamData.map((member, idx) => (
          <View key={member.name} style={styles.card}>
            <Text style={styles.cardName}>{member.name}</Text>
            <View style={styles.cardRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Status</Text>
                <Text style={styles.value}>{member.status}</Text>
                <Text style={styles.label}>Check Out</Text>
                <Text style={styles.value}>{member.checkOut}</Text>
                <Text style={styles.label}>Break Time</Text>
                <Text style={styles.value}>{member.breakTime}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Check In</Text>
                <Text style={styles.value}>{member.checkIn}</Text>
                <Text style={styles.label}>Total Hours</Text>
                <Text style={styles.value}>{member.totalHours}</Text>
                <Text style={styles.label}>Late In</Text>
                <Text style={styles.value}>{member.lateIn}</Text>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 16 }} />
      </ScrollView>
      {/* Export Button */}
      <TouchableOpacity style={styles.exportBtn}>
        <Text style={styles.exportBtnText}>Export Data (CSV)</Text>
      </TouchableOpacity>

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
    width: '92%',
    alignSelf: 'center',
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  exportBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    width: '92%',
    alignSelf: 'center',
    marginBottom: 80,
  },
  exportBtnText: {
    color: Colors.cardBackground,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default TeamReports;