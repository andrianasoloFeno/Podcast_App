import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Import de l'icône en forme de plus

function PodcastListScreen({ navigation }) {
  const podcasts = [
    { id: 1, title: 'Joe Rogan', description: 'Description du podcast 1', date: '10/04/2024', time: '14:00' },
    { id: 2, title: 'John Doe', description: 'Description du podcast 2', date: '11/04/2024', time: '15:30' },
    // Ajoutez d'autres podcasts ici
  ];

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={podcasts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PodcastDetails', { podcast: item })}>
            <View style={styles.listItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.date}>Date: {item.date}</Text>
              <Text style={styles.time}>Heure: {item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* Bouton avec l'icône en forme de plus */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('RecordAudio')} // naviguer vers l'écran d'enregistrement audio
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: 'blue',
  },
  time: {
    fontSize: 14,
    color: 'green',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PodcastListScreen;
