/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useRef, useLayoutEffect} from 'react';
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
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);

  const [height, setHeight] = useState(0);
  const myArrow1 = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const handlePress1 = () => {
    setActive1(prev => !prev);
    if (active1) {
      Animated.timing(myArrow1, {
        toValue: 0,
        duration: 250,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(myArrow1, {
        toValue: 1,
        duration: 250,
        easing: Easing.ease,
      }).start();
    }
  };
  const handlePress2 = () => {
    setActive2(prev => !prev);
  };
  const handlePress3 = () => {
    setActive3(prev => !prev);
  };

  const onLayout = useCallback(event => {
    event.persist();
    setHeight(_ => event.nativeEvent.layout.height);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container} onLayout={onLayout}>
        {/* 1 */}
        <View>
          <Animated.View
            style={{
              backgroundColor: myArrow1.interpolate({
                inputRange: [0, 1],
                outputRange: ['#eee', '#aaa'],
              }),
            }}>
            <Pressable
              onPress={handlePress1}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.accordion, {flex: 1}]}>Section 1</Text>
              <Animated.Text
                style={[
                  styles.accordion,
                  styles.accordionAfter,
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
            // style={[styles.panel, {maxHeight: active1 ? height : 0}]}>
            style={[
              styles.panel,
              {
                maxHeight: myArrow1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, height],
                }),
              },
            ]}>
            <Text style={styles.panelText}>
              1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do
            </Text>
            <Text
              style={[styles.panelText, {paddingTop: 20, paddingBottom: 20}]}>
              2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do
            </Text>
          </Animated.View>
        </View>
        {/* 2 */}
        <View>
          <View style={{backgroundColor: active2 ? '#ccc' : '#eee'}}>
            <Pressable
              onPress={handlePress2}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.accordion, {flex: 1}]}>Section 2</Text>
              <Text style={[styles.accordion, styles.accordionAfter]}>
                {active2 ? '▲' : '▼'}
              </Text>
            </Pressable>
          </View>
          <View style={[styles.panel, {maxHeight: active2 ? height : 0}]}>
            <Text style={styles.panelText}>
              1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do
            </Text>
            <Text style={[styles.panelText, {paddingTop: 20}]}>
              2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do
            </Text>
            <Text style={[styles.panelText, {paddingTop: 20}]}>
              3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do
            </Text>
            <Text
              style={[styles.panelText, {paddingTop: 20, paddingBottom: 20}]}>
              4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do
            </Text>
          </View>
        </View>
        {/* 3 */}
        <View>
          <View style={{backgroundColor: active3 ? '#ccc' : '#eee'}}>
            <Pressable
              onPress={handlePress3}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.accordion, {flex: 1}]}>Section 3</Text>
              <Text style={[styles.accordion, styles.accordionAfter]}>
                {active3 ? '▲' : '▼'}
              </Text>
            </Pressable>
          </View>
          <View style={[styles.panel, {maxHeight: active3 ? height : 0}]}>
            <Text style={styles.panelText}>
              1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do
            </Text>
            <Text style={[styles.panelText, {paddingTop: 20}]}>
              2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do
            </Text>
            <Text
              style={[styles.panelText, {paddingTop: 20, paddingBottom: 20}]}>
              3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  accordion: {
    fontSize: 20,
    color: '#444',
    padding: 18,
    textAlign: 'left',
  },
  accordionAfter: {
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
    overflow: 'hidden',
  },
  panelText: {
    fontSize: 18,
    lineHeight: 25,
  },
});
