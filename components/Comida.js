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
  export default function Comida({ datos }) {
    
    //Llamada a la API
    
    useEffect(() => {
      obtencionComida({ datos })
      .then(() => {
        console.log("Datos de comida conseguidos");
      }
      ).catch((error) => {
        console.error('Error:', error);
      });
    }, []);
  
    // state con los datos
    const [comida, setComida] = useState([]);
  
    // state para verificar si se ha cargado la API
    const [isPending, setIsPending] = useState([]);
  
  
    // Función para llamar a la API
  
    async function obtencionComida({ datos }) {
      try{
        setIsPending(true);
        let datosComida = [];
      datos.forEach(element => {
        if (element.type === "comida") {
          datosComida.push(element);
        }
      });
        startTransition(() => { 
          setComida(datosComida);
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
        {comida ? (
          <>
            <FlatList
              style={styles.flatList}
              data={comida}
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