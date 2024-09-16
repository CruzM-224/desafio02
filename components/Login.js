import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text, StyleSheet } from 'react-native';

function Login({ navigation }) {
  // Estados para manejar el correo y la contraseña ingresados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Valores "correctos" para el correo y la contraseña (almacenados localmente)
  const storedEmail = 'usuarioDPS';
  const storedPassword = '123';

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    if (email === storedEmail && password === storedPassword) {
      // Redirigir al menú principal si la autenticación es correcta
      navigation.navigate('Menu');
    } else {
      // Mostrar una alerta si los datos son incorrectos
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagen decorativa */}
      <Image source={require('../assets/restaurante logo.jpg')} style={styles.image} />

      {/* Input para el correo */}
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
      />

      {/* Input para la contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón de inicio de sesión */}
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Login;
