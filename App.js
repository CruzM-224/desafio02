import { Text, SafeAreaView, StyleSheet, View } from 'react-native';

// or any files within the Snack
import Comida from './components/Comida';
import Menu from './components/menu';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get a shareable url.
      </Text>
      <View style={styles.menu}>
        <Comida />
      </View>
      <Menu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 0,
  },
  paragraph: {
    flex: 2,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menu: {
    backgroundColor: '#ddd',
    margin: 0,
    height: 'auto',
    width: 'auto',
    flex: 12,
  }
});
