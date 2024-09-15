import { 
  Text, 
  View, 
  StyleSheet
} from 'react-native';


export default function Cuenta() {

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
            Cuenta
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    margin: 0,
    flexDirection: 'column',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  elementos: {
    flexDirection: 'column',
    marginHorizontal: 0,
    marginVertical: 5,
  },
  flatList: {
    width: '100%',
    marginBottom: 10,
    marginHorizontal: 0,
  },
  contTitulo: {
    marginBottom: 5,
  },
  titulo: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  informacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    height: 128,
    width: 170,
    borderRadius: 10,
  },
  precio: {
    fontSize: 16,
  },
  buttonsCantidad: {
    width: 30,
    height: 30,
    alignItems: 'center',
    borderRadius: 50,
  },
});
