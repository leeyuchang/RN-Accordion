/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect} from 'react';
import {LogBox, ScrollView} from 'react-native';
import MyAccordion from './MyAccordion';

const DATA = [
  [
    'food',
    [
      {
        _id: '60ab716b2add4e39fc8f2aac',
        name: 'Mud Pie Women Jogger',
        price: 10.11,
        count: 1,
        checked: false,
      },
      {
        _id: '60ab716b2add4e39fc8f2aad',
        name: 'Spectrum Jogger Yoga Pant',
        price: 39.9,
        count: 1,
        checked: false,
      },
    ],
  ],
  [
    'fruits',
    [
      {
        _id: '60ab716b2add4e39fc8f2aae',
        name: 'Studio Terry Relaxed-Fit Jogger',
        price: 19.9,
        count: 1,
        checked: false,
      },
      {
        _id: '60ab716b2add4e39fc8f2aaf',
        name: 'Knit Jogger Sleep Pant',
        price: 17.9,
        count: 1,
        checked: false,
      },
    ],
  ],
  [
    'meals',
    [
      {
        _id: '60ab716b2add4e39fc8f2ab0',
        name: 'High-Speed 8K HDMI Cable',
        price: 11.93,
        count: 1,
        checked: false,
      },
    ],
  ],
  [
    'meat',
    [
      {
        _id: '60ab716b2add4e39fc8f2ab1',
        name: 'Copper Fit Freedom Elbow Compression Sleeve',
        price: 9.88,
        count: 1,
        checked: false,
      },
    ],
  ],
  [
    'drink',
    [
      {
        _id: '60ab716b2add4e39fc8f2ab2',
        name: 'Under Armour Mens HeatGear 2.0 Leggings',
        price: 24.97,
        count: 1,
        checked: false,
      },
    ],
  ],
];

export default function App() {
  useLayoutEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  return (
    <ScrollView
      // scrollEnabled
      contentContainerStyle={{padding: 15}}>
      {DATA.map(data => (
        <MyAccordion data={Object.values(data)} key={data[0]} />
      ))}
    </ScrollView>
  );
}
