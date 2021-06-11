/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MyAccordion(props) {
  const [expand, setExpand] = useState(false);
  const [maxHight, setMaxHight] = useState(0);
  const myArrow = useRef(new Animated.Value(0)).current;

  const myDataRef = useRef({
    category: props.data[0],
    items: props.data[1],
  });

  useEffect(() => {
    if (expand) {
      Animated.timing(myArrow, {
        toValue: 1,
        duration: 250,
        delay: 150,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    } else {
      Animated.timing(myArrow, {
        toValue: 0,
        duration: 250,
        delay: 150,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    }
  }, [expand, myArrow]);

  const handlePress = useCallback(() => setExpand(prev => !prev), []);

  const onLayout = useCallback(event => {
    event.persist();
    const {height: parentHeight} = event.nativeEvent.layout;
    setMaxHight(_ => parentHeight);
  }, []);

  return (
    <View onLayout={onLayout}>
      <Animated.View
        style={{
          backgroundColor: myArrow.interpolate({
            inputRange: [0, 1],
            outputRange: ['#eee', '#bbb'],
          }),
        }}>
        <Pressable
          onPress={() => handlePress()}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={[styles.titleText, {flex: 1}]}>
            {myDataRef.current.category}
          </Text>
          <Animated.Text
            style={[
              styles.titleText,
              styles.titleArrow,
              {
                transform: [
                  {
                    rotate: myArrow.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: ['180deg', '90deg', '0deg'],
                    }),
                  },
                ],
              },
            ]}>
            {'▲'}
          </Animated.Text>
        </Pressable>
      </Animated.View>
      <Animated.View
        style={[
          styles.panel,
          {
            maxHeight: myArrow.interpolate({
              inputRange: [0, 1],
              outputRange: [0, maxHight],
            }),
          },
        ]}>
        <Animated.Text style={[styles.panelText, {opacity: myArrow}]}>
          {myDataRef.current.items.map(item => item.name)}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    color: '#444',
    padding: 18,
    textAlign: 'left',
  },
  titleArrow: {
    color: '#777',
    fontWeight: 'bold',
    marginRight: 5,
  },
  active: {
    backgroundColor: '#ccc',
  },
  panel: {
    paddingHorizontal: 18,
    backgroundColor: 'white',
  },
  panelText: {
    fontSize: 18,
    lineHeight: 25,
  },
  separator: {
    borderWidth: 1,
    borderColor: '#222',
  },
});
