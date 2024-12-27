import { View, Text } from 'react-native'
import React from 'react'
import Animated, { FadeInLeft } from 'react-native-reanimated';

const Details = ({route}: any) => {
  const {item} = route.params;
  return (
    <View>
      {/* Layout Animations Entering and Exiting   */}
      {/*  For More check the docs here https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/entering-exiting-animations */}
      <Animated.Text entering={FadeInLeft.duration(500).delay(400)} style={{fontSize:18, fontWeight:'bold', padding:16}}>{item?.title}</Animated.Text>
      <Animated.Text entering={FadeInLeft.duration(500).delay(600)} style={{fontSize:18, padding:16}}>{item?.description}</Animated.Text>
      {/* <Animated.Text style={{fontSize:18, padding:16}}>{item?.title}</Animated.Text> */}
    </View>
  )
}

export default Details