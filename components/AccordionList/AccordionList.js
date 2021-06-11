import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

const AccordionListItem = ({title, children}) => {
  const [open, setOpen] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState();

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  });

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    }
    setOpen(!open);
  };

  return (
    <View
      onLayout={event => setBodySectionHeight(event.nativeEvent.layout.height)}>
      <TouchableWithoutFeedback onPress={() => toggleListItem()}>
        <View style={styles.titleContainer}>
          <Text>{title}</Text>
          <Animated.View style={{transform: [{rotateZ: arrowAngle}]}}>
            <Text>{'▲'}</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.bodyBackground, {height: bodyHeight}]}>
        <View style={styles.bodyContainer}>{children}</View>
      </Animated.View>
    </View>
  );
};
export default AccordionListItem;

const styles = StyleSheet.create({
  bodyBackground: {
    backgroundColor: '#EFEFEF',
    overflow: 'hidden',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    paddingLeft: '1.5rem',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  bodyContainer: {
    padding: '1rem',
    paddingLeft: '1.5rem',
    position: 'absolute',
    bottom: 0,
  },
});
