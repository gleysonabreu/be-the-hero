import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import logo from '../../assets/logo.png';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function Incidents(){

  const navigation = useNavigation();

  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [active, setActive] = useState(true);
  const [searchItems, setSearchItems] = useState([]);

  async function loadIncidents(){

      if(loading){
        return;
      }

      if( total > 0 && incidents.length === total){
        return;
      }

      setLoading(true);
      const response = await api.get('incidents', {
        params: { page }
      });
      setIncidents([...incidents, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);
  }
  useEffect(() => {
    loadIncidents()
  }, [])

  function navigateToDetails(incident){
    navigation.navigate("Details", { incident } );
  }

  function navigateToProfile(ong_id, ong){
    navigation.navigate("Profile", { ong_id, ong });
  }

  async function searchResponse (searchText) {
    setActive(false);
    setSearch(searchText);
    if(search.length > 3){
      const response = await api.get('incidents/search', {
        params: { search: search }
      });
      setSearchItems([]);
      setSearchItems(response.data);
    }
  }

  function clear(){
    setActive(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
        </Text>
      </View>

      <SearchBar
        containerStyle={styles.search}
        onClear={clear}
        onCancel={clear}
        placeholder="Pesquisar caso"
        platform="ios"
        onChangeText={searchResponse}
        value={search}
      />

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

    <FlatList style={styles.incidentsList}
      data={active ? incidents : searchItems}
      keyExtractor={incident => String(incident.id)}
      showsVerticalScrollIndicator={false}
      onEndReached={active ? () => loadIncidents() : false}
      onEndReachedThreshold={0.2}
      renderItem={({ item: incident }) => (
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <TouchableOpacity
            onPress={() => navigateToProfile(incident.ong_id, incident.name)}
          >
            <Text style={[styles.incidentValue, { color: "#E02041", fontWeight: 'bold' }]}>{incident.name}</Text>
          </TouchableOpacity>
          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>Valor:</Text>
          <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: "BRL" }).format(incident.value)}</Text>

          <TouchableOpacity 
            style={styles.detailButton} 
            onPress={() => navigateToDetails(incident)}>
              <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E82041" />
            </TouchableOpacity>
        </View>
      )}
    />
    </View>
  );
}