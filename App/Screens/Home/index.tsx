import { View, Text, Button } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const Home = () => {

  // Initial Animated Values
    const height = useSharedValue(0);
    const width = useSharedValue(0);
    const backgroundColor = useSharedValue('midnightblue');

    // Function to start the animation or change the Initial values  
    const startAnimations = () => {
        const randomHeight = Math.random() * 300;
        const randomWidth = Math.random() * 500;
        const randomBackgroundColor = '#' +Math.floor(Math.random()*16777215).toString(16);
        height.value = withTiming(randomHeight);
        width.value = withTiming(randomWidth);
        backgroundColor.value = withTiming(randomBackgroundColor, {duration: 2000})
    }

    // hooks use to return the Animated Style object
    const animatedStyle = useAnimatedStyle(() => ({
      width:width.value, 
      height:height.value, 
      backgroundColor: backgroundColor.value
    }))

  return (
    <View>
        <Button title='Animate' onPress={startAnimations} />
      <Animated.View style={animatedStyle} />
    </View>
  )
}

export default Home