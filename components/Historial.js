/*import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

function Historial() {
  // Simulando datos del historial de compras
  const [historialCompras, setHistorialCompras] = useState([
    { id: '1', fecha: '2024-09-01', total: 150 },
    { id: '2', fecha: '2024-09-08', total: 200 },
    { id: '3', fecha: '2024-09-15', total: 100 },
  ]);

  // Renderizar cada elemento del historial
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Fecha: {item.fecha}</Text>
      <Text>Total: ${item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Compras</Text>
      <FlatList
        data={historialCompras}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

// Estilos para la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
  },
});

export default Historial;*/

// Historial.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Historial = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedOrders = JSON.parse(await AsyncStorage.getItem('orders')) || [];
        setOrders(storedOrders);
      } catch (error) {
        console.error('Error al recuperar el historial:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <View>
      <Text>Historial de Compras</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View>
            {/* Render order details here */}
            <Text>Detalles del pedido</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Historial;

