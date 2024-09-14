import React, { 
  startTransition, 
  useEffect, 
  useState
} from 'react';

import { 
  Text, 
  View, 
  StyleSheet,
  FlatList
} from 'react-native';

import Elementos from './Elementos';


export default function Comida() {
  
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
      const response = await fetch("https://66e1111cc831c8811b53a929.mockapi.io/comida/platos")
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

  return (
    <View style={styles.container}>
      {datos ? (
        <>
          <Text style={styles.paragraph}>
            Comida
          </Text>
          <FlatList
            style={styles.flatList}
            data={datos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Elementos item={item} />
            )}
          />
        </>
      ) : (
        <Text style={styles.paragraph}>No hay datos</Text>
      )}
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
