import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../../src/context/AuthContext';
import { apiRequest } from '../../../src/services/api';

const Food = () => {
  const { token, user } = useAuth();
  const canLogMeals = user.role === 'patient';
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mealLogs, setMealLogs] = useState([]);
  const [mealType, setMealType] = useState('lunch');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
  const filteredFoods = data.filter((item) => item.food.toLowerCase().includes(searchQuery.trim().toLowerCase()));
  const selectedItems = data.filter((item) => isSelected(item.id));

  const loadMealLogs = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await apiRequest('/meals', { token });
      setMealLogs(response.meals);
    } catch (loadError) {
      setError(loadError.message || 'Meal history could not be loaded.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useFocusEffect(useCallback(() => {
    loadMealLogs();
  }, [loadMealLogs]));

  const saveMeal = async (mealType) => {
    setIsSaving(true);
    setError('');
    try {
      await apiRequest('/meals', {
        token,
        method: 'POST',
        body: {
          mealType,
          foods: selectedItems.map((item) => ({ name: item.food, sugarInfo: item.sugar })),
        },
      });
      setSelectedMeals([]);
      await loadMealLogs();
    } catch (saveError) {
      setError(saveError.message || 'The meal could not be saved.');
    } finally {
      setIsSaving(false);
    }
  };

  const planMeals = () => {
    if (selectedMeals.length === 0) {
      Alert.alert('Meal Planning', 'Please select at least one meal to plan.');
      return;
    }

    saveMeal(mealType);
  };

  const clearSelection = () => {
    setSelectedMeals([]);
  };

  const cycleMealType = () => {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    setMealType((current) => mealTypes[(mealTypes.indexOf(current) + 1) % mealTypes.length]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          style={styles.foodList}
          data={filteredFoods}
          renderItem={({ item }) => {
            const selected = isSelected(item.id);
            return (
              <TouchableOpacity
                style={[styles.row, selected && styles.selectedRow]}
                onPress={() => toggleSelection(item.id)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityState={{ selected }}
              >
                <View style={styles.foodNameGroup}>
                  <Ionicons
                    name={selected ? 'checkmark-circle' : 'ellipse-outline'}
                    size={19}
                    color={selected ? '#39755D' : '#C4CDC6'}
                  />
                  <Text style={styles.foodName}>{item.food}</Text>
                </View>
                <Text style={styles.sugarValue}>{item.sugar}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={(
            <View>
              <View style={styles.heading}>
                <View>
                  <Text style={styles.eyebrow}>NOURISH YOURSELF</Text>
                  <Text style={styles.title}>Food guide</Text>
                  <Text style={styles.subtitle}>Choose an item to add it to your meal plan.</Text>
                </View>
                <View style={styles.countBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#39755D" />
                  <Text style={styles.countText}>{selectedMeals.length}</Text>
                </View>
              </View>

              <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={18} color="#8A9A90" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search foods..."
                  placeholderTextColor="#9AA69F"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  accessibilityLabel="Search foods"
                />
                {!!searchQuery && (
                  <TouchableOpacity onPress={() => setSearchQuery('')} accessibilityLabel="Clear search">
                    <Ionicons name="close-circle" size={18} color="#9AA69F" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.tableHeader}>
                <Text style={styles.tableHeadingFood}>FOOD</Text>
                <Text style={styles.tableHeadingSugar}>SUGAR / 100 G</Text>
              </View>
            </View>
          )}
          ListFooterComponent={null}
          ListEmptyComponent={<Text style={styles.emptyText}>No foods match that search.</Text>}
        />
        <View style={styles.mealPlanningContainer}>
          <View style={styles.mealSummary}>
            <View style={styles.mealSummaryCopy}>
              <Text style={styles.mealPlanningTitle}>{canLogMeals ? 'Your meal selection' : 'Meal ideas'}</Text>
              <Text style={styles.mealSummaryCaption}>
                {selectedItems.length ? selectedItems.slice(0, 2).map((item) => item.food).join(', ') : 'Tap foods above to add them here.'}
                {selectedItems.length > 2 ? ` +${selectedItems.length - 2} more` : ''}
              </Text>
            </View>
            <View style={styles.sugarTotal}>
              <Text style={styles.sugarTotalValue}>{selectedMeals.length}</Text>
              <Text style={styles.sugarTotalLabel}>selected</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {canLogMeals && (
              <>
                <TouchableOpacity style={styles.mealTypeButton} onPress={cycleMealType} accessibilityRole="button" accessibilityLabel={`Meal type ${mealType}, tap to change`}>
                  <Text style={styles.mealTypeText}>{mealType}</Text>
                  <Ionicons name="chevron-down" size={14} color="#39755D" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.planButton, isSaving && styles.disabledButton]} onPress={planMeals} activeOpacity={0.8} disabled={isSaving}>
                  {isSaving ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Save meal</Text>}
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.clearButton} onPress={clearSelection} activeOpacity={0.8}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.disclaimer}>Sugar values are listed per 100 g and are for reference only—not medical advice.</Text>
        </View>
        {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
        <View style={styles.historyHeading}>
          <Text style={styles.historyTitle}>{canLogMeals ? 'Recent meal history' : 'Shared meal history'}</Text>
          <TouchableOpacity onPress={loadMealLogs} accessibilityRole="button" accessibilityLabel="Refresh meal history">
            <Ionicons name="refresh-outline" size={18} color="#39755D" />
          </TouchableOpacity>
        </View>
        {isLoading ? <ActivityIndicator color="#39755D" style={styles.loader} /> : mealLogs.slice(0, 1).map((meal) => (
          <View key={meal.id} style={styles.historyCard}>
            <View style={styles.historyIcon}><Ionicons name="restaurant-outline" size={17} color="#39755D" /></View>
            <View style={styles.historyCopy}>
              <Text style={styles.historyMealType}>{meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}</Text>
              <Text style={styles.historyFoods}>{meal.foods.map((food) => food.name).join(', ')}</Text>
              <Text style={styles.historyDate}>{new Date(meal.loggedAt).toLocaleString()}</Text>
            </View>
          </View>
        ))}
        {!isLoading && mealLogs.length === 0 && <Text style={styles.historyEmpty}>Saved meals will appear here.</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8F3' },
  content: { flex: 1, width: '100%', maxWidth: 680, alignSelf: 'center', paddingHorizontal: 19, paddingTop: 18, paddingBottom: 11 },
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
  eyebrow: { color: '#789084', fontSize: 9, letterSpacing: 1.1, fontWeight: '800', marginBottom: 5 },
  title: { color: '#203D33', fontSize: 25, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: '#829087', fontSize: 11, marginTop: 4 },
  countBadge: { backgroundColor: '#E2F0E8', borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 10, gap: 5 },
  countText: { color: '#39755D', fontWeight: '800', fontSize: 12 },
  searchBar: { height: 45, backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#E9EDE7', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, marginBottom: 13 },
  searchInput: { flex: 1, marginLeft: 8, color: '#355547', fontSize: 13 },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 13, paddingBottom: 8 },
  tableHeadingFood: { color: '#8B9991', fontSize: 9, letterSpacing: 1, fontWeight: '800' },
  tableHeadingSugar: { color: '#8B9991', fontSize: 9, letterSpacing: 0.7, fontWeight: '800' },
  foodList: { flex: 1 },
  row: { minHeight: 49, backgroundColor: '#FFFFFF', borderRadius: 13, paddingHorizontal: 12, paddingVertical: 9, marginBottom: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#E9EDE7' },
  selectedRow: { backgroundColor: '#EAF4ED', borderColor: '#C9E0D1' },
  foodNameGroup: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 10 },
  foodName: { color: '#385346', fontSize: 12, fontWeight: '600', marginLeft: 9, flexShrink: 1 },
  sugarValue: { color: '#39755D', fontSize: 11, fontWeight: '800', minWidth: 42, textAlign: 'right' },
  emptyText: { color: '#829087', textAlign: 'center', marginTop: 30, fontSize: 13 },
  mealPlanningContainer: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 13, marginTop: 5, borderWidth: 1, borderColor: '#E9EDE7' },
  mealSummary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 },
  mealSummaryCopy: { flex: 1, paddingRight: 10 },
  mealPlanningTitle: { color: '#29483B', fontSize: 13, fontWeight: '800' },
  mealSummaryCaption: { color: '#829087', fontSize: 10, marginTop: 4 },
  sugarTotal: { alignItems: 'flex-end' },
  sugarTotalValue: { color: '#39755D', fontSize: 16, fontWeight: '800' },
  sugarTotalLabel: { color: '#91A097', fontSize: 9, marginTop: 1 },
  buttonContainer: { flexDirection: 'row', gap: 9 },
  mealTypeButton: { minWidth: 96, flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 9, borderRadius: 12, backgroundColor: '#E2F0E8' },
  mealTypeText: { color: '#39755D', fontSize: 11, fontWeight: '800', textTransform: 'capitalize' },
  planButton: { flex: 1, backgroundColor: '#2D6A55', paddingVertical: 12, borderRadius: 12 },
  clearButton: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12, backgroundColor: '#F2F4EF', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12, textAlign: 'center' },
  clearButtonText: { color: '#64766C', fontWeight: '700', fontSize: 12 },
  disabledButton: { opacity: 0.7 },
  disclaimer: { color: '#91A097', fontSize: 9, lineHeight: 14, marginTop: 9 },
  error: { color: '#A6463A', backgroundColor: '#FBEAE5', borderRadius: 11, padding: 10, lineHeight: 17, fontSize: 11, marginTop: 8 },
  historyHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, marginBottom: 8 },
  historyTitle: { color: '#29483B', fontSize: 14, fontWeight: '800' },
  loader: { margin: 12 },
  historyCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E9EDE7', borderRadius: 13, padding: 10, marginBottom: 7 },
  historyIcon: { height: 34, width: 34, borderRadius: 11, backgroundColor: '#E2F0E8', alignItems: 'center', justifyContent: 'center' },
  historyCopy: { flex: 1, marginLeft: 9 },
  historyMealType: { color: '#355547', fontSize: 11, fontWeight: '800' },
  historyFoods: { color: '#536F61', fontSize: 10, marginTop: 3 },
  historyDate: { color: '#91A097', fontSize: 9, marginTop: 3 },
  historyEmpty: { color: '#829087', fontSize: 11, paddingBottom: 8 },
});

export default Food;
