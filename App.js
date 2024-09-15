import React, { 
  startTransition, 
  useEffect, 
  useState
} from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';

// or any files within the Snack
import Comida from './components/Comida';
import Menu from './components/menu';
import Bebidas from './components/Bebidas';
import CuentaComp from './components/Cuenta';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  //Llamada a la API
  
  useEffect(() => {
    llamadaAPI()
    .then(() => {
      console.log("Datos conseguidos");
    }
    ).catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  // state con los datos
  const [datos, setDatos] = useState([]);

  // state para verificar si se ha cargado la API
  const [isPending, setIsPending] = useState([]);


  // Función para llamar a la API

  async function llamadaAPI() {
    try{
      setIsPending(true);
      const response = await fetch("https://66e1111cc831c8811b53a929.mockapi.io/comida/menu")
      const datos = await response.json();
      startTransition(() => { 
        setDatos(datos);
        setIsPending(false); 
      });
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  if (isPending) {
    return <Text style={styles.paragraph}>Cargando...</Text>
  }
  
  const Stack = createNativeStackNavigator();
  
  function HomeScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.paragraph}>
          Bienvenido a El Oaxaqueno.
          Selecciona lo que deseas ordenar.
        </Text>
        <View style={styles.menu}>
          <Comida
            datos={datos}
          />
        </View>
        <Menu
          routeHome="Menu"
          routeBev="Bebidas"
          routeBill="Cuenta"
        />
      </SafeAreaView>
    );
  }

  function Bebida() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.paragraph}>
          Bebidas
        </Text>
        <View style={styles.menu}>
          <Bebidas 
            datos={datos}
          />
        </View>
        <Menu
          routeHome="Menu"
          routeBev="Bebidas"
          routeBill="Cuenta"
        />
      </SafeAreaView>
    );
  }
  function Cuenta() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.paragraph}>
          Cuenta
        </Text>
        <View style={styles.menu}>
          <CuentaComp />
        </View>
        <Menu
          routeHome="Menu"
          routeBev="Bebidas"
          routeBill="Cuenta"
        />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" 
          component={HomeScreen}
          options={{ title: 'El Oaxaqueno' }}
        />
        <Stack.Screen name="Bebidas" component={Bebida} />
        <Stack.Screen name="Cuenta" component={Cuenta} />
      </Stack.Navigator>
    </NavigationContainer>
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
    flex: 1,
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
    flex: 11,
  }
});
