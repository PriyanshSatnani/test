// components/ui/StatsCard.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import Card from './Card';

const StatsCard = ({ 
  title, 
  value, 
  subtitle,
  icon, 
  iconColor = Colors.primary,
  backgroundColor = Colors.cardBackground,
  valueColor = Colors.textPrimary,
  style,
  ...props 
}) => {
  return (
    <Card style={[styles.card, { backgroundColor }, style]} {...props}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {icon && (
            <Ionicons 
              name={icon} 
              size={24} 
              color={iconColor} 
            />
          )}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.value, { color: valueColor }]}>
          {value}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});

export default StatsCard;