import React, {useEffect} from 'react';
import {Text, View, Button, FlatList, RefreshControl, ScrollView,SafeAreaView} from 'react-native';

type UserName = {
  id: string;
  type: string;
  setup: string;
  punchline: string;
};

function App(): JSX.Element {
  const [value, setValue] = React.useState<String>('Something');
  const [data, setData] = React.useState<UserName[] | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(
        'https://official-joke-api.appspot.com/random_joke',
      );
      const json = await response.json();
      setData([json]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const pressMe = () => {
    setValue('E');
  };

  return (
    <SafeAreaView>
      <ScrollView>
      <View>
      <Text>{value}</Text>
      {data ? (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              <Text style={{fontWeight: 'bold'}}>Type:</Text>{' '}
              <Text>{item.type}</Text>
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>Setup:</Text>{' '}
              <Text>{item.setup}</Text>
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>Punchline:</Text>{' '}
              <Text>{item.punchline}</Text>
            </Text>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text>Loading...</Text>
      )}

      <Button onPress={pressMe} title="Press Me" />
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}

export default App;
