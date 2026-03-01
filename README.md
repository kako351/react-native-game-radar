# @kako351/react-native-game-radar

A game-style radar chart component for React Native. Built for dark UI, RPG stats, and modern game interfaces.

https://github.com/user-attachments/assets/b4708b95-6bf9-4be2-a678-923a7bd57070

## Features

- N-axis radar chart (minimum 3 axes)
- Built-in dark theme with neon glow effect
- Optional entry animation (expand from center)
- Customizable theme (colors, stroke width, rings)
- Label and value display
- Grid ring toggle
- Full TypeScript support
- Powered by `react-native-svg`

## Installation

```sh
# npm
npm install @kako351/react-native-game-radar react-native-svg

# yarn
yarn add @kako351/react-native-game-radar react-native-svg

# pnpm
pnpm add @kako351/react-native-game-radar react-native-svg
```

> **Note:** `react-native-svg` requires additional native setup. See the [react-native-svg installation guide](https://github.com/software-mansion/react-native-svg#installation).

## Basic Usage

```tsx
import { GameRadar } from '@kako351/react-native-game-radar';

const stats = [
  { label: 'HP',     value: 78 },
  { label: 'ATK',    value: 84 },
  { label: 'DEF',    value: 78 },
  { label: 'SPD',    value: 100 },
  { label: 'SP.DEF', value: 85 },
  { label: 'SP.ATK', value: 109 },
];

export default function App() {
  return (
    <GameRadar
      axes={stats}
      size={300}
      showLabels
      animated
    />
  );
}
```

## Props

### `GameRadarProps`

| Prop                | Type                        | Default  | Description                                        |
|---------------------|-----------------------------|----------|----------------------------------------------------|
| `axes`              | `GameRadarAxis[]`           | required | Axis data array. Minimum 3 axes required.          |
| `size`              | `number`                    | `300`    | Size of the component in pixels.                   |
| `rings`             | `number`                    | `4`      | Number of grid rings.                              |
| `theme`             | `Partial<GameRadarTheme>`   | —        | Theme overrides (partial).                         |
| `showLabels`        | `boolean`                   | `true`   | Whether to display axis labels.                    |
| `showValues`        | `boolean`                   | `false`  | Whether to display axis values inside the chart.   |
| `showGrid`          | `boolean`                   | `true`   | Whether to display inner grid rings.               |
| `animated`          | `boolean`                   | `false`  | Enables expand-from-center animation on mount.     |
| `animationDuration` | `number`                    | `600`    | Animation duration in milliseconds.                |
| `strokeWidth`       | `number`                    | `1.5`    | Stroke width of grid lines and data polygon.       |

### `GameRadarAxis`

| Field      | Type     | Default | Description                   |
|------------|----------|---------|-------------------------------|
| `label`    | `string` | —       | Display label for the axis.   |
| `value`    | `number` | —       | Current value for the axis.   |
| `maxValue` | `number` | `100`   | Maximum value for the axis.   |

### `GameRadarTheme`

| Field        | Type     | Default (darkTheme)           | Description                        |
|--------------|----------|-------------------------------|------------------------------------|
| `background`  | `string` | `#0f172a`                    | Background color of the chart.     |
| `gridColor`   | `string` | `rgba(255,255,255,0.15)`     | Color of grid rings and axis lines.|
| `axisColor`   | `string` | `rgba(255,255,255,0.25)`     | Color of axis lines.               |
| `areaFill`    | `string` | `rgba(56,189,248,0.35)`      | Fill color of the data polygon.    |
| `areaStroke`  | `string` | `rgba(56,189,248,1)`         | Stroke color of the data polygon.  |
| `glowColor`   | `string` | `rgba(56,189,248,0.6)`       | Color of the glow effect.          |
| `labelColor`  | `string` | `#facc15`                    | Color of axis labels.              |

## Examples

### With Animation

```tsx
<GameRadar
  axes={stats}
  size={320}
  animated
  animationDuration={1200}
  showLabels
  showGrid={false}
/>
```

### Custom Theme (Gold)

```tsx
<GameRadar
  axes={rpgStats}
  size={280}
  rings={5}
  theme={{
    areaFill:   'rgba(234,179,8,0.35)',
    areaStroke: 'rgba(234,179,8,1)',
    glowColor:  'rgba(234,179,8,0.6)',
  }}
  showLabels
  showValues
  animated
/>
```

### Gaming Mode (Full custom theme)

```tsx
<GameRadar
  axes={gamingStats}
  size={320}
  rings={5}
  strokeWidth={2.5}
  theme={{
    background: '#000000',
    gridColor:  'rgba(0,255,65,0.25)',
    axisColor:  'rgba(0,255,65,0.4)',
    areaFill:   'rgba(0,255,65,0.3)',
    areaStroke: '#00ff41',
    glowColor:  'rgba(0,255,65,1)',
    labelColor: '#00ff41',
  }}
  showLabels
  showValues
/>
```

### Replay Animation

To replay the animation (e.g. on button press), remount the component by changing its `key` prop:

```tsx
const [animKey, setAnimKey] = useState(0);

<TouchableOpacity onPress={() => setAnimKey(k => k + 1)}>
  <Text>Replay</Text>
</TouchableOpacity>

<GameRadar key={animKey} axes={stats} animated />
```

## Peer Dependencies

| Package           | Version  |
|-------------------|----------|
| `react`           | `>=18`   |
| `react-native`    | `>=0.72` |
| `react-native-svg`| `>=13`   |

## License

MIT © [kako351](https://github.com/kako351)
