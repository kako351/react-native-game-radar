/**
 * 極座標 → デカルト座標 変換
 */
export function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleRad: number,
): { x: number; y: number } {
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

/**
 * N軸分の角度（ラジアン）を返す。
 * 頂点は上（-π/2）から始まり時計回り。
 */
export function getAxesAngles(count: number): number[] {
  return Array.from(
    { length: count },
    (_, i) => -Math.PI / 2 + (2 * Math.PI * i) / count,
  );
}
