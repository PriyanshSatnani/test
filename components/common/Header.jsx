// components/common/Header.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const Header = ({ 
  title, 
  onBack, 
  rightContent = null,
  showBackButton = true,
  backgroundColor = Colors.cardBackground,
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.header, { backgroundColor }, style]}>
      {showBackButton && onBack ? (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={Colors.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}
      
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {rightContent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 48, // Safe area
    elevation: 2,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  rightContainer: {
    width: 32,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default Header;