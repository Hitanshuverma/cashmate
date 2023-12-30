import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {currencyByRuppee} from './const';
import CurrencyButton from './components/CurrencyButton';
import Snackbar from 'react-native-snackbar';
import {Currency} from '.';

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setresultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState(''); 

  const resetState = () =>{
    setTargetCurrency('');
    setresultValue('')
  }

  const buttonPressed = (targetvalue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'No Value Entered',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetvalue.value;
      const result = `${targetvalue.symbol} ${convertedValue.toFixed(2)}`;
      setresultValue(result);
      setTargetCurrency(targetvalue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid integer',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'#161A30'} />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.amtContainer}>
            <Text style={styles.amtText}>₹</Text>
            <TextInput
              maxLength={7}
              numberOfLines={2}
              value={inputValue}
              textAlign='center'
              onChangeText={(val)=> {
                console.log(val);
                setInputValue(val) 
                if(val == '')
                {
                  resetState();
                }
              }}
              keyboardType="number-pad"
              style={[styles.amtText, {flex: 0, backgroundColor:'transparent'}]}
            />
          </View>
          <Text style={styles.amtText}>{'->'}</Text>
          <View style={styles.amtContainer}>
            {resultValue && <Text style={styles.amtText}>{resultValue}</Text>}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={currencyByRuppee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected,
                ]}
                onPress={() => {
                  if(targetCurrency === item.name){
                    resetState();
                  } 
                  else
                    buttonPressed(item);
                }}>
                <CurrencyButton {...item}/>
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6dBe4',
  },
  topContainer: {
    paddingHorizontal:10,
    flexDirection: 'row',
    paddingBottom: 30,
    height: 200,
    // flex:1,
    backgroundColor: '#161A30',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amtContainer: {
    marginHorizontal: 5,
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'red',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent:'center'
  },
  amtText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#d6dBe4',
    // padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 15,
    marginVertical: 20,
    paddingHorizontal: 10,
    flex: 0,
    height: 180,
    width: 160,
    backgroundColor: '#31304D',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 10,
  },
  selected: {
    height: 180,
    width: 160,
    backgroundColor: '#F0EFE0',
    color: 'grey',
  },
});

export default App;
