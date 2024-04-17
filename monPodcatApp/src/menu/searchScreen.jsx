import React, { useState } from 'react';
import { Box, VStack, Grid } from '@chakra-ui/react';
import { TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = () => {
    const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyCTwN-BuM_bDyYLzGhRZs-CbmP8uvuFnxE&cx=9335cfbbb502a48a5&q=${searchQuery}&fileType=mp3`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const items = data.items || [];
        setSearchResults(items);
      })
      .catch(error => {
        console.error('Erreur lors de la requête de recherche :', error);
      });
  };
  
  const navigateToPodcastDetails = (podcast) => {
    navigation.navigate('PodcastDetails', { podcast });
  };

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Rechercher des podcasts"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
      />
      <Box>
        <FlashList
          contentContainerStyle={styles.list}
          data={searchResults}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToPodcastDetails(item)}>
              <Grid
                templateColumns="auto 1fr" 
                alignItems="center" 
                gap={4} 
                mb={4}
              >
                {item.pagemap.cse_image ? (
                  <Image source={{ uri: item.pagemap.cse_image[0].src }} style={styles.image} />
                ) : (
                  <View style={styles.placeholderImage} />
                )}
                <VStack align="start" spacing={2}> 
                  <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                  <Text fontWeight="bold" fontSize="sm">{item.snippet}</Text>
                  <Text fontSize="sm" color="grey">
                    {item.link}
                  </Text>
                </VStack>
              </Grid>
            </TouchableOpacity>
          )}
        />
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(231, 222, 211, 0.87)',
    borderRadius: 20,
    height: 50,
    padding: 10,
    margin: 15,
  },
  list: {
    marginTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, 
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white', // Cercle blanc en tant qu'image de remplacement
  },
});

export default SearchScreen;
