export interface GameRadarAxis {
  /** 軸のラベル（表示名） */
  label: string;
  /** 軸の値 */
  value: number;
  /** 軸の最大値（デフォルト: 100） */
  maxValue?: number;
}

export interface GameRadarTheme {
  /** 背景色 */
  background: string;
  /** グリッド（リング）の色 */
  gridColor: string;
  /** 軸の色 */
  axisColor: string;
  /** データエリアの塗りつぶし色 */
  areaFill: string;
  /** データエリアのストローク色 */
  areaStroke: string;
  /** グロー効果の色 */
  glowColor: string;
  /** ラベルの色 */
  labelColor: string;
}

export interface GameRadarProps {
  /** 軸データの配列（最低3軸必要） */
  axes: GameRadarAxis[];
  /** コンポーネントのサイズ（px）。デフォルト: 300 */
  size?: number;
  /** リング（グリッド）の数。デフォルト: 4 */
  rings?: number;
  /** テーマの上書き（部分指定可） */
  theme?: Partial<GameRadarTheme>;
  /** ラベルを表示するか。デフォルト: true */
  showLabels?: boolean;
  /** 値を表示するか。デフォルト: false */
  showValues?: boolean;
  /** グリッドリング（途中の線）を表示するか。デフォルト: true */
  showGrid?: boolean;
  /** ストロークの太さ。デフォルト: 1.5 */
  strokeWidth?: number;
}
