import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Food = () => {
  const [selectedMeals, setSelectedMeals] = useState([]);

  const data = [
    { id: '1', food: 'Berries', sugar: '5g' },
    { id: '2', food: 'Avocado', sugar: '0.2g' },
    { id: '3', food: 'Broccoli', sugar: '1.4g' },
    { id: '4', food: 'Cauliflower', sugar: '0.9g' },
    { id: '5', food: 'Spinach', sugar: '0.4g' },
    { id: '6', food: 'Salmon', sugar: '0g' },
    { id: '7', food: 'Chicken Breast', sugar: '0g' },
    { id: '8', food: 'Eggs', sugar: '0.6g' },
    { id: '9', food: 'Quinoa', sugar: '1.6g' },
    { id: '10', food: 'Greek Yogurt', sugar: '5g' },
    { id: '11', food: 'Mixed Nuts', sugar: '4.1-4.7g' },
    { id: '12', food: 'Olive Oil', sugar: '0g' },
    { id: '13', food: 'Tofu', sugar: '0.5g' },
    { id: '14', food: 'Green Tea', sugar: '0g' },
    { id: '15', food: 'Water', sugar: '0g' },
    { id: '16', food: 'Salad Greens (Lettuce)', sugar: '0.5g' },
    { id: '17', food: 'Tomatoes', sugar: '2.6g' },
    { id: '18', food: 'Cucumber', sugar: '1.7g' },
    { id: '19', food: 'Carrots', sugar: '4.7g' },
    { id: '20', food: 'Bell Peppers', sugar: '3.9g' },
    { id: '21', food: 'Zucchini', sugar: '1.2g' },
    { id: '22', food: 'Turkey Breast', sugar: '0g' },
    { id: '23', food: 'Shrimp', sugar: '0g' },
    { id: '24', food: 'Lentils', sugar: '1.8g' },
    { id: '25', food: 'Blueberries', sugar: '9.7g' },
    { id: '26', food: 'Kiwi', sugar: '8.9g' },
    { id: '27', food: 'Asparagus', sugar: '1.9g' },
    { id: '28', food: 'Cabbage', sugar: '2.3g' },
    { id: '29', food: 'Smoked Trout', sugar: '0.2g' },
    { id: '30', food: 'Almond Butter', sugar: '3.9g' },
    { id: '31', food: 'Artichokes', sugar: '1g' },
    { id: '32', food: 'Cauliflower Rice', sugar: '1.4g' },
    { id: '33', food: 'Radishes', sugar: '1g' },
    { id: '34', food: 'Brussels Sprouts', sugar: '1.5g' },
    { id: '35', food: 'Eggplant', sugar: '2.4g' },
    { id: '36', food: 'Beets', sugar: '8.9g' },
    { id: '37', food: 'Mushrooms', sugar: '1g' },
    { id: '38', food: 'Cottage Cheese', sugar: '3.5g' },
    { id: '39', food: 'Pumpkin Seeds', sugar: '0g' },
    { id: '40', food: 'Chia Seeds', sugar: '0g' },
    { id: '41', food: 'Flaxseeds', sugar: '0g' },
    { id: '42', food: 'Garlic', sugar: '0.9g' },
    { id: '43', food: 'Ginger', sugar: '0.2g' },
    { id: '44', food: 'Cranberries (unsweetened)', sugar: '4.3g' },
    { id: '45', food: 'Peaches (fresh)', sugar: '8.4g' },
    { id: '46', food: 'Strawberries', sugar: '4.9g' },
    { id: '47', food: 'Raspberries', sugar: '5.4g' },
    { id: '48', food: 'Cocoa Powder (unsweetened)', sugar: '0.5g' },
    { id: '49', food: 'Tuna (in water)', sugar: '0g' },
    { id: '50', food: 'Cauliflower Mash', sugar: '2.5g' },
    { id: '51', food: 'Arugula', sugar: '0.2g' },
    { id: '52', food: 'Celery', sugar: '1.2g' },
    { id: '53', food: 'Peppers (any color)', sugar: '4.2g' },
    { id: '54', food: 'Cabbage (red)', sugar: '2.5g' },
    { id: '55', food: 'Cauliflower Pizza Crust', sugar: '3.3g' },
    { id: '56', food: 'Soybeans', sugar: '3.5g' },
    { id: '57', food: 'Edamame', sugar: '2.2g' },
    { id: '58', food: 'Green Beans', sugar: '3.1g' },
    { id: '59', food: 'Peanut Butter (unsweetened)', sugar: '1.5g' },
    { id: '60', food: 'Walnuts', sugar: '1.0g' },
    { id: '61', food: 'Hazelnuts', sugar: '1.5g' },
    { id: '62', food: 'Coconut Oil', sugar: '0g' },
    { id: '63', food: 'Cherry Tomatoes', sugar: '3.5g' },
    { id: '64', food: 'Beef (lean cuts)', sugar: '0g' },
    { id: '65', food: 'Pork Tenderloin', sugar: '0g' },
    { id: '66', food: 'Venison', sugar: '0g' },
    { id: '67', food: 'Mackerel', sugar: '0g' },
    { id: '68', food: 'Sardines (in water)', sugar: '0g' },
    { id: '69', food: 'Hemp Seeds', sugar: '0.5g' },
    { id: '70', food: 'Bok Choy', sugar: '1.0g' },
    { id: '71', food: 'Cilantro', sugar: '0.1g' },
    { id: '72', food: 'Lime', sugar: '1.1g' },
    { id: '73', food: 'Lemon', sugar: '2.5g' },
    { id: '74', food: 'Beef Jerky (unsweetened)', sugar: '0g' },
    { id: '75', food: 'Cottage Cheese (low-fat)', sugar: '4.5g' },
    { id: '76', food: 'Almond Milk (unsweetened)', sugar: '0g' },
    { id: '77', food: 'Coconut Milk (unsweetened)', sugar: '0.5g' },
    { id: '78', food: 'Seaweed (Nori)', sugar: '0g' },
    { id: '79', food: 'Avocado Oil', sugar: '0g' },
    { id: '80', food: 'Red Cabbage', sugar: '2.5g' },
    { id: '81', food: 'Jicama', sugar: '4.5g' },
    { id: '82', food: 'Swiss Chard', sugar: '0.4g' },
    { id: '83', food: 'Mustard Greens', sugar: '1.5g' },
    { id: '84', food: 'Collard Greens', sugar: '0.5g' },
    { id: '85', food: 'Coconut Flour', sugar: '4.5g' },
    { id: '86', food: 'Pecans', sugar: '1.1g' },
    { id: '87', food: 'Pistachios', sugar: '2.2g' },
    { id: '88', food: 'Sunflower Seeds', sugar: '1.5g' },
    { id: '89', food: 'Butter (unsalted)', sugar: '0g' },
    { id: '90', food: 'Shirataki Noodles', sugar: '0g' },
    { id: '91', food: 'Cayenne Pepper', sugar: '1.6g' },
    { id: '92', food: 'Cinnamon', sugar: '0.2g' },
    { id: '93', food: 'Paprika', sugar: '2.1g' },
    { id: '94', food: 'Lettuce Wraps', sugar: '0.5g' },
    { id: '95', food: 'Cacao Nibs', sugar: '0g' },
    { id: '96', food: 'Sesame Oil', sugar: '0g' },
    { id: '97', food: 'Zoodles', sugar: '3.2g' },
    { id: '98', food: 'Tahini', sugar: '1.7g' },
    { id: '99', food: 'Green Onions', sugar: '1.4g' },
    { id: '100', food: 'Parsley', sugar: '0.5g' },
    { id: '101', food: 'Cauliflower Soup', sugar: '2.3g' },
    { id: '102', food: 'Salmon Salad', sugar: '0g' },
    { id: '103', food: 'Cherry Almond Smoothie', sugar: '7.8g' },
    { id: '104', food: 'Cabbage Rolls', sugar: '3.1g' },
    { id: '105', food: 'Turkey Burger', sugar: '0g' },
    { id: '106', food: 'Egg Salad', sugar: '1.2g' },
    { id: '107', food: 'Mushroom Omelette', sugar: '2.5g' },
    { id: '108', food: 'Spaghetti Squash', sugar: '2.2g' },
    { id: '109', food: 'Cucumber Mint Infused Water', sugar: '0g' },
    { id: '110', food: 'Grilled Chicken Skewers', sugar: '0.8g' },
    { id: '111', food: 'Brussels Sprouts Salad', sugar: '3.7g' },
    { id: '112', food: 'Avocado and Shrimp Salad', sugar: '1.5g' },
    { id: '113', food: 'Lemon Garlic Roasted Chicken', sugar: '0g' },
    { id: '114', food: 'Zucchini Noodles with Pesto', sugar: '2.8g' },
    { id: '115', food: 'Broccoli and Cheese Casserole', sugar: '3.9g' },
    { id: '116', food: 'Greek Yogurt Parfait with Berries', sugar: '7.2g' },
    { id: '117', food: 'Baked Cod with Lemon and Herbs', sugar: '0.5g' },
    { id: '118', food: 'Spinach and Feta Stuffed Chicken Breast', sugar: '0.9g' },
    { id: '119', food: 'Cauliflower Hummus', sugar: '2.1g' },
    { id: '120', food: 'Cabbage and Kale Slaw', sugar: '4.2g' },
    { id: '121', food: 'Almond-Crusted Baked Chicken Tenders', sugar: '0.7g' },
    { id: '122', food: 'Quinoa Salad with Veggies', sugar: '3.5g' },
    { id: '123', food: 'Tomato Basil Soup', sugar: '3.2g' },
    { id: '124', food: 'Cucumber Avocado Salsa', sugar: '1.8g' },
    { id: '125', food: 'Pork Stir-Fry with Vegetables', sugar: '2.9g' },
    { id: '126', food: 'Cilantro Lime Cauliflower Rice', sugar: '1.1g' },
    { id: '127', food: 'Mixed Berry Chia Pudding', sugar: '5.6g' },
    { id: '128', food: 'Stuffed Bell Peppers', sugar: '4.8g' },
    { id: '129', food: 'Grilled Asparagus', sugar: '1.4g' },
    { id: '130', food: 'Eggplant Lasagna', sugar: '3.6g' },
    { id: '131', food: 'Shrimp and Broccoli Stir-Fry', sugar: '1.9g' },
    { id: '132', food: 'Tomato Cucumber Salad', sugar: '3.4g' },
    { id: '133', food: 'Roasted Garlic Mashed Cauliflower', sugar: '2.6g' },
    { id: '134', food: 'Pesto Zoodle Bowl', sugar: '2.4g' },
    { id: '135', food: 'Lemon Herb Baked Salmon', sugar: '0.3g' },
    { id: '136', food: 'Cabbage and Turkey Sausage Skillet', sugar: '2.7g' },
    { id: '137', food: 'Greek Chicken Souvlaki', sugar: '1.2g' },
    { id: '138', food: 'Cauliflower and Broccoli Gratin', sugar: '4.5g' },
    { id: '139', food: 'Avocado Cilantro Lime Rice', sugar: '1.7g' },
    { id: '140', food: 'Chicken and Vegetable Kebabs', sugar: '2.2g' },
    { id: '141', food: 'Salmon and Asparagus Parcels', sugar: '1.1g' },
    { id: '142', food: 'Mango Avocado Salsa', sugar: '6.3g' },
    { id: '143', food: 'Turkey and Vegetable Stuffed Peppers', sugar: '3.8g' },
    { id: '144', food: 'Roasted Red Pepper and Feta Cauliflower Bites', sugar: '2.8g' },
    { id: '145', food: 'Lemon Dill Grilled Shrimp', sugar: '0.7g' },
    { id: '146', food: 'Spicy Cabbage Slaw', sugar: '3.2g' },
    { id: '147', food: 'Cucumber Dill Greek Yogurt Dip', sugar: '2.4g' },
    { id: '148', food: 'Brussels Sprouts and Bacon Skewers', sugar: '2.1g' },
    { id: '149', food: 'Cauliflower and Kale Soup', sugar: '4.1g' },
    { id: '150', food: 'Zucchini Fritters', sugar: '2.5g' },
    { id: '151', food: 'Caprese Salad Skewers', sugar: '2.9g' },
    { id: '152', food: 'Green Bean Almondine', sugar: '2.3g' },
    { id: '153', food: 'Tomato Basil Mozzarella Stacks', sugar: '3.7g' },
    { id: '154', food: 'Lemon Garlic Roasted Brussels Sprouts', sugar: '3.5g' },
    { id: '155', food: 'Cabbage and Sausage Foil Packets', sugar: '2.8g' },
    { id: '156', food: 'Tuna and Avocado Lettuce Wraps', sugar: '1.6g' },
    { id: '157', food: 'Spinach and Feta Stuffed Mushrooms', sugar: '1.8g' },
    { id: '158', food: 'Mediterranean Chickpea Salad', sugar: '4.2g' },
    { id: '159', food: 'Garlic Parmesan Roasted Cauliflower', sugar: '3.3g' },
    { id: '160', food: 'Cucumber Avocado Roll-Ups', sugar: '1.9g' },
    { id: '161', food: 'Broccoli and Cheddar Stuffed Chicken Breast', sugar: '0.6g' },
    { id: '162', food: 'Cilantro Lime Shrimp Skewers', sugar: '0.9g' },
    { id: '163', food: 'Spaghetti Squash Alfredo', sugar: '2.7g' },
    { id: '164', food: 'Turkey and Kale Soup', sugar: '2.4g' },
    { id: '165', food: 'Grilled Eggplant with Tahini Sauce', sugar: '2.2g' },
    { id: '166', food: 'Cauliflower and Chickpea Curry', sugar: '4.7g' },
    { id: '167', food: 'Avocado Lime Crema', sugar: '1.3g' },
    { id: '168', food: 'Shrimp and Avocado Ceviche', sugar: '1.8g' },
    { id: '169', food: 'Lemon Herb Grilled Chicken', sugar: '0.5g' },
    { id: '170', food: 'Roasted Vegetable Quinoa Bowl', sugar: '3.4g' },
    { id: '171', food: 'Cabbage and Apple Slaw', sugar: '3.1g' },
    { id: '172', food: 'Mushroom Spinach Quiche', sugar: '1.7g' },
    { id: '173', food: 'Tomato Basil Zoodle Soup', sugar: '3.8g' },
    { id: '174', food: 'Cauliflower Tabbouleh', sugar: '3.6g' },
    { id: '175', food: 'Lemon Herb Baked Cod', sugar: '0.4g' },
    { id: '176', food: 'Cucumber Tomato Avocado Salad', sugar: '3.2g' },
    { id: '177', food: 'Chicken and Broccoli Casserole', sugar: '2.9g' },
    { id: '178', food: 'Avocado Lime Ranch Dressing', sugar: '1.4g' },
    { id: '179', food: 'Grilled Lemon Rosemary Chicken', sugar: '0.6g' },
    { id: '180', food: 'Zucchini and Tomato Gratin', sugar: '3.9g' },
    { id: '181', food: 'Spicy Roasted Chickpeas', sugar: '1.8g' },
    { id: '182', food: 'Eggplant and Tomato Stew', sugar: '4.2g' },
    { id: '183', food: 'Avocado Basil Pesto Pasta', sugar: '3.5g' },
    { id: '184', food: 'Cauliflower and Leek Soup', sugar: '3.0g' },
    { id: '185', food: 'Mediterranean Stuffed Peppers', sugar: '4.5g' },
    { id: '186', food: 'Lemon Garlic Roasted Shrimp', sugar: '0.8g' },
    { id: '187', food: 'Cabbage and Apple Stir-Fry', sugar: '3.4g' },
    { id: '188', food: 'Tuna Salad Lettuce Wraps', sugar: '1.2g' },
    { id: '189', food: 'Zucchini and Goat Cheese Frittata', sugar: '2.1g' },
    { id: '190', food: 'Grilled Portobello Mushrooms', sugar: '2.6g' },
    { id: '191', food: 'Cauliflower and Sweet Potato Mash', sugar: '3.7g' },
    { id: '192', food: 'Turkey and Zucchini Meatballs', sugar: '1.5g' },
    { id: '193', food: 'Avocado Lime Shrimp Salad', sugar: '1.7g' },
    { id: '194', food: 'Mushroom and Spinach Stuffed Chicken Breast', sugar: '0.7g' },
    { id: '195', food: 'Cucumber Avocado Gazpacho', sugar: '4.1g' },
    { id: '196', food: 'Salmon and Kale Salad', sugar: '1.9g' },
    { id: '197', food: 'Roasted Vegetable and Chickpea Wrap', sugar: '3.8g' },
    { id: '198', food: 'Lemon Herb Quinoa Pilaf', sugar: '2.3g' },
    { id: '199', food: 'Cauliflower and Spinach Curry', sugar: '3.2g' },
    { id: '200', food: 'Zucchini and Feta Fritters', sugar: '2.4g' }
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.row, isSelected(item.id) && styles.selectedRow]}
      onPress={() => toggleSelection(item.id)}
    >
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.food}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.sugar}</Text>
      </View>
    </TouchableOpacity>
  );

  const toggleSelection = (foodId) => {
    setSelectedMeals((prevSelectedMeals) => {
      if (prevSelectedMeals.includes(foodId)) {
        // Deselect the meal
        return prevSelectedMeals.filter((id) => id !== foodId);
      } else {
        // Select the meal
        return [...prevSelectedMeals, foodId];
      }
    });
  };

  const isSelected = (foodId) => selectedMeals.includes(foodId);

  const planMeals = () => {
    if (selectedMeals.length === 0) {
      Alert.alert('Meal Planning', 'Please select at least one meal to plan.');
    } else {
      // Calculate total sugar content
      const totalSugar = selectedMeals.reduce((total, mealId) => {
        const selectedMeal = data.find((item) => item.id === mealId);
        return total + parseFloat(selectedMeal.sugar);
      },1);

      // Set your desired sugar limit
      const sugarLimit = 20; // You can change this value based on your preference

      if (totalSugar > sugarLimit) {
        // Show a notification because sugar intake exceeded the limit
        Alert.alert(
          'MEAL PLANNING',
          `You have planned meals with a total sugar content of ${totalSugar}g, which exceeds the limit of ${sugarLimit}g. Be mindful of your sugar intake.`
        );
      } else {
        // Show a notification with the total sugar content
        Alert.alert('MEAL PLANNING', `You have planned meals with a total sugar content of ${totalSugar}g.`);
        // You can save the selected meals to your backend or perform other actions here
      }
    }
  };

  const clearSelection = () => {
    setSelectedMeals([]);
  };

  return (
    <View style={styles.container}>
      {/* Table header */}
      <View style={styles.header}>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Food</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Sugar in 100g</Text>
        </View>
      </View>

      {/* Table data */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Meal planning section */}
      <View style={styles.mealPlanningContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.planButton} onPress={planMeals}>
            <Text style={styles.buttonText}>PLAN MEALS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
            <Text style={styles.buttonText}>CLEAR SELECTION</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.mealPlanningTitle}>Selected Meals for Today:</Text>
        <FlatList
          data={data.filter((item) => isSelected(item.id))}
          renderItem={({ item }) => <Text>{item.food}</Text>}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#4c00b4',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#fff',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  selectedRow: {
    backgroundColor: '#a0a0a0', // Change the background color for selected rows
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  cellText: {
    color: 'white',
    fontSize: 16,
  },
  mealPlanningContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  mealPlanningTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  planButton: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  clearButton: {
    flex: 1,
    backgroundColor: 'red', // Change the color of the clear button as needed
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Food;
