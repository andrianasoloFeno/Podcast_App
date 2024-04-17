import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

function PodcastDetailsScreen({ route }) {
  const { podcast } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: podcast.image }} style={styles.image} />
      <Text style={styles.name}>{podcast.title}</Text>
      <Text style={styles.title}>{podcast.snippet}</Text>
      <Text style={styles.description}>{podcast.link}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Lire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Télécharger</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200, // Ajustez la hauteur selon vos besoins
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PodcastDetailsScreen;
