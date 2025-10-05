import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';

const notifications = [
  { id: 1, title: 'Leave Approved', desc: 'Your vacation leave for 12-15 Nov has been approved.', time: '2h ago' },
  { id: 2, title: 'Attendance Reminder', desc: 'Don\'t forget to clock in by 9:00 AM.', time: 'Today' },
  { id: 3, title: 'Team Meeting', desc: 'Team meeting scheduled at 11:00 AM.', time: 'Yesterday' },
  { id: 4, title: 'System Alert', desc: 'System maintenance scheduled for this weekend.', time: '2 days ago' },
];

function Notifications({ onBack }) {
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.divider} />

        <ScrollView contentContainerStyle={styles.list}>
          {notifications.map(n => (
            <View key={n.id} style={styles.notifCard}>
              <View style={styles.notifIconCircle}>
                <Ionicons name="notifications-outline" size={22} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.notifTitle}>{n.title}</Text>
                <Text style={styles.notifDesc}>{n.desc}</Text>
                <Text style={styles.notifTime}>{n.time}</Text>
              </View>
            </View>
          ))}
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
  list: {
    paddingHorizontal: 0,
    paddingTop: 0,
    width: '100%',
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  notifIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  notifTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  notifDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  notifTime: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 2,
  },
});

export default Notifications;
