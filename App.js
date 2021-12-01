import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {

  //Async storage
  const [textInputValue, settextInputValue] = useState('');
  const [value, setvalue] = useState('');
  const saveValue = () => {
    if (textInputValue) {
      AsyncStorage.setItem('key', textInputValue);
      settextInputValue('');
      alert('Data Saved')

    } else {
      alert('please fill data');
    }
  }
  const getValue = () => {
    AsyncStorage.getItem('key').then((value) => {
      setvalue(value);
    })
  }

  //Post data

  function componentDidMount() {

    try {
      fetch('https://webhook.site/c7e015b9-de09-4aa5-9504-21f050fbb353', {

        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value
        })
      });
    } catch (e) {
      console.log(e);
    }
  }

  //fetch data

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies)) 
      // release.push(json.movies[i].releaseYear)
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      console.log('result',data);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>

        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", paddingVertical: 20 }}>Async test</Text>

        <TextInput
          placeholder="Enter text here"
          value={textInputValue}
          onChangeText={(data) => settextInputValue(data)}
          style={{ textAlign: "center", height: 60, width: "100%", borderWidth: 1, borderColor: 'blue', fontSize: 22 }}>
        </TextInput>

        <TouchableOpacity
          onPress={saveValue}
          style={{ fontSize: 16, backgroundColor: "blue", padding: 5, marginTop: 40, minWidth: 250 }}
        >
          <Text style={{ padding: 5, fontSize: 22, color: 'white', textAlign: 'center' }}>Save data</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={getValue}
          style={{ fontSize: 16, backgroundColor: "blue", padding: 5, marginTop: 40, minWidth: 250 }}
        >
          <Text style={{ padding: 5, fontSize: 22, color: 'white', textAlign: 'center' }}>Get data</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", paddingVertical: 20 }}>{value}</Text>

        <TouchableOpacity
          onPress={componentDidMount}
          style={{ fontSize: 16, backgroundColor: "blue", padding: 5, marginTop: 20, minWidth: 250 }}
        >
          <Text style={{ padding: 5, fontSize: 22, color: 'white', textAlign: 'center' }}>Post data to API</Text>
        </TouchableOpacity>


        {/* fetch data */}

        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 20 }}>
          <View style={{ width: 160, height: 160, borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 15, backgroundColor: "white" }}>
            <View style={{ height: 100 }}>
              {isLoading ? <ActivityIndicator /> : (
                <FlatList
                  data={data}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <Text style={styles.bold}>{item.title}</Text>
                  )}
                />
              )}
            </View>
          </View>
          <View style={{ width: 160, height: 160, backgroundColor: "white", borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 15, }}>
            <View style={{ height: 100 }}>
              {isLoading ? <ActivityIndicator /> : (
                <FlatList
                  data={data}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <Text style={styles.bold}>{item.releaseYear}</Text>
                  )}
                />
              )}
            </View>
          </View>

        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
    fontSize: 18
  },
});

export default App;
