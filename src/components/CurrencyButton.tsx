import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';

type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
  value: number;
  symbol: string;
}>;

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
  const [selected, setselected] = useState(false);
  const valRuppee = 1 / props.value;
  return (
    <View style={styles.buttonContainer}>
      <Text
        style={[
          styles.flag,
          selected == true ? styles.selectedColor : styles.unselectedColor,
          styles.textShadow
        ]}>
        {props.flag}
      </Text>
      <Text
        style={[
          styles.country,
          selected ? styles.selectedColor : styles.unselectedColor,
          styles.textShadow
        ]}>
        {props.name}
      </Text>
      <Text
        style={[
          styles.rate,
          selected ? styles.selectedColor : styles.unselectedColor,
          styles.textShadow
        ]}>
        {props.symbol}1 {'->'} ₹{valRuppee.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 40,
    marginBottom: 10,
  },
  country: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 10,
  },
  rate: {
    fontSize: 14,
    fontWeight: '900',
  },
  unselectedColor: {
    color: '#EFEFEF',
  },
  selectedColor: {
    color: '#161A30',
  },
  textShadow: {
    textShadowColor: '#000000',
    textShadowOffset:{
      'height' : 0.5,
      "width": 0.5
    },
    textShadowRadius: 10,
    
    
  }
});

export default CurrencyButton;
