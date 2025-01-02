import { View, Text, Image } from 'react-native'
import React from 'react'
import Animated, { FadeInLeft } from 'react-native-reanimated';

const Details = ({route}: any) => {
  const {item} = route.params;
  console.log(`image-${item.id}`)
  return (
    <View style={{}}>
      <Animated.Image source={{uri:item?.image}} style={{width:'100%', height:300}}
        sharedTransitionTag={`image-${item.id}`}
      />

      {/* Layout Animations Entering and Exiting   */}
      {/*  For More check the docs here https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/entering-exiting-animations */}
      <Animated.Text entering={FadeInLeft.duration(500).delay(400)} style={{fontSize:18, fontWeight:'bold', padding:16}}>{item?.title}</Animated.Text>
      <Animated.Text entering={FadeInLeft.duration(500).delay(600)} style={{fontSize:18, padding:16}}>{item?.description}</Animated.Text>
      
      
    </View>
  )
}

export default Details

//  NOTES: 
//  Exiting animations wont work when user leave the page, it only works when we hide the elements conditionally etc.
// Checkout this for better transitions     https://mrousavy.com/blog/Shared-Element-Transitions-in-React-Native
