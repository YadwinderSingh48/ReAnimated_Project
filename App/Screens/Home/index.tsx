import { View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import { sharedElementTransition } from '../../Utils/SharedElementTransition';


const Home = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation<any>();

  const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products?limit=5')
      .then(res => res.json())
      .then(json => setProducts(json))
      .catch(error => console.log('Error ', error))
  }

  useEffect(() => {
    fetchProducts();
  }, [])


  // Initial Animated Values
  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const backgroundColor = useSharedValue('midnightblue');

  // Function to start the animation or change the Initial values  
  const startAnimations = () => {
    const randomHeight = Math.random() * 300;
    const randomWidth = Math.random() * 500;
    const randomBackgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    height.value = withTiming(randomHeight);
    width.value = withTiming(randomWidth);
    backgroundColor.value = withTiming(randomBackgroundColor, { duration: 2000 })
  }

  // hooks use to return the Animated Style object
  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    height: height.value,
    backgroundColor: backgroundColor.value
  }))

  //  ***********************************************
  // Create custom Animated Component -- As Reanimated has limited Animated component so we can create our own
  // For-more: read docs here -   https://docs.swmansion.com/react-native-reanimated/docs/core/createAnimatedComponent/
  const AnimatedInput = Animated.createAnimatedComponent(TextInput)

  const animatedInputStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
      height: 50,
      margin: 5
    }
  })

  return (
    <View>
      <Button title='Cards' onPress={() => navigation?.navigate('Cards')} />
      <Button title='Animate' onPress={startAnimations} />

      {/* use of custom crated AnimatedInput component */}
      <AnimatedInput placeholder={'Enter some Text'} style={animatedInputStyle} />

      {/* Basic animation component */}
      <Animated.View style={animatedStyle} />

      {/* Render Products  */}
      {
        products?.map((item:any) => {
          console.log(`image-${item.id}`)
          return(
          <View style={{padding:10}} key={item?.id} >
              <TouchableOpacity onPress={() =>navigation?.navigate('Details', {item})} >
                  <Animated.Image source={{uri:item?.image}} style={{width:100, height:100}}
                    sharedTransitionTag={`image-${item.id}`} sharedTransitionStyle={sharedElementTransition}
                  />
              </TouchableOpacity>
          </View>
        )})
      }
    </View>
  )
}

export default Home

// NOTES:
// sharedTransitionTag is used by reanimated to find that matching tag and complete the transitions, for a list of component it is hard to make transition with a static tag like 'image', so tags will be unique like image-imageId as image-1 etc

