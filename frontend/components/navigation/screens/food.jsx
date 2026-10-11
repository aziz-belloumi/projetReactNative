import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Food = () => {
  const [searchQuery, setSearchQuery] = useState('');
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
  ];

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.foodName}>{item.food}</Text>
      <Text style={styles.sugarValue}>{item.sugar}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>A HELPFUL REFERENCE</Text>
          <Text style={styles.title}>Food guide</Text>
          <Text style={styles.subtitle}>Explore the sugar listed for each food per 100 g.</Text>
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
              <Text style={styles.clearSearch}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.tableHeading}>FOOD</Text>
          <Text style={styles.tableHeading}>SUGAR / 100 G</Text>
        </View>
        <FlatList
          data={data.filter((item) => item.food.toLowerCase().includes(searchQuery.trim().toLowerCase()))}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No foods match that search.</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8F3' },
  content: { flex: 1, width: '100%', maxWidth: 680, alignSelf: 'center', paddingHorizontal: 19, paddingTop: 20, paddingBottom: 12 },
  heading: { marginBottom: 15 },
  eyebrow: { color: '#789084', fontSize: 9, letterSpacing: 1.1, fontWeight: '800', marginBottom: 5 },
  title: { color: '#203D33', fontSize: 25, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: '#829087', fontSize: 11, marginTop: 4 },
  searchBar: { height: 45, backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#E9EDE7', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, marginBottom: 13 },
  searchInput: { flex: 1, marginLeft: 8, color: '#355547', fontSize: 13 },
  clearSearch: { color: '#39755D', fontSize: 11, fontWeight: '700', padding: 5 },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 13, paddingBottom: 8 },
  tableHeading: { color: '#8B9991', fontSize: 9, letterSpacing: 0.8, fontWeight: '800' },
  row: { minHeight: 49, backgroundColor: '#FFFFFF', borderRadius: 13, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#E9EDE7' },
  foodName: { color: '#385346', fontSize: 12, fontWeight: '600', flex: 1, paddingRight: 10 },
  sugarValue: { color: '#39755D', fontSize: 11, fontWeight: '800', minWidth: 50, textAlign: 'right' },
  emptyText: { color: '#829087', textAlign: 'center', marginTop: 30, fontSize: 13 },
});

export default Food;
