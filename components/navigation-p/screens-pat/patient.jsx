import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, FlatList, Linking, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

const Acommpagnant = ({ navigation }) => {
  const [showExercises, setShowExercises] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [message, setMessage] = useState('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const fullMessage = `
    Dear Friend,

    In your journey with diabetes, remember that every small step is a big win. Your strength, resilience, and commitment to self-care inspire us all. Embrace each day, celebrate victories, and know that setbacks are just stepping stones to success. You're not alone; your journey is unique, and your story is powerful. Keep moving forward with courage, and never forget the incredible person you are.

    With support and admiration,
  `;

  useEffect(() => {
    const updateMessage = () => {
      setMessage(fullMessage.slice(0, currentLetterIndex));
      setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    };

    if (currentLetterIndex < fullMessage.length) {
      const timer = setTimeout(updateMessage, 1); // Adjust the delay between each letter
      return () => clearTimeout(timer);
    }
  }, [currentLetterIndex, fullMessage]);

  const exercisesData = [
    'Walking\n- Simple, yet effective.\n- Start with a comfortable pace and gradually increase intensity.\n- Aim for at least 30 minutes most days of the week.',
    'Cycling\n- A low-impact exercise.\n- Can be done outdoors or on a stationary bike.\n- Helps improve cardiovascular health.',
    'Swimming\n- Gentle on the joints.\n- Provides a full-body workout.\n- Excellent for cardiovascular health.',
    'Strength Training\n- Builds muscle, which can improve insulin sensitivity.\n- Use resistance bands, weights, or bodyweight exercises.\n- Include exercises for major muscle groups.',
    'Yoga\n- Improves flexibility and reduces stress.\n- Includes various poses and breathing exercises.\n- Suitable for all fitness levels.',
    'Tai Chi\n- Combines gentle movements with deep breathing.\n- Improves balance and reduces stress.\n- Suitable for all fitness levels.',
    'Aerobics\n- Low-impact aerobics can be beneficial.\n- Follow a routine that includes cardiovascular exercises.\n- Adjust intensity based on fitness level.',
    'Pilates\n- Focuses on core strength and flexibility.\n- Low-impact and suitable for various fitness levels.\n- Helps improve posture and balance.',
    'Dancing\n- Fun and engaging.\n- Can include various dance styles.\n- Helps with cardiovascular fitness.',
    'Hiking\n- Provides both cardiovascular and strength benefits.\n- Choose trails that match your fitness level.\n- Enjoy nature while staying active.',
  ];

  const linksData = [
    { text: 'DIABETES EDUCATION', link: 'https://www.youtube.com/watch?v=wZAjVQWbMlE' },
    { text: 'BLOOD SUGAR MONITORING', link: 'https://www.youtube.com/watch?v=ODKPEBUnZRI' },
    { text: 'DIABETES SUPPORT AND COMMUNITY', link: 'https://www.youtube.com/watch?v=KEPi8kaAXy4' },
    { text:'EDUCATE YOURSELF MORE', link: 'https://en.wikipedia.org/wiki/Diabetes'}
  ];

  const renderExercise = ({ item }) => {
    const exerciseParts = item.split('\n');
    const exerciseName = exerciseParts[0].trim();
    const exerciseDetails = exerciseParts.slice(1).join('\n').trim();

    return (
      <View style={styles.exerciseItem}>
        <Text style={styles.exerciseName}>{exerciseName}</Text>
        <Text style={styles.exerciseDetails}>{exerciseDetails}</Text>
      </View>
    );
  };

  const startPressing = () => {
    setIsPressing(true);
  };

  const stopPressing = () => {
    setIsPressing(false);
  };

  const handleDiscoverMore = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>

        <TouchableOpacity
          style={styles.firstButton}
          onPress={() => {
            Alert.alert(
              'Appointments',
              'Show Appointments',
              [
                {
                  text: 'Yes',
                  onPress: () => {
                    // Handle 'Yes' button press
                    // You can add custom logic related to Appointments button here
                  },
                },
                {
                  text: 'No',
                  onPress: () => {
                    // Handle 'No' button press or do nothing
                  },
                },
              ],
              { cancelable: false } // Prevent dismissing the alert by tapping outside
            );
          }}
        >
          <Text style={styles.text}>APPOINTMENTS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.firstButton}
          onPress={() => setShowExercises(!showExercises)}
        >
          <Text style={styles.text}>EXERCISES</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pressButton}
          onPressIn={startPressing}
          onPressOut={stopPressing}
          onPress={handleDiscoverMore}
        >
          <Text style={styles.text}>DISCOVER MORE</Text>
        </TouchableOpacity>

        <Modal
          isVisible={isModalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={closeModal}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={linksData}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                  <Text style={styles.linkText}>{item.text}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {showExercises && (
          <FlatList
            data={exercisesData}
            renderItem={renderExercise}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#4c00b4',
    flex: 1,
    justifyContent: 'flex-start', // Align content at the top
    alignItems: 'center',
  },
  firstButton: {
    width: 200,
    height: 46,
    margin: 10,
    backgroundColor: 'black',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  pressButton: {
    width: 200,
    height: 46,
    margin: 10,
    backgroundColor: 'black',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  exerciseItem: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4c00b4',
  },
  exerciseDetails: {
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
    textAlign: 'center',
    margin: 10,
  },
  message: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});

export default Acommpagnant;
