import React, { 
  startTransition, 
  useEffect, 
  useState
} from 'react';

import { 
  Text, 
  View, 
  StyleSheet,
  FlatList,
  Button,
  Modal,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cuenta( {datos, cantidad, setCantidad} ) {

  useEffect(() => {
    obtencionMontos({ datos })
    .then(() => {
      console.log("Datos cuenta conseguidos");
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [datos, cantidad]);

  const [montos, setMontos] = useState(Array(datos.length).fill(0));
  const [compras, setCompras] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [total, setTotal] = useState(0);
  const [datosFactura, setDatosFactura] = useState({
    Total: 0,
    cosa: []
  });
  const [arregloDatosFactura, setArregloDatosFactura] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const saveComprasToStorage = async () => {
    try {
      if (datosFactura.Total > 0) {
        const jsonValue = await AsyncStorage.getItem('@compras_key');
        let datosFacturaTemp = jsonValue != null ? JSON.parse(jsonValue) : [];

        datosFacturaTemp.push(datosFactura);

        setArregloDatosFactura(datosFacturaTemp);

        const jsonValueUpdated = JSON.stringify(datosFacturaTemp);
        await AsyncStorage.setItem('@compras_key', jsonValueUpdated);
        Alert.alert('Compra realizada', 'Las compras han sido guardadas exitosamente.');
        setCantidad(Array(datos.length).fill(0));
        setDatosFactura({
          Total: 0,
          cosa: []
        });
      } else {
        Alert.alert('Error', 'No hay datos válidos para guardar.');
      }
    } catch (e) {
      console.error('Error al guardar las compras:', e);
    }
  };

  const getComprasFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@compras_key');
      const comprasGuardadas = jsonValue != null ? JSON.parse(jsonValue) : [];
      console.log('Compras guardadas:', comprasGuardadas); // Verifica la estructura de los datos
      setArregloDatosFactura(comprasGuardadas);
      setModalVisible(true);
    } catch (e) {
      console.error('Error al obtener las compras:', e);
    }
  };
  

  function botonComprar() {
    if(total > 0) {
      return (
        <View style={styles.botones}>
          <Button
            onPress={() => {
              saveComprasToStorage();
            }}
            title="Comprar"
            color="#A9E19E"
          />
          <Button
            onPress={() => {
              getComprasFromStorage();
            }}
            title="Registro"
            color="#515151"
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.titulo}>Carrito vacío</Text>
          <Button
            onPress={() => {
              getComprasFromStorage();
            }}
            title="Registro"
            color="#515151"
          />
        </View>
      );
    }
  }

  async function obtencionMontos({ datos }) {
    try {
      setIsPending(true);
      let datosMontos = montos.slice();
      let datosCompras = [];
      let cuentaTotal = 0;

      datos.forEach(element => {
        if (cantidad[element.id - 1] > 0) {

          setDatosFactura(prevDatosFactura => {
            let nuevoTotal = cuentaTotal;
            let nuevaCosa = prevDatosFactura.cosa.concat({
              nombre: element.name,
              cantidad: cantidad[element.id -1],
              precio: element.price,
              total: element.price * cantidad[element.id - 1]
            });

            return {
              Total: nuevoTotal,
              cosa: nuevaCosa
            };
          });

          datosMontos[element.id - 1] = element.price * cantidad[element.id - 1];
          cuentaTotal += datosMontos[element.id - 1];
          datosCompras.push(element);
        }
      });

      startTransition(() => { 
        setMontos(datosMontos);
        setCompras(datosCompras);
        setTotal(cuentaTotal);
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
      {compras.length > 0 ? (
        <FlatList
          style={styles.flatList}
          data={compras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.elementos}>
              <View style={styles.informacion}>
                <Text style={styles.titulo}>{item.name}</Text>
                <Text style={styles.precio}>${item.price}</Text>
                <Text style={styles.precio}>x{cantidad[item.id - 1]}</Text>
                <Text style={styles.precio}>${montos[item.id - 1].toFixed(2)}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.paragraph}>No hay datos</Text>
      )}
      <View style={styles.contTitulo}>
        <Text style={styles.titulo}>Total: ${total.toFixed(2)}</Text>
      </View>
      {botonComprar()}

      {/* Modal para mostrar historial de compras */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Historial de compras</Text>
            <FlatList
              data={arregloDatosFactura}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.modalItem}>
                  <Text style={styles.modalTitulo}>Compra #{index + 1}</Text>
                  <FlatList
                    data={item.cosa || []}
                    keyExtractor={(subItem, subIndex) => subIndex.toString()}
                    renderItem={({ item: subItem }) => (
                      <View style={styles.modalSubItem}>
                        <Text style={styles.modalTexto}>
                          {subItem.nombre ? subItem.nombre : 'Nombre no disponible'} | {subItem.cantidad ? subItem.cantidad : 'Cantidad no disponible'} x 
                          ${subItem.precio ? subItem.precio.toFixed(2) : 'Precio no disponible'} = 
                          ${subItem.total ? subItem.total.toFixed(2) : 'Total no disponible'}
                        </Text>
                      </View>
                    )}
                  />
                  <Text style={styles.modalTotal}>
                    Total: ${item.Total ? item.Total.toFixed(2) : 'Total no disponible'}
                  </Text>
                </View>
              )}
            />

            <Button
              title="Cerrar"
              onPress={() => setModalVisible(!modalVisible)}
              color="#A9E19E"
            />
          </View>
        </View>
      </Modal>

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
    marginBottom: 50,
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
    marginBottom: 30,
    marginHorizontal: 0,
    marginTop: -15,
  },
  contTitulo: {
    marginTop: -35,
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
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalItem: {
    marginBottom: 20,
  },
  modalSubItem: {
    marginVertical: 5,
  },
  modalTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTexto: {
    fontSize: 14,
  },
  modalTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  }
});
