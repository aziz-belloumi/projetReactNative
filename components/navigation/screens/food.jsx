import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Food = () => {
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
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.food}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.sugar}</Text>
      </View>
    </View>
  );

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
});

export default Food;



