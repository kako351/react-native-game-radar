import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GameRadar } from 'react-native-game-radar';

const characterStats = [
  { label: 'HP', value: 78 },
  { label: 'こうげき', value: 84 },
  { label: 'ぼうぎょ', value: 78 },
  { label: 'すばやさ', value: 100 },
  { label: 'とくぼう', value: 85 },
  { label: 'とくこう', value: 109 },
];

const gamingStats = [
  { label: 'POWER', value: 95 },
  { label: 'SPEED', value: 88 },
  { label: 'TECH', value: 72 },
  { label: 'LUCK', value: 60 },
  { label: 'MAGIC', value: 85 },
  { label: 'AGILITY', value: 78 },
];

const rpgStats = [
  { label: 'STR', value: 90 },
  { label: 'INT', value: 45 },
  { label: 'DEX', value: 80 },
  { label: 'VIT', value: 70 },
  { label: 'WIS', value: 55 },
];

export default function App() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <StatusBar style="light" />

      <Text style={styles.title}>Game Radar</Text>
      <Text style={styles.tagline}>react-native-game-radar</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Character Stats (6-axis)</Text>
        <GameRadar axes={characterStats} size={320} showLabels showGrid={false} animated animationDuration={1200} />
      </View>

      <View style={[styles.card, styles.gamingCard]}>
        <Text style={[styles.sectionTitle, styles.gamingLabel]}>
          ⚡ GAMING MODE ⚡
        </Text>
        <GameRadar
          axes={gamingStats}
          size={320}
          rings={5}
          strokeWidth={2.5}
          theme={{
            background: '#000000',
            gridColor: 'rgba(0,255,65,0.25)',
            axisColor: 'rgba(0,255,65,0.4)',
            areaFill: 'rgba(0,255,65,0.3)',
            areaStroke: '#00ff41',
            glowColor: 'rgba(0,255,65,1)',
            labelColor: '#00ff41',
          }}
          showLabels
          showValues
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>RPG Character (5-axis / Gold)</Text>
        <GameRadar
          axes={rpgStats}
          size={280}
          rings={5}
          theme={{
            areaFill: 'rgba(234,179,8,0.35)',
            areaStroke: 'rgba(234,179,8,1)',
            glowColor: 'rgba(234,179,8,0.6)',
          }}
          showLabels
          showValues
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>3-axis / Purple (showGrid=true)</Text>
        <GameRadar
          axes={[
            { label: 'Attack', value: 95 },
            { label: 'Speed', value: 70 },
            { label: 'Defense', value: 50 },
          ]}
          size={240}
          rings={3}
          theme={{
            areaFill: 'rgba(168,85,247,0.35)',
            areaStroke: 'rgba(168,85,247,1)',
            glowColor: 'rgba(168,85,247,0.6)',
          }}
          showLabels
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>3-axis / Purple (showGrid=false)</Text>
        <GameRadar
          axes={[
            { label: 'Attack', value: 95 },
            { label: 'Speed', value: 70 },
            { label: 'Defense', value: 50 },
          ]}
          size={240}
          rings={3}
          theme={{
            areaFill: 'rgba(168,85,247,0.35)',
            areaStroke: 'rgba(168,85,247,1)',
            glowColor: 'rgba(168,85,247,0.6)',
          }}
          showGrid={false}
          showLabels
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 16,
    gap: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#facc15',
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 8,
  },
  card: {
    alignItems: 'center',
    gap: 12,
  },
  gamingCard: {
    padding: 16,
    shadowColor: '#00ff41',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
  },
  gamingLabel: {
    color: '#00ff41',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  sectionTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.5,
  },
});
