import { View, Text, StyleSheet, Image } from "react-native";
import React, { FC } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { FlipCard } from "../../Components";

const Cards = () => {

    const imageArray = [
        require("../../assets/img1.jpg"),
        require("../../assets/img2.jpg"),
        require("../../assets/img3.jpg"),
        require("../../assets/img4.jpg"),
        require("../../assets/img5.jpg"),
      ];

  const progress = useSharedValue(0);

  interface CardComponentProps {
    index: number;
  }
  const CardComponent: FC<CardComponentProps> = ({ index }) => {
    const imageArray = [
      require("../../assets/img1.jpg"),
      require("../../assets/img2.jpg"),
      require("../../assets/img3.jpg"),
      require("../../assets/img4.jpg"),
      require("../../assets/img5.jpg"),
    ];

    const rotateStyle = useAnimatedStyle(() => {
      const translateX = interpolate(progress.value, [0, 1], [0, index * 25]);
      const translateY = interpolate(progress.value, [0, 1], [0, -index * 5]);
      const rotate = interpolate(
        progress.value,
        [0, 1],
        [-index * 10, index * 10]
      );

      return {
        transform: [
          {
            translateX: translateX,
          },
          {
            translateY: translateY,
          },
          {
            rotate: `${rotate}deg`,
          },
        ],
      };
    });

    return (
      <Animated.Image
        source={imageArray[index]}
        style={[
          styles.card,
          {
            zIndex: -index + 10,
            //Initial State
            //   transform: [
            //     {
            //       rotate: `${-index * 10}deg`,
            //     },
            //   ],

            //last state
            //   transform: [
            //     {
            //         translateX: index * 25,
            //       },
            //       {
            //         translateY: -index * 5,
            //       },
            //     {
            //       rotate: `${index * 10}deg`,
            //     },
            //   ],
          },
          rotateStyle,
        ]}
      />
    );
  };

  const isFlipped = useSharedValue(false);

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
    console.log(isFlipped.value)
  };

  const RegularContent = () => {
    return (
        <Image style={{width: 270,
            height: 390,borderRadius: 16}} source={imageArray[1]} />
    );
  };
  
  const FlippedContent = () => {
    return (
      
        <Image style={{width: 270,
            height: 390,borderRadius: 16}} source={imageArray[2]} />
     
    );
  };
  

  return (
    <View
      style={styles.container}
    >

<FlipCard
        isFlipped={isFlipped}
        cardStyle={styles.flipCard}
        FlippedContent={<FlippedContent />}
        RegularContent={<RegularContent />}
        onTouchStart={() => (progress.value = withSpring(1))}
        onTouchEnd={handlePress}
      />
        <View
        onTouchStart={() => (progress.value = withSpring(1))}
        onTouchEnd={() => (progress.value = withSpring(0))}
                            >
      {new Array(5).fill(null).map((_, index) => (
        <CardComponent key={index} index={index} />
      ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    height: 180,
    backgroundColor: "#ffffff",
    aspectRatio: 3 / 4,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "#cccccc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#b9b9b9",
    width:135,
    marginLeft: 75
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    // justifyContent: "center",
    backgroundColor: "#e3e3e3",
    gap: 100,
    paddingVertical:50
  },
  flipCard: {
    width: 270,
    height: 390,
    backfaceVisibility: 'hidden',
    overflow:'hidden'
    // alignSelf:'center'
  },
});

export default Cards;
