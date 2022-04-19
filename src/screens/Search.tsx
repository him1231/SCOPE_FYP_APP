import React, {memo, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomInput from '../components/CustomInput';
import RouteSearchItem from '../components/RouteSearchItem';
import Separator from '../components/Separator';
import Shadow from '../components/styles/Shadow';
import image from '../image';
import {IRoute} from '../models/route';
import {saveRouteHistory} from '../redux/actions/route';
import {selectRouteData, selectRouteHistory} from '../redux/selectors/route';

const Search = () => {
  const dispatch = useDispatch();

  const routeData = useSelector(selectRouteData);
  const routeHistory = useSelector(selectRouteHistory);

  const [data, setData] = useState<IRoute[]>(routeHistory ?? routeData);

  const [searchText, setSearchText] = useState('');

  const renderItem = ({item}: {item: IRoute}) => {
    const saveHistory = (route?: IRoute) => {
      if (route) dispatch(saveRouteHistory(route));
    };

    return <RouteSearchItem route={item} onPress={saveHistory} />;
  };

  const onSearchTextChange = (searchText: string) => {
    setSearchText(searchText);

    if (searchText === '') {
      setData(routeHistory ?? routeData);
    } else {
      setData(
        routeData.filter(route =>
          route.name_en?.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.header, Shadow]}>
        <CustomInput
          initValue={searchText !== '' ? '' : undefined}
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
