import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import FoodSVG from '../assets/food';
import CupSVG from '../assets/cup';
import BillSVG from '../assets/bill';


import { useNavigation } from '@react-navigation/native';

export default function Menu({ routeHome, routeBev, routeBill }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#ecf0f1',
          },
          styles.buttons,
        ]} 
        onPress={() => navigation.navigate(routeHome)}>
        <Text style={styles.menuElement}>
          <FoodSVG />
        </Text>
      </Pressable>
      <Pressable style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#ecf0f1',
          },
          styles.buttons,
        ]} 
        onPress={() => navigation.navigate(routeBev)}>
        <Text style={styles.menuElement}>
          <CupSVG />
        </Text>
      </Pressable>
      <Pressable style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#ecf0f1',
          },
          styles.buttons,
        ]} 
        onPress={() => navigation.navigate(routeBill)}>
        <Text style={styles.menuElement}>
          <BillSVG />
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 0,
    flexDirection: 'row',
    flex: 1,
    marginVertical: 0,
  },
  buttons: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 0,
    bottom: 0,
    width: 'auto',
    flex: 1,
    height: 50
  },
  menuElement: {
    marginVertical: 'auto'
  }
});
