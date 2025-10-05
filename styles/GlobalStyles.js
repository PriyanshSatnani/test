// styles/GlobalStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const GlobalStyles = StyleSheet.create({
  // --- Screen Layout ---
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // --- Typography ---
  heading1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  heading2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  // --- Layout ---
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    padding: 16,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  paddingVertical: {
    paddingVertical: 16,
  },
  marginBottom: {
    marginBottom: 16,
  },
  
  // --- Form Elements ---
  formContainer: {
    padding: 16,
  },
  
  // --- Cards ---
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  // --- Sections ---
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },

  // --- Dividers ---
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 16,
  },

  // --- Clock Button (specific to dashboard) ---
  clockBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  clockBtnText: {
    color: Colors.cardBackground,
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },

  // --- Bottom Navigation ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    paddingVertical: 8,
    paddingBottom: 20, // Safe area
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    elevation: 8,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  navItemActive: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  navText: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  navTextActive: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 11,
    marginTop: 4,
  },

  // --- Legacy support (for gradual migration) ---
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    minHeight: 48,
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
  },
  textarea: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: Colors.cardBackground,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});