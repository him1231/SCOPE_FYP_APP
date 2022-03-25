import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {IRoute} from '../models/route';
import {RootStackParamList} from '../navigators/RootStackNavigator';

interface Props {
  route?: IRoute;
}

const RouteSearchItem = memo((props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {route} = props;

  const onPress = () => {
    navigation.navigate('RouteResult', {
      routeData: route,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleRow}>
        <Text
          numberOfLines={3}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.01}
          style={styles.title}>
          {route?.name_en}
        </Text>
        <View style={styles.origDestCon}>
          <Text numberOfLines={2}>
            <Text style={styles.subTitle}>from: </Text>
            {route?.orig_en}
          </Text>
          <Text numberOfLines={2}>
            <Text style={styles.subTitle}>to: </Text>
            {route?.dest_en}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
    color: 'red',
    marginRight: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleRow: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  origDestCon: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-evenly',
  },
});

export default RouteSearchItem;
