// src/screens/UserRoleManagement.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import Header from '../../components/common/Header';

function UserRoleManagement({ onBack }) {
  const [search, setSearch] = useState('');
  const users = [
    { name: 'Ethan Carter', role: 'Admin', avatar: { uri: 'https://i.pravatar.cc/150?img=2' } },
    { name: 'Olivia Bennett', role: 'Manager', avatar: { uri: 'https://i.pravatar.cc/150?img=3' } },
    { name: 'Noah Thompson', role: 'Employee', avatar: { uri: 'https://i.pravatar.cc/150?img=4' } },
    { name: 'Ava Rodriguez', role: 'Employee', avatar: { uri: 'https://i.pravatar.cc/150?img=5' } },
    { name: 'Liam Walker', role: 'Employee', avatar: { uri: 'https://i.pravatar.cc/150?img=6' } },
    { name: 'Isabella Hayes', role: 'Employee', avatar: { uri: 'https://i.pravatar.cc/150?img=7' } },
    { name: 'Lucas Foster', role: 'Employee', avatar: { uri: 'https://i.pravatar.cc/150?img=8' } },
    { name: 'Mia Coleman', role: 'Employee', avatar: { uri: 'https://i.pravatar.cc/150?img=9' } },
  ];
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Header
        title="User Management"
        onBack={onBack}
      />
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users"
          placeholderTextColor={Colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        {filtered.map((user, idx) => (
          <View key={user.name} style={styles.userRow}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userRole}>{user.role}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.borderLight,
    borderRadius: 12,
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    backgroundColor: 'transparent',
    padding: 0,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginHorizontal: 18,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 14,
    backgroundColor: '#eee',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  userRole: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

export default UserRoleManagement;