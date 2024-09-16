// CuentaComp.js
import React, { useContext } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { CartContext } from '../CartContext';

export default function CuentaComp() {
    const { cartItems } = useContext(CartContext);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name} x {item.quantity}</Text>
                        <Text>${item.price * item.quantity}</Text>
                    </View>
                )}
            />
            <Text style={styles.total}>Total: ${total}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    // styles
});
