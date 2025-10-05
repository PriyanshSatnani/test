// src/components/common/BottomNavigationBar.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';

const BottomNavigationBar = ({ navItems, currentRoute }) => {
  return (
    <View style={GlobalStyles.bottomNav}>
      {navItems.map((item) => {
        const isActive = item.route === currentRoute;
        return (
          <TouchableOpacity
            key={item.route}
            style={isActive ? GlobalStyles.navItemActive : GlobalStyles.navItem}
            onPress={item.onPress}
          >
            <Ionicons
              name={isActive ? item.activeIcon : item.icon}
              size={22}
              color={isActive ? Colors.primary : Colors.textSecondary}
            />
            <Text
              style={isActive ? GlobalStyles.navTextActive : GlobalStyles.navText}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigationBar;