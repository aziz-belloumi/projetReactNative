import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Aide = ({ route, navigation }) => {
  const allTips = [
    'Take insulin as prescribed by your healthcare provider.',
    'Monitor your blood sugar levels regularly.',
    'Stay physically active to help manage blood sugar levels.',
    'Eat a balanced diet with a focus on whole foods.',
    'Always carry diabetes supplies with you.',
    'Maintain a healthy weight through diet and exercise.',
    'Include plenty of vegetables in your diet.',
    'Limit sugary snacks and beverages.',
    'Get regular check-ups with your healthcare team.',
    'Follow a balanced diet recommended by your healthcare provider.',
    'Engage in moderate and regular physical activity.',
    'Take medications if prescribed by your doctor.',
    'Discuss postpartum diabetes screening with your healthcare team.',
    'Make lifestyle changes to improve your health.',
    'Focus on a healthy diet with whole grains, fruits, and vegetables.',
    'Engage in regular physical activity to maintain a healthy weight.',
    'Work with your healthcare provider to prevent progression to type 2 diabetes.',
    'Maintain a healthy lifestyle with a balanced diet and regular exercise.',
    'Get regular check-ups and screenings for diabetes-related complications.',
    'Work closely with your healthcare team to manage your condition.'
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>A LITTLE KNOWLEDGE GOES A LONG WAY</Text>
        <Text style={styles.title}>Daily guidance</Text>
        <Text style={styles.subtitle}>Helpful reminders for everyday wellbeing.</Text>
        <FlatList
          data={allTips}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.tipContainer}>
              <View style={styles.tipNumber}><Text style={styles.tipNumberText}>{String(index + 1).padStart(2, '0')}</Text></View>
              <Text style={styles.tipText}>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8F3',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 21,
  },
  content: {
    flex: 1,
    maxWidth: 620,
    width: '100%',
    alignSelf: 'center',
  },
  eyebrow: {
    color: '#789084',
    fontSize: 9,
    letterSpacing: 1.1,
    fontWeight: '800',
    marginBottom: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#203D33',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#829087',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  tipContainer: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    marginBottom: 9,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E9EDE7',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipNumber: {
    width: 31,
    height: 31,
    borderRadius: 11,
    backgroundColor: '#E2F0E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  tipNumberText: {
    color: '#39755D',
    fontSize: 10,
    fontWeight: '800',
  },
  tipText: {
    flex: 1,
    color: '#496055',
    fontSize: 12,
    lineHeight: 18,
    paddingTop: 5,
  },
});

export default Aide;

