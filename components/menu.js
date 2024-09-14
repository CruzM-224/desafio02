import { Text, View, StyleSheet, Pressable } from 'react-native';
import FoodSVG from '../assets/food';
import CupSVG from '../assets/cup';
import BillSVG from '../assets/bill';

//Cambios en react navigator TODO
function onePressMenu () {
  
}

export default function AssetExample() {
  return (
    <View style={styles.container}>
      <Pressable style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#ecf0f1',
          },
          styles.buttons,
        ]} 
        onPress={onePressMenu}>
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
        onPress={onePressMenu}>
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
        onPress={onePressMenu}>
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
