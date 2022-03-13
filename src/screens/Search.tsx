import React, {memo, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import CustomInput from '../components/CustomInput';
import RouteSearchItem from '../components/RouteSearchItem';
import Separator from '../components/Separator';
import Shadow from '../components/styles/Shadow';
import image from '../image';
import {IRoute} from '../models/route';
import {selectRouteData} from '../redux/selectors/route';

const Search = () => {
  const routeData = useSelector(selectRouteData);

  const [data, setData] = useState<IRoute[]>(routeData);

  const renderItem = ({item}: {item: IRoute}) => {
    return <RouteSearchItem route={item} />;
  };

  const onSearchTextChange = (searchText: string) => {
    setData(
      routeData.filter(route =>
        route.name_en?.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.header, Shadow]}>
        <CustomInput
          style={styles.input}
          icon={image.ICON.SEARCH}
          onValueChange={onSearchTextChange}
        />
      </SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, i) => `${i}`}
        contentContainerStyle={styles.flatList}
        ItemSeparatorComponent={() => <Separator size={20} />}
        extraData={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  input: {
    marginVertical: 10,
  },
  flatList: {
    padding: 20,
  },
});

export default Search;
