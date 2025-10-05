// components/ui/Screen.jsx
import React from 'react';
import { View, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';

const Screen = ({ 
  children, 
  style, 
  scrollable = false,
  keyboardAvoiding = false,
  safeArea = true,
  backgroundColor = Colors.background,
  ...props 
}) => {
  const screenStyle = {
    flex: 1,
    backgroundColor,
    ...style,
  };

  let content = children;

  if (scrollable) {
    content = (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  if (keyboardAvoiding) {
    content = (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  const ContainerComponent = safeArea ? SafeAreaView : View;

  return (
    <ContainerComponent style={screenStyle} {...props}>
      {content}
    </ContainerComponent>
  );
};

export default Screen;