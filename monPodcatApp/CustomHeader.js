import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomHeader = ({ navigation, activeScreen }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Text style={[styles.headerText, activeScreen === 'Search' && styles.active]}>Recherche</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PodcastList')}>
        <Text style={[styles.headerText, activeScreen === 'PodcastList' && styles.active]}>Mes Podcasts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ListenNow')}>
        <Text style={[styles.headerText, activeScreen === 'ListenNow' && styles.active]}>Ecouter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#007FFF', // Couleur de fond de l'en-tête
    marginTop: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Couleur du texte par défaut
  },
  active: {
    textDecorationLine: 'underline', // Soulignement
    color: '#ffffff', // Couleur blanche
  },
});

export default CustomHeader;
