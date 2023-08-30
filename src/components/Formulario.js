import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native'
import DatePicker from 'react-native-date-picker'

const Formulario = ({
  modalVisible,
  cerrarModal,
  setPacientes,
  pacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp,
}) => {
  const [paciente, setPaceinte] = useState('')
  const [id, setId] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState(new Date())
  const [sintomas, setSintomas] = useState('')
  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setPaceinte(pacienteObj.paciente)
      setPropietario(pacienteObj.propietario)
      setEmail(pacienteObj.email)
      setTelefono(pacienteObj.telefono)
      setFecha(pacienteObj.fecha)
      setSintomas(pacienteObj.sintomas)
      setId(pacienteObj.id)
    }
  }, [pacienteObj])
  const handleCita = () => {
    if ([paciente, propietario, email, fecha, sintomas].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }
    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    }

    if (id) {
      
      nuevoPaciente.id = id
      const pacientesActualizados = pacientes.map(pacienteState =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState,
      )
      setPacientes(pacientesActualizados)
      setPacienteApp({})
    } else {
      nuevoPaciente.id = Date.now()
      setPacientes([...pacientes, nuevoPaciente])
    }
    cerrarModal()
    setId('')
    setPaceinte('')
    setEmail('')
    setPropietario('')
    setTelefono('')
    setFecha(new Date())
    setSintomas('')
  }
  return (
    <Modal animationType='slide' visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {pacienteObj.id ? 'Editar':'Nueva'} <Text style={styles.tituloBold}>Cita</Text>
          </Text>
          <Pressable
            style={styles.btnCancelar}
            onPress={() => {
              cerrarModal()
              setPacienteApp({})
              setId('')
              setPaceinte('')
              setEmail('')
              setPropietario('')
              setTelefono('')
              setFecha(new Date())
              setSintomas('')
            }}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre Paciente'
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaceinte}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propiatario</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre Propiatario'
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='Email'
              placeholderTextColor={'#666'}
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Telefono</Text>
            <TextInput
              style={styles.input}
              placeholder='Telefono'
              placeholderTextColor={'#666'}
              keyboardType='phone-pad'
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker
                locale='es'
                date={fecha}
                onDateChange={date => setFecha(date)}
              />
            </View>
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder='Sintomas'
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar':'Agregar'} Paciente</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}
const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6d28d9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#ff1100',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#f59e0b',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    color: '#5827a4',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 16,
  },
})
export default Formulario
