import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { Data } from './utils'
import Sound from 'react-native-sound';

const App: () => React$Node = () => {
  console.log({ Data })
  const playSound = (item) => {
    console.log(item)
    const { track } = item;
    const filename = `${track}.mp3`;
    console.log({ filename })
    Sound.setCategory('Playback');
    var mySound = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Error loading sound: ' + error);
        // return;
      }
      else {
        mySound.play(
          (success) => {
            if (success) {
              console.log('Sound playing')
            } else {
              console.log('Issue playing file');
            }
          }
        )
      }
    }
    );
    mySound.setVolume(0.9);
    mySound.release();
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => playSound(item)} style={styles.item}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View>
          <Image resizeMode="contain" source={item.image} style={{ width: 100, height: 100 }} />
        </View>
        <View style={{ justifyContent: "center" }} >
          <Text style={{ color: "white", fontSize: 34, fontWeight: "bold" }} >
            {item.name}
          </Text>
        </View>
      </View>
      {/* <Text style={styles.title} >{item.name}</Text> */}
    </TouchableOpacity >
  );
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={{ height: 60, backgroundColor: "#8f3102", justifyContent: "center", alignItems: "center" }} >
          <Text style={{ color: "white", fontSize: 34, fontWeight: "bold" }} >
            AVFK
          </Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View style={{}} >
            <FlatList
              data={Data}
              renderItem={renderItem}
              keyExtractor={item => `${item.id}`}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#f98b33",
  },
  item: {
    backgroundColor: '#e06200',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10
  },
  title: {
    fontSize: 32,
  },
});

export default App;
