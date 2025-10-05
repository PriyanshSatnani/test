// components/common/DashboardLayout.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Screen } from '../ui';
import Header from './Header';
import BottomNavigationBar from './BottomNavigationBar';

const DashboardLayout = ({ 
  children, 
  title,
  onBack,
  navItems,
  currentRoute,
  rightContent,
  scrollable = true,
  showHeader = true,
  showNavigation = true,
}) => {
  const content = scrollable ? (
    <ScrollView 
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.content}>
      {children}
    </View>
  );

  return (
    <Screen backgroundColor={Colors.background}>
      {showHeader && (
        <Header 
          title={title} 
          onBack={onBack}
          rightContent={rightContent}
        />
      )}
      
      <View style={styles.main}>
        {content}
      </View>
      
      {showNavigation && navItems && (
        <BottomNavigationBar
          navItems={navItems}
          currentRoute={currentRoute}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom navigation
  },
  content: {
    flex: 1,
    paddingBottom: 100, // Space for bottom navigation
  },
});

export default DashboardLayout;