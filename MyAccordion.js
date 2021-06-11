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
            inputRange: [0, 0.5, 1],
            outputRange: ['#eee', '#ddd', '#bbb'],
          }),
        }}>
        <Pressable
          onPress={() => handlePress()}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Animated.Text
            style={[
              styles.titleText,
              {
                flex: 1,
                color: myArrow.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['#222', '#fff'],
                }),
              },
            ]}>
            {myDataRef.current.category}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.titleText,
              styles.titleArrow,
              {
                transform: [
                  {
                    rotate: myArrow.interpolate({
                      inputRange: [0, 1],
                      // outputRange: ['180deg', '90deg', '0deg'],
                      outputRange: ['0rad', `${Math.PI}rad`],
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
        <View
          style={[
            styles.panelText,
            {
              width: '100%',
            },
          ]}>
          {myDataRef.current.items.map(item => (
            <Item item={item} key={item._id} />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const Item = ({item}) => {
  return (
    <View
      style={{
        paddingVertical: 5,
        // borderWidth: 1,
        flexDirection: 'column',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'column', flex: 0.89}}>
          <Text style={[styles.title]}>{item.name}</Text>
          <Text style={[styles.price]}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={{flex: 0.11}}>
          <Text
            style={{
              fontSize: 10,
              borderWidth: 0.3,
              overflow: 'hidden',
              borderRadius: 5,
              textAlign: 'center',
              textAlignVertical: 'center',
              paddingHorizontal: 6,
            }}
            onPress={() => {
              console.log('hell');
            }}>
            Add to{'\n'}Cart
          </Text>
        </View>
      </View>
    </View>
  );
};

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
    paddingLeft: 18,
    backgroundColor: 'white',
  },
  panelText: {
    fontSize: 14,
  },
  separator: {
    borderWidth: 1,
    borderColor: '#222',
  },
  contentContainer: {
    flex: 1,
  },
  // =========== WORKING ON IT
  title: {
    // color: AppStyles.colorSet[colorScheme].mainTextColor,
    // fontFamily: AppStyles.fontFamily.semiBoldFont,
    // fontSize: AppStyles.fontSet.middle,
    // paddingLeft: 10,
    textAlignVertical: 'bottom',
  },
  price: {
    // color: AppStyles.colorSet[colorScheme].mainTextColor,
    // fontFamily: AppStyles.fontFamily.boldFont,
    // fontSize: AppStyles.fontSet.middle,
    // paddingLeft: 10,
    textAlignVertical: 'top',
  },
  selectCart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.2,
    borderRadius: 10,
    color: '#888',
  },
  selectCartText: {
    fontSize: 14,
    // color: AppStyles.colorSet[colorScheme].mainTextColor,
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    height: 75,
    textAlign: 'center',
    textAlignVertical: 'center',
    // marginRight: 10,
  },
});
