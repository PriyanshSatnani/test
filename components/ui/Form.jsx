// components/ui/Form.jsx
import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';

const Form = ({ 
  children, 
  style,
  keyboardAvoiding = true,
  ...props 
}) => {
  const content = (
    <View style={[styles.form, style]} {...props}>
      {children}
    </View>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  form: {
    padding: 16,
  },
});

export default Form;