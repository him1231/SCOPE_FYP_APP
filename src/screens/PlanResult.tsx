import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Separator from '../components/Separator';
import Shadow from '../components/styles/Shadow';
import {PlanResult} from '../models/route';
import {
  selectPlanResult,
  selectRouteData,
  selectStopData,
} from '../redux/selectors/route';

const RouteResult = () => {
  const data = useSelector(selectPlanResult);
  const routeData = useSelector(selectRouteData);

  const renderItem = ({item}: {item: PlanResult}) => {
    return (
      <View style={[styles.item, Shadow]}>
        <Text>{`time: ${item.cost.toFixed(1)} mins`}</Text>
        {item.path.map((value, index) => {
          const routeStop = value.split('-');
          if (routeData.length > 0 && routeStop.length === 3) {
            const route = routeData.find(item => item.route === routeStop[0]);
            if (route) {
              return (
                <Text
                  key={
                    index
                  }>{`index: ${index} => ${route.name_en} : ${value}`}</Text>
              );
            }
          }
          return <Text key={index}>{`index: ${index} => ${value}`}</Text>;
        })}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, i) => `${i}`}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <Separator size={20} />}
      extraData={data}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 20,
  },
});

export default RouteResult;
