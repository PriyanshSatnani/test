// src/screens/AttendanceReport.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import Header from '../../components/common/Header';
import BottomNavigationBar from '../../components/common/BottomNavigationBar';
import Settings from './Settings';

function AttendanceReport({ onBack, onRequestLeave }) {
  const [currentRoute, setCurrentRoute] = useState('Attendance');
  const [showSettings, setShowSettings] = useState(false);

  const markedDates = {
    '2025-11-02': { selected: true, selectedColor: Colors.primary },
    '2025-11-03': { selected: true, selectedColor: Colors.primary },
    '2025-11-04': { selected: true, selectedColor: Colors.primary },
    '2025-11-05': { selected: true, selectedColor: Colors.primary },
    '2025-11-06': { selected: true, selectedColor: Colors.primary },
    '2025-11-07': { selected: true, selectedColor: Colors.primary },
    '2025-11-08': { selected: true, selectedColor: Colors.primary },
    '2025-11-09': { selected: true, selectedColor: Colors.primary },
    '2025-11-10': { selected: true, selectedColor: Colors.primary },
    '2025-11-11': { selected: true, selectedColor: Colors.primary },
    '2025-11-12': { selected: true, selectedColor: Colors.primary },
    '2025-11-13': { selected: true, selectedColor: Colors.primary },
    '2025-11-14': { selected: true, selectedColor: Colors.primary },
    '2025-11-15': { selected: true, selectedColor: Colors.primary },
    '2025-11-16': { selected: true, selectedColor: Colors.primary },
    '2025-11-17': { selected: true, selectedColor: Colors.primary },
    '2025-11-18': { selected: true, selectedColor: Colors.accentRed }, // Absent (red)
    '2025-11-19': { selected: true, selectedColor: Colors.primary },
    '2025-11-20': { selected: true, selectedColor: Colors.primary },
    '2025-11-21': { selected: true, selectedColor: Colors.primary },
    '2025-11-22': { selected: true, selectedColor: Colors.primary },
    '2025-11-23': { selected: true, selectedColor: Colors.primary },
    '2025-11-24': { selected: true, selectedColor: Colors.primary },
    '2025-11-25': { selected: true, selectedColor: Colors.accentRed }, // Absent (red)
    '2025-11-26': { selected: true, selectedColor: Colors.primary },
    '2025-11-27': { selected: true, selectedColor: Colors.primary },
    '2025-11-28': { selected: true, selectedColor: Colors.primary },
    '2025-11-29': { selected: true, selectedColor: Colors.primary },
    '2025-11-30': { selected: true, selectedColor: Colors.primary },
  };

  ['2025-11-02', '2025-11-09', '2025-11-16', '2025-11-23', '2025-11-30'].forEach((date) => {
    if (markedDates[date]) {
      delete markedDates[date].selectedColor;
      markedDates[date].selected = false;
    }
  });

  const navItems = [
    { label: 'Dashboard', route: 'Dashboard', icon: 'grid-outline', activeIcon: 'grid', onPress: onBack },
    { label: 'Attendance', route: 'Attendance', icon: 'calendar-outline', activeIcon: 'calendar', onPress: () => setCurrentRoute('Attendance') },
    { label: 'Request', route: 'Request', icon: 'document-text-outline', activeIcon: 'document-text', onPress: onRequestLeave },
    { label: 'My Team', route: 'My Team', icon: 'people-outline', activeIcon: 'people', onPress: onBack },
    { label: 'Settings', route: 'Settings', icon: 'settings-outline', activeIcon: 'settings', onPress: () => setShowSettings(true) },
  ];

  if (showSettings) {
    return <Settings onBack={() => setShowSettings(false)} />;
  }

  return (
    <View style={GlobalStyles.container}>
      <Header
        title="Detailed Attendance Report"
        onBack={onBack}
      />
      <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Month and Custom Range */}
        <View style={styles.monthRow}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.monthText}>November 2025</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.customRangeRow}>
          <Text style={styles.customRangeText}>Custom Date Range</Text>
          <MaterialIcons name="date-range" size={18} color={Colors.primary} />
        </TouchableOpacity>

        {/* Calendar */}
        <Calendar
          current={'2025-11-01'}
          monthFormat={'MMMM yyyy'}
          hideExtraDays={true}
          markingType={'custom'}
          markedDates={markedDates}
          theme={{
            backgroundColor: Colors.cardBackground,
            calendarBackground: Colors.cardBackground,
            textSectionTitleColor: Colors.textPrimary,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: Colors.cardBackground,
            todayTextColor: Colors.primary,
            dayTextColor: Colors.textPrimary,
            textDisabledColor: '#ccc',
            arrowColor: Colors.primary,
            monthTextColor: Colors.textPrimary,
            indicatorColor: Colors.primary,
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 13,
          }}
          style={styles.calendar}
        />

        {/* Statistics Card */}
        <Text style={GlobalStyles.sectionTitle}>Statistics for November</Text>
        <View style={GlobalStyles.card}>
          <View style={styles.statsRow}>
            <View style={styles.statsCol}>
              <Text style={styles.statsLabel}>Total Hours Worked</Text>
              <Text style={styles.statsValue}>168</Text>
            </View>
            <View style={styles.statsCol}>
              <Text style={styles.statsLabel}>Total Absent Days</Text>
              <Text style={styles.statsValue}>2</Text>
            </View>
          </View>
        </View>

        {/* Request Leave Button */}
        <TouchableOpacity style={GlobalStyles.actionBtn} onPress={onRequestLeave}>
          <Text style={GlobalStyles.actionBtnText}>Request Leave</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavigationBar navItems={navItems} currentRoute={currentRoute} />
    </View>
  );
}

const styles = StyleSheet.create({
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 2,
    gap: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginHorizontal: 10,
  },
  customRangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 2,
    gap: 4,
  },
  customRangeText: {
    color: Colors.primary,
    fontWeight: '500',
    fontSize: 15,
    marginRight: 2,
  },
  calendar: {
    width: '96%',
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: 10,
    marginTop: 2,
    elevation: 1,
    backgroundColor: Colors.cardBackground,
    paddingBottom: 8,
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  statsCol: {
    alignItems: 'center',
    flex: 1,
  },
  statsLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  statsValue: {
    fontWeight: 'bold',
    fontSize: 22,
    color: Colors.primary,
  },
});

export default AttendanceReport;