// screens/EmployeeDashboard.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import Header from '../../components/common/Header';
import { Svg, Defs, LinearGradient, Stop, Path, G, Circle, Text as SvgText } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Screen, Card, StatsCard, Button } from '../../components/ui';
import BottomNavigationBar from '../../components/common/BottomNavigationBar';
import DashboardLayout from '../../components/common/DashboardLayout';
import RequestLeave from './RequestLeave';
import AttendanceReport from './AttendanceReport';
import MyTeam from './MyTeam';
import Settings from './Settings';
import Notifications from './Notifications';

const EmployeeDashboard = ({ onBack }) => {
  // Handler for clock in/out button
  const handleClockInOut = () => {
    Alert.alert(
      'Clock In/Out',
      'Your attendance has been recorded.',
      [
        { text: 'OK' }
      ]
    );
  };

  const chartData = [
    { label: 'Aug', value: 30 },
    { label: 'Sep', value: 60 },
    { label: 'Oct', value: 45 },
  ];

  const width = 300;
  const height = 120;
  const maxValue = Math.max(...chartData.map(d => d.value));
  
  const points = chartData.map((d, i) => ({
    x: (i / (chartData.length - 1)) * (width - 40) + 20,
    y: height - 20 - ((d.value / maxValue) * (height - 40)),
  }));

  const getLinePath = () => {
    return points.reduce(
      (acc, p, i) => acc + (i === 0 ? `M${p.x},${p.y}` : ` L${p.x},${p.y}`),
      ''
    );
  };

  const getAreaPath = () => {
    if (points.length > 1) {
      const line = points.map((p, i) => (i === 0 ? `M${p.x},${height}` : '') + ` L${p.x},${p.y}`).join('');
      const last = points[points.length - 1];
      return `${line} L${last.x},${height} Z`;
    }
    return '';
  };

  const [currentRoute, setCurrentRoute] = useState('Dashboard');
  const [showAttendance, setShowAttendance] = useState(false);
  const [showRequestLeave, setShowRequestLeave] = useState(false);
  const [showMyTeam, setShowMyTeam] = useState(false);
  const [logout, setLogout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (logout && onBack) {
      onBack();
    }
  }, [logout, onBack]);

  const handleShowRequestLeave = () => {
    setShowAttendance(false);
    setShowRequestLeave(true);
  };

  const handleBackToDashboard = (route) => {
    setShowRequestLeave(false);
    setShowAttendance(false);
    setShowMyTeam(false);
    setShowSettings(false);
    setCurrentRoute(route);
  };

  if (showRequestLeave) {
    return <RequestLeave onBack={() => handleBackToDashboard('Dashboard')} />;
  }

  if (showAttendance) {
    return (
      <AttendanceReport
        onBack={() => handleBackToDashboard('Dashboard')}
        onRequestLeave={handleShowRequestLeave}
      />
    );
  }

  if (showMyTeam) {
    return <MyTeam onBack={() => handleBackToDashboard('Dashboard')} />;
  }

  if (showSettings) {
    return <Settings onBack={() => setShowSettings(false)} />;
  }

  if (showNotifications) {
    return <Notifications onBack={() => setShowNotifications(false)} />;
  }

  const navItems = [
    { label: 'Dashboard', route: 'Dashboard', icon: 'grid-outline', activeIcon: 'grid', onPress: () => handleBackToDashboard('Dashboard') },
    { label: 'My Team', route: 'My Team', icon: 'people-outline', activeIcon: 'people', onPress: () => setShowMyTeam(true) },
    { label: 'Settings', route: 'Settings', icon: 'settings-outline', activeIcon: 'settings', onPress: () => setShowSettings(true) },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Logout */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setLogout(true)} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={24} color="#008080" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ATTENDANCE</Text>
        <TouchableOpacity onPress={() => setShowNotifications(true)} style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color="#008080" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <Text style={styles.greeting}>Hi, Ethan</Text>

        {/* Today's Schedule Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Schedule</Text>
          
          <View style={styles.scheduleItem}>
            <View style={[styles.iconCircle, { backgroundColor: '#E0F4F3' }]}>
              <Ionicons name="time-outline" size={20} color="#008080" />
            </View>
            <View style={styles.scheduleText}>
              <Text style={styles.scheduleLabel}>Shift Time</Text>
              <Text style={styles.scheduleValue}>9:00 AM - 5:00 PM</Text>
            </View>
          </View>

          <View style={styles.scheduleItem}>
            <View style={[styles.iconCircle, { backgroundColor: '#E0F4F3' }]}>
              <Ionicons name="cafe-outline" size={20} color="#008080" />
            </View>
            <View style={styles.scheduleText}>
              <Text style={styles.scheduleLabel}>Breaks</Text>
              <Text style={styles.scheduleValue}>1:00 PM - 2:00 PM</Text>
            </View>
          </View>

          <View style={styles.scheduleItem}>
            <View style={[styles.iconCircle, { backgroundColor: '#E0F4F3' }]}>
              <Ionicons name="people-outline" size={20} color="#008080" />
            </View>
            <View style={styles.scheduleText}>
              <Text style={styles.scheduleLabel}>Meeting</Text>
              <Text style={styles.scheduleValue}>11:00 AM</Text>
            </View>
          </View>
        </View>

        {/* Attendance Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Attendance Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>22</Text>
              <Text style={styles.summaryLabel}>Total Days{"\n"}Worked</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>2</Text>
              <Text style={styles.summaryLabel}>Days Absent</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>3</Text>
              <Text style={styles.summaryLabel}>Late Arrivals</Text>
            </View>
          </View>
        </View>

        {/* Attendance Trend Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Attendance Trend (Last 3 Months)</Text>
          <TouchableOpacity onPress={() => setShowAttendance(true)}>
            <View style={styles.chartContainer}>
              <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <Defs>
                  <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor="#008080" stopOpacity="0.3" />
                    <Stop offset="100%" stopColor="#008080" stopOpacity="0.1" />
                  </LinearGradient>
                </Defs>
                {/* Area under curve */}
                <Path 
                  d={getAreaPath()} 
                  fill="url(#gradient)" 
                />
                {/* Line */}
                <Path 
                  d={getLinePath()} 
                  stroke="#008080" 
                  strokeWidth="3" 
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Data points and labels */}
                {chartData.map((item, index) => {
                  const point = points[index];
                  return (
                    <G key={index}>
                      <Circle 
                        cx={point.x} 
                        cy={point.y} 
                        r="4" 
                        fill="#008080" 
                      />
                      <SvgText 
                        x={point.x} 
                        y={height - 5} 
                        textAnchor="middle" 
                        fontSize="12" 
                        fill="#666"
                      >
                        {item.label}
                      </SvgText>
                    </G>
                  );
                })}
              </Svg>
            </View>
          </TouchableOpacity>
        </View>

        {/* Clock In/Out Button */}
        <TouchableOpacity style={styles.clockButton} onPress={handleClockInOut}>
          <Ionicons name="time-outline" size={24} color="white" />
          <Text style={styles.clockButtonText}>CLOCK IN/OUT</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigationBar
        navItems={navItems}
        currentRoute={currentRoute}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationBtn: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scheduleText: {
    flex: 1,
  },
  scheduleLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  scheduleValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  chartContainer: {
    height: 120,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockButton: {
    backgroundColor: '#008080',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 50,
    marginBottom: 20,
  },
  clockButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  logoutBtn: {
    padding: 5,
    marginRight: 8,
  },

});

export default EmployeeDashboard;