import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';

function RecordAudioScreen() {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // Déplacer la définition de getAudioLevel à l'extérieur du useEffect
  const getAudioLevel = async () => {
    try {
      if (recording) {
        const status = await recording.getStatusAsync();
        const audioLevel = status.isRecording ? status.metering : 0;
        setAudioLevel(audioLevel);
      }
    } catch (error) {
      console.error('Failed to get audio level', error);
    }
  };

  useEffect(() => {
    let recordingInterval;

    const startRecording = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access audio is required.');
          return;
        }
    
        // Vérifier si l'enregistrement est déjà défini
        if (!recording) {
          const newRecording = new Audio.Recording();
          await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          setRecording(newRecording);
        }
    
        setIsRecording(true);
        setTimer(0);
    
        recordingInterval = setInterval(() => {
          if (!isPaused) {
            setTimer(prevTimer => prevTimer + 1);
          }
          getAudioLevel();
        }, 1000);
    
        setTimerInterval(recordingInterval);
    
        // Vérifier si l'enregistrement est défini avant de démarrer
        if (recording) {
          await recording.startAsync();
        }
      } catch (error) {
        console.error('Failed to start recording', error);
      }
    };

    if (isRecording && !isPaused) {
      startRecording();
    }

    return () => {
      if (recording && !recording.isUnloaded) {
        clearInterval(timerInterval); 
        stopRecording();
      }
    };
  }, [isRecording, isPaused]);

  const toggleRecording = async () => {
    if (!isRecording) {
      // Start recording if not already recording
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access audio is required.');
          return;
        }
    
        // Vérifier si l'enregistrement est déjà défini
        if (!recording) {
          const newRecording = new Audio.Recording();
          await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          setRecording(newRecording);
        }
    
        setIsRecording(true);
        setTimer(0);
    
        const recordingInterval = setInterval(() => {
          if (!isPaused) {
            setTimer(prevTimer => prevTimer + 1);
          }
          getAudioLevel();
        }, 1000);
    
        setTimerInterval(recordingInterval);
    
        // Vérifier si l'enregistrement est défini avant de démarrer
        if (recording) {
          await recording.startAsync();
        }
      } catch (error) {
        console.error('Failed to start recording', error);
      }
    } else {
      // Stop recording if recording
      setIsRecording(false);
      setIsPaused(false); // Réinitialiser l'état de la pause
      await recording.stopAndUnloadAsync();
    }
  };
  
  // Définition de la fonction togglePause
  const togglePause = () => {
    if (isPaused) {
      // Reprendre l'enregistrement si en pause
      setIsPaused(false);
      if (recording) {
        recording.startAsync();
      }
    } else {
      // Mettre en pause l'enregistrement si en train d'enregistrer
      setIsPaused(true);
      if (recording) {
        recording.pauseAsync();
      }
    }
  };

  // Fonction pour arrêter l'enregistrement
  const stopRecording = async () => {
    try {
      if (recording && !recording.isUnloaded) {
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
        setRecording(undefined);
        clearInterval(timerInterval);
        setTimer(0);
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(timer)}</Text>
      <View style={styles.audioVisualizer}>
        {Array.from({ length: 10 }).map((_, index) => (
          <View key={index} style={[styles.bar, { height: `${audioLevel * 100}%` }]} />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleRecording}>
          <Feather name="mic" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={stopRecording} disabled={!isRecording}>
          <Feather name="stop-circle" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={togglePause} 
          disabled={!isRecording}
        >
          <Feather 
            name={isPaused ? "play" : "pause"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timer: {
    fontSize: 24,
    marginBottom: 10,
  },
  audioVisualizer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bar: {
    width: 5,
    backgroundColor: 'green',
    marginHorizontal: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

export default RecordAudioScreen;
