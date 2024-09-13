import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

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
    'Work closely with your healthcare team to manage your condition.',
    'Stay well-hydrated by drinking plenty of water throughout the day.',
    'Avoid smoking and limit alcohol consumption.',
    'Manage stress through relaxation techniques like deep breathing or meditation.',
    'Include lean protein sources in your meals, such as poultry, fish, and tofu.',
    'Choose healthy fats like avocados, nuts, and olive oil in moderation.',
    'Limit processed and fried foods in your diet.',
    'Choose whole fruits over fruit juices for better fiber content.',
    'Consider portion control to manage calorie intake.',
    'Read food labels to monitor added sugars and hidden ingredients.',
    'Use herbs and spices to flavor your meals instead of excessive salt.',
    'Include fiber-rich foods like beans, lentils, and whole grains.',
    'Maintain good dental hygiene to prevent oral health issues.',
    'Ensure proper foot care and inspect your feet regularly for any abnormalities.',
    'Include omega-3 fatty acids in your diet through sources like fatty fish or flaxseeds.',
    'Choose whole-grain options for bread, pasta, and rice.',
    'Monitor your blood pressure regularly and manage it within a healthy range.',
    'Plan your meals and snacks to avoid unplanned, unhealthy choices.',
    'Avoid prolonged periods of sitting; take short breaks to move around.',
    'Incorporate low-impact exercises like swimming or cycling into your routine.',
    'Ensure adequate sleep for overall well-being and blood sugar management.',
    'Keep an emergency supply of glucose or snacks for potential low blood sugar episodes.',
    'Join a diabetes support group to share experiences and gain valuable insights.',
    'Monitor your cholesterol levels and work with your healthcare provider to manage them.',
    'Consider incorporating probiotics for gut health.',
    'Include a variety of colorful vegetables in your meals for diverse nutrients.',
    'Learn to recognize and manage symptoms of hypoglycemia and hyperglycemia.',
    'Cook at home whenever possible to have better control over ingredients.',
    'Engage in activities you enjoy to reduce stress and improve mood.',
    'Limit caffeine intake, especially in the evening, to promote better sleep.',
    'Explore alternative sweeteners like stevia or monk fruit in moderation.',
    'Include dairy or dairy alternatives for a source of calcium.',
    'Practice mindful eating by savoring each bite and paying attention to hunger cues.',
    'Stay informed about new developments and research in diabetes management.',
    'Consider regular eye exams to monitor and manage diabetic retinopathy.',
    'Use a food diary to track your meals, snacks, and blood sugar levels.',
    'Include regular strength training exercises to build and maintain muscle mass.',
    'Limit processed and red meat consumption; opt for lean protein sources.',
    'Avoid sugary sodas and opt for water, herbal teas, or infused water.',
    'Learn to read and interpret your blood sugar monitoring results.',
    'Plan for regular dental check-ups and cleanings to maintain oral health.',
    'Explore mindfulness practices like yoga for stress reduction.',
    'Include high-fiber snacks like raw vegetables or air-popped popcorn.',
    'Be mindful of alcohol content in mixed drinks; choose lighter options.',
    'Consult with a registered dietitian for personalized nutrition guidance.',
    'Explore new recipes and cooking techniques to keep meals interesting.',
    'Consider regular health check-ups to monitor overall well-being.',
    'Maintain a positive mindset and celebrate small victories in your diabetes management journey.'
  ];
    const motivationalQuotes = [
      "Your health is an investment, not an expense. Take care of your body, and it will take care of you.",
      "Diabetes is not a stop sign; it’s a guide to a healthier lifestyle journey.",
      "Every small positive change we make in ourselves repays us in confidence in the future.",
      "Your journey is just as important as your destination. Celebrate the small victories along the way.",
      "Diabetes doesn’t define you; your actions do. Choose health, choose life.",
      "You have the power to shape your future. Make choices today that your future self will thank you for.",
      "Challenges are what make life interesting; overcoming them is what makes life meaningful.",
      "You are stronger than you think. Keep going, keep fighting, and keep believing in yourself.",
      "Your health is your wealth. Invest in it daily.",
      "Diabetes is a chapter in your life, not the whole story. Write a story of resilience and triumph.",
      "Believe in yourself and all that you are. Remember, there is something inside you that is greater than any obstacle.",
      "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
      "The only limit to our realization of tomorrow will be our doubts of today.",
      "Your attitude determines your direction. Stay positive, stay focused.",
      "The only way to do great work is to love what you do.",
      "You are not alone on this journey. Lean on others, share your experiences, and find strength in the community.",
      "You have within you right now, everything you need to deal with whatever the world can throw at you.",
      "Don’t count the days; make the days count.",
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      "You are not a product of your circumstances; you are a product of your decisions.",
      "Success is stumbling from failure to failure with no loss of enthusiasm.",
      "Embrace the glorious mess that you are.",
      "You are braver than you believe, stronger than you seem, and smarter than you think.",
      "Don’t watch the clock; do what it does. Keep going.",
      "The best way to predict the future is to create it.",
      "You have the power to change your story. Every day is a new chapter.",
      "The only person you are destined to become is the person you decide to be.",
      "Your life does not get better by chance; it gets better by change.",
      "Difficulties in life are intended to make us better, not bitter.",
      "The only limit to our realization of tomorrow will be our doubts of today.",
      "Make today so awesome that yesterday gets jealous.",
      "You are what you do, not what you say you’ll do.",
      "Your health is an investment, not an expense.",
      "Don’t wait for the perfect moment; take the moment and make it perfect.",
      "Life is 10% what happens to us and 90% how we react to it.",
      "Your body hears everything your mind says. Stay positive.",
      "The only person you are destined to become is the person you decide to be.",
      "Your health is your wealth. Invest wisely.",
      "The difference between a stumbling block and a stepping stone is how you use it.",
      "You’ve got what it takes, but it will take everything you’ve got.",
      "It’s not about perfect. It’s about effort. And when you bring that effort every single day, that’s where transformation happens.",
      "Believe you can and you’re halfway there.",
      "Your life is a result of your choices. If you don’t like your life, it’s time to make better choices.",
      "The only way to achieve the impossible is to believe it is possible.",
      "You don’t have to be perfect to be amazing.",
      "Fall seven times, stand up eight.",
      "Your health is your responsibility. Make it a priority.",
      "You are not your illness. You have an individual story to tell. You have a name, a history, a personality. Staying yourself is part of the battle.",
      "The comeback is always stronger than the setback.",
      "It’s not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
    ];

  const [modalVisible, setModalVisible] = useState(false);
  const [randomQuote, setRandomQuote] = useState('');
  const [usedQuotes, setUsedQuotes] = useState([]);

  const getRandomQuote = () => {
    const unusedQuotes = motivationalQuotes.filter((quote) => !usedQuotes.includes(quote));
    if (unusedQuotes.length === 0) {
      // All quotes have been used, reset the usedQuotes array
      setUsedQuotes([]);
    }

    const randomIndex = Math.floor(Math.random() * unusedQuotes.length);
    const quote = unusedQuotes[randomIndex];
    setUsedQuotes([...usedQuotes, quote]);
    setRandomQuote(quote);
    setModalVisible(true);
  };

  useEffect(() => {
    if (modalVisible) {
      getRandomQuote();
    }
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TOP TIPS FOR ALL TYPES</Text>

      <ScrollView style={styles.tipsContainer}>
        <FlatList
          data={allTips}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tipContainer}>
              <Text style={styles.tipText}>{item}</Text>
            </View>
          )}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.motivationalButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.motivationalButtonText}>Get Motivated</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{randomQuote}</Text>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4c00b4',
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'yellow',
    alignSelf: 'center',
  },
  tipsContainer: {
    flex: 1,
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
  buttonContainer: {
    marginTop: 16,
  },
  motivationalButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 50,
    width: 200,
    alignSelf: 'center',
  },
  motivationalButtonText: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 22,
    marginBottom: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Aide;
