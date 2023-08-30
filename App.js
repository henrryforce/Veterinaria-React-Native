import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Modal,
  FlatList,
  Alert,
} from 'react-native';

import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';

const App = () => {
  //Los hook van aqui
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);
  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id);
    setPaciente(pacienteEditar[0]);
  };
  const paceinteEliminar = id => {
    Alert.alert(
      'Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede eliminar',
      [
        {text: 'Cancelar'},
        {
          text: 'Si, Eliminar',
          onPress: () => {
            const pacientesActualizados = pacientes.filter(
              pacientesState => pacientesState.id !== id,
            );
            setPacientes(pacientesActualizados);
          },
        },
      ],
    );
  };
  const cerrarModal = () =>{
    setModalVisible(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.btnNuevaCita}>
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>
      {pacientes.length === 0 ? (
        <Text style={styles.noHayPacientes}>No hay pacientes</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                pacienteEditar={pacienteEditar}
                paceinteEliminar={paceinteEliminar}
                setModalPaciente={setModalPaciente}
                setPaciente={setPaciente}
              />
            );
          }}
        />
      )}
      {modalVisible && (
        <Formulario
        cerrarModal={cerrarModal}
          setPacientes={setPacientes}
          pacientes={pacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
      )}

      <Modal visible={modalPaciente} animationType="fade">
        <InformacionPaciente
          paciente={paciente}
          setModalPaciente={setModalPaciente}
          setPaciente={setPaciente}
        />
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  tituloBold: {
    fontWeight: '800',
    color: '#6d28d9',
  },
  btnNuevaCita: {
    backgroundColor: '#6d28d9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noHayPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
