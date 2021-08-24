import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.datatype.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

const App = () => {

  const scrollY = React.useRef(new Animated.Value(0)).current

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Image
        source={{ uri: "https://images.pexels.com/photos/2907242/pexels-photo-2907242.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{
          padding: SPACING,
        }}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2)
          ]

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
          })

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + .8)
          ]

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0]
          })

          return (
            <Animated.View
              style={{
                flexDirection: "row",
                padding: SPACING,
                marginBottom: SPACING,
                borderRadius: 16,
                backgroundColor: "rgba(255,255,255, .7)",
                opacity,
                transform: [{ scale }]
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2
                }}
              />
              <View>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.name}</Text>
                <Text style={{ fontSize: 18, opacity: .7 }}>{item.jobTitle}</Text>
                <Text style={{ fontSize: 14, opacity: .7, color: "#0099cc" }}>{item.email}</Text>
              </View>
            </Animated.View>
          )
        }}
      />
    </View>
  );
};

export default App;
