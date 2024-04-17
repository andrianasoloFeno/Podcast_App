import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Import des icônes de la bibliothèque

function ListenNowScreen() {
  // Supposons que vous ayez un titre de podcast et une image (ou null si aucune image n'est disponible)
  const podcastTitle = "Titre du podcast";
  const podcastImage = null; // Remplacez null par l'URL de votre image si disponible

  return (
    <View style={styles.container}>
      

      {/* Titre du podcast */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{podcastTitle}</Text>
      </View>

      {/* Conteneur pour l'image ou l'icône de musique */}
      <View style={styles.imageContainer}>
        {podcastImage ? (
          <Image source={{ uri: podcastImage }} style={styles.image} />
        ) : (
          <View style={styles.iconContainer}>
            <Feather name="headphones" size={200} color="black" />
          </View>
        )}
      </View>

      {/* Conteneur pour les icônes de contrôle du lecteur audio */}
      <View style={styles.controlButtonsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Feather name="shuffle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Feather name="skip-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Feather name="play-circle" size={48} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Feather name="pause-circle" size={48} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Feather name="skip-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Feather name="repeat" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Utiliser 'space-between' pour espacer les éléments verticalement
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10, // Ajouter un padding en haut pour déplacer le titre vers le haut
    paddingBottom: 20, // Ajouter un padding en bas pour les icônes
  },
  titleContainer: {
    marginBottom: 20, // Pour ajouter de l'espace en bas du titre
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, // Pour un cercle si nécessaire
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  controlButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Pour ajouter de l'espace en bas des icônes
  },
  controlButton: {
    marginHorizontal: 10,
  },
});

export default ListenNowScreen;
