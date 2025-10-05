// src/screens/MyTeam.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import Header from '../../components/common/Header';
import BottomNavigationBar from '../../components/common/BottomNavigationBar';

function MyTeam({ onBack }) {
  const [currentRoute, setCurrentRoute] = useState('My Team');

  const team = [
    { name: 'Sophia Carter', role: 'HR Administrator', avatar: { uri: 'https://i.pravatar.cc/150?img=1' } },
    { name: 'Ethan Bennett', role: 'Manager', avatar: { uri: 'https://i.pravatar.cc/150?img=2' } },
    { name: 'Olivia Hayes', role: 'Senior Developer', avatar: { uri: 'https://i.pravatar.cc/150?img=3' } },
    { name: 'Liam Foster', role: 'Developer', avatar: { uri: 'https://i.pravatar.cc/150?img=4' } },
    { name: 'Ava Harper', role: 'Developer', avatar: { uri: 'https://i.pravatar.cc/150?img=5' } },
    { name: 'Noah Parker', role: 'Junior Developer', avatar: { uri: 'https://i.pravatar.cc/150?img=6' } },
    { name: 'Isabella Reed', role: 'Junior Developer', avatar: { uri: 'https://i.pravatar.cc/150?img=7' } },
    { name: 'You (Priyansh)', role: 'Junior Developer', avatar: { uri: 'https://i.pravatar.cc/150?img=8' }, isMe: true },
  ];

  const navItems = [
    { label: 'Dashboard', route: 'Dashboard', icon: 'grid-outline', activeIcon: 'grid', onPress: onBack },
    { label: 'Attendance', route: 'Attendance', icon: 'calendar-outline', activeIcon: 'calendar', onPress: onBack },
    { label: 'Request', route: 'Request', icon: 'document-text-outline', activeIcon: 'document-text', onPress: onBack },
    { label: 'My Team', route: 'My Team', icon: 'people-outline', activeIcon: 'people', onPress: () => setCurrentRoute('My Team') },
  ];

  return (
    <View style={GlobalStyles.container}>
      <Header
        title="My Team"
        onBack={onBack}
      />
      
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ paddingBottom: 80 }}>
        {team.map((member, idx) => (
          <View
            key={member.name}
            style={[
              styles.memberRow,
              member.isMe && styles.meRow,
            ]}
          >
            <Image
              source={member.avatar}
              style={styles.avatar}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomNavigationBar navItems={navItems} currentRoute={currentRoute} />
    </View>
  );
}

const styles = StyleSheet.create({
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: Colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    marginHorizontal: 18,
    borderRadius: 8,
    marginBottom: 4,
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    backgroundColor: '#eee',
  },
  memberName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  memberRole: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  meRow: {
    borderWidth: 1.5,
    borderColor: Colors.textLink,
    backgroundColor: '#f8ffff',
  },
});

export default MyTeam;