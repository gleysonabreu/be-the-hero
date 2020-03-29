import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import logo from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute} from '@react-navigation/native';
import api from '../../services/api';
import styles from './styles';

function Profile(){
  const navigation = useNavigation();
  const route = useRoute();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [incidentsProfile, setIncidentsProfile] = useState([]);
  const [loading, setLoading] = useState(false);

  const { ong_id, ong } = route.params;

  function navigateBack(){
    navigation.goBack();
  }

  function navigateToDetails(incident){
    navigation.navigate("Details", { incident });
  }

  async function loadIncidentsProfile(){

    if(loading){
      return;
    }

    if( total > 0 && incidentsProfile.length === total){
      return;
    }

    setLoading(true);
    const response = await api.get('profile', {
      headers: {
        authorization: ong_id
      },
      params: { page }
    });
    setIncidentsProfile([...incidentsProfile, ...response.data])
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useState(() => {
    loadIncidentsProfile();
  }, [])

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
          <TouchableOpacity
            onPress={() => navigateBack()}>
            <Feather name="arrow-left" color="#E02041" size={28}/>
          </TouchableOpacity>
      </View>

      <Text style={styles.title}>{ong}!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList 
        style={styles.incidentsList}
        data={incidentsProfile}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={ () => loadIncidentsProfile() }
        onEndReachedThreshold={0.1}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
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

export default Profile;