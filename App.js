/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  LogBox,
} from 'react-native';

export default function App() {
  const [active1, setActive1] = useState(false);

  const [height, setHeight] = useState(0);
  const myArrow1 = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const handlePress1 = () => {
    setActive1(prev => !prev);
  };

  useEffect(() => {
    if (active1) {
      Animated.timing(myArrow1, {
        toValue: 1,
        duration: 250,
        delay: 150,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(myArrow1, {
        toValue: 0,
        duration: 250,
        delay: 150,
        easing: Easing.ease,
      }).start();
    }
  }, [active1, myArrow1]);

  const onLayout = useCallback(event => {
    event.persist();
    const {height: parentHeight} = event.nativeEvent.layout;
    setHeight(_ => parentHeight);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container} onLayout={onLayout}>
        <Animated.View
          style={{
            backgroundColor: myArrow1.interpolate({
              inputRange: [0, 1],
              outputRange: ['#eee', '#bbb'],
            }),
          }}>
          <Pressable
            onPress={handlePress1}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[styles.titleText, {flex: 1}]}>Section 1</Text>
            <Animated.Text
              style={[
                styles.titleText,
                styles.titleArrow,
                {
                  transform: [
                    {
                      rotate: myArrow1.interpolate({
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
              maxHeight: myArrow1.interpolate({
                inputRange: [0, 1],
                outputRange: [0, height],
              }),
            },
          ]}>
          <Animated.Text style={[styles.panelText, {opacity: myArrow1}]}>
            1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          </Animated.Text>
          <Animated.Text
            style={[styles.panelText, {paddingTop: 20, opacity: myArrow1}]}>
            2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          </Animated.Text>
          <Animated.Text
            style={[styles.panelText, {paddingTop: 20, opacity: myArrow1}]}>
            3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          </Animated.Text>
          <Animated.Text
            style={[
              styles.panelText,
              {paddingTop: 20, paddingBottom: 20, opacity: myArrow1},
            ]}>
            4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          </Animated.Text>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
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
});
