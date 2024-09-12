import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function AssetExample() {
  
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
  const [datos, setDatos] = React.useState([]);


  // Función para llamar a la API

  async function llamadaAPI() {
    const response = await fetch("https://66e1111cc831c8811b53a929.mockapi.io/comida/platos")
    const datos = await response.json();
    
    setDatos(datos);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        {datos[0].name /* datos[0].name Si no lee el .name, probar con sustituirlo por un console.log y luego volver a ponelo */} 
      </Text>
      <Image style={styles.logo} source={require('../assets/snack-icon.png')} />
    </View>
  );
}

/*
async function llamadaAPI () {
	const datos = await fetch("https://66e1111cc831c8811b53a929.mockapi.io/comida/platos")
      .then(response => response.json())
	console.log(datos[0].name);
};

llamadaAPI();
*/

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
  logo: {
    height: 128,
    width: 128,
  }
});
