import { useState, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import * as Speech from 'expo-speech';
const ROUTE = [
  'Sangotedo',
  'Novare Mall',
  'Crown Estate',
  'Abraham Adesanya',
  'Ajah Under Bridge',
  'VGC',
  'Chevron',
  'Jakande',
  'Chisco',
  'Obalende',
  'CMS',
];
export default function App() {
  const [target, setTarget] = useState('Ajah Under Bridge');
  const [idx, setIdx] = useState(0);
  const [run, setRun] = useState(false);
  const [msg, setMsg] = useState('Enter stop and START');
  const ref = useRef(null);
  const speak = (t) => {
    Speech.stop();
    Speech.speak(t);
  };
  const start = () => {
    const tIdx = ROUTE.findIndex((r) =>
      r.toLowerCase().includes(target.toLowerCase())
    );
    if (tIdx < 0) {
      Alert.alert('Try: Ajah, CMS, Chevron');
      return;
    }
    setRun(true);
    setIdx(0);
    setMsg(`Watching for ${ROUTE[tIdx]}`);
    speak(`OWA active. Will shout at ${ROUTE[tIdx]}`);
    ref.current = setInterval(() => {
      setIdx((p) => {
        const n = p + 1;
        if (n >= ROUTE.length) {
          clearInterval(ref.current);
          setRun(false);
          return p;
        }
        if (n == tIdx - 1) {
          Vibration.vibrate([0, 500, 200, 500]);
          setMsg(`NEXT IS YOUR STOP!`);
          speak(`O WA! Next stop na ${ROUTE[tIdx]}!`);
        }
        if (n == tIdx) {
          Vibration.vibrate([0, 1000, 500, 1000]);
          setMsg(`${ROUTE[n]} DON REACH!`);
          speak(`O WA O WA! ${ROUTE[n]} don reach! Come down!`);
          clearInterval(ref.current);
          setRun(false);
        }
        return n;
      });
    }, 3500);
  };
  const stop = () => {
    clearInterval(ref.current);
    setRun(false);
    Speech.stop();
    setMsg('Stopped');
  };
  return (
    <View style={s.c}>
      <View style={s.h}>
        <Text style={s.logo}>OWA!</Text>
      </View>
      <View style={s.card}>
        <TextInput
          style={s.in}
          value={target}
          onChangeText={setTarget}
          placeholder="Where you dey go? e.g. Ajah"
        />
        {!run ? (
          <TouchableOpacity style={s.b} onPress={start}>
            <Text style={s.bt}>START O WA! 🔔</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[s.b, { backgroundColor: 'red' }]}
            onPress={stop}>
            <Text style={s.bt}>STOP</Text>
          </TouchableOpacity>
        )}
        <Text style={s.msg}>{msg}</Text>
        <Text style={{ textAlign: 'center', marginTop: 5 }}>
          Now: {ROUTE[idx]}
        </Text>
      </View>
      <ScrollView style={{ margin: 15 }}>
        {ROUTE.map((r, i) => (
          <View
            key={i}
            style={[
              s.r,
              i == idx && {
                borderLeftColor: '#0A7A3A',
                backgroundColor: '#E8F5E9',
              },
            ]}>
            <Text style={{ fontWeight: '700' }}>
              {i + 1}. {r}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: '#F5F5F5', paddingTop: 40 },
  h: { backgroundColor: '#0A7A3A', padding: 20, alignItems: 'center' },
  logo: { color: 'white', fontSize: 36, fontWeight: '900' },
  card: { backgroundColor: 'white', margin: 15, padding: 15, borderRadius: 12 },
  in: { borderWidth: 2, borderColor: '#0A7A3A', borderRadius: 8, padding: 10 },
  b: {
    backgroundColor: '#0A7A3A',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  bt: { color: 'white', fontWeight: '900' },
  msg: {
    marginTop: 10,
    fontWeight: '700',
    color: '#0A7A3A',
    textAlign: 'center',
  },
  r: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    marginBottom: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#ddd',
  },
});
