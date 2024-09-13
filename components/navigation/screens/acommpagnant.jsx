import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Video } from 'expo-av';
import Modal from 'react-native-modal';

const Acommpagnant = ({ navigation }) => {
  const [showExercises, setShowExercises] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

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

  const renderExercise = ({ item }) => {
    // Split the exercise information at newline character (\n)
    const exerciseParts = item.split('\n');

    // Extract the exercise name and details
    const exerciseName = exerciseParts[0].trim();
    const exerciseDetails = exerciseParts.slice(1).join('\n').trim();

    return (
      <View style={styles.exerciseItem}>
        <Text style={styles.exerciseName}>{exerciseName}</Text>
        <Text style={styles.exerciseDetails}>{exerciseDetails}</Text>
      </View>
    );
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded && status.positionMillis >= status.durationMillis - 1000) {
      // Video has reached the end, show the custom modal
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.text}>EXERCICES</Text>
      </TouchableOpacity>

      {showExercises && (
        <FlatList
          data={exercisesData}
          renderItem={renderExercise}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <Video
        source={require('/home/hp/Bureau/project/components/best_shot.mp4')}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            In the embrace of your kindness, you are the hero who tends to the sick, offering solace and a renewed sense of strength.
            Thank you for your great work
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>OK</Text>
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
    justifyContent: 'center',
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
  video: {
    flex: 0.75,
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    fontFamily: '', // Choose your preferred font
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
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
});

export default Acommpagnant;
