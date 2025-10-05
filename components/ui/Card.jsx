// components/ui/Card.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const Card = ({ children, style, padding = true, ...props }) => {
  return (
    <View 
      style={[
        styles.card,
        padding && styles.cardPadding,
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPadding: {
    padding: 16,
  },
});

export default Card;