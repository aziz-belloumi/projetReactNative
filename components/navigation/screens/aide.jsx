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
      <View>
        <Text style={styles.title}>Top 20 Tips for All Types</Text>
        <FlatList
          data={allTips}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tipContainer}>
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
    backgroundColor: '#4c00b4',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'yellow',
  },
  tipContainer: {
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  tipText: {
    fontSize: 16,
  },
});

export default Aide;


