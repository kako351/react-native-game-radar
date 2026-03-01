import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Polygon, Text as SvgText } from 'react-native-svg';
import { darkTheme } from './themes';
import { getAxesAngles, polarToCartesian } from './utils';
import type { GameRadarAxis, GameRadarProps, GameRadarTheme } from './types';

export function GameRadar({
  axes,
  size = 300,
  rings = 4,
  theme: themeProp,
  showLabels = true,
  showValues = false,
  showGrid = true,
  animated = false,
  animationDuration = 600,
  strokeWidth = 1.5,
}: GameRadarProps) {
  const theme: GameRadarTheme = { ...darkTheme, ...themeProp };

  // データ部分だけに適用する進行度 (0 → 1)
  // グリッド・軸ライン・ラベルは常に静的
  const [animProgress, setAnimProgress] = useState(animated ? 0 : 1);
  const progressAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;

  useEffect(() => {
    if (!animated) {
      setAnimProgress(1);
      return;
    }
    setAnimProgress(0);
    progressAnim.setValue(0);
    const listenerId = progressAnim.addListener(({ value }) =>
      setAnimProgress(value),
    );
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // JS スレッドで state 更新するため false
    }).start();
    return () => progressAnim.removeListener(listenerId);
  }, [animated, animationDuration, progressAnim]);

  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.38;
  const count = axes.length;

  if (count < 3) {
    return null;
  }

  const angles = getAxesAngles(count);

  /** 指定半径でN角形のポイント文字列を生成 */
  const buildPoints = (r: number): string =>
    angles
      .map((angle) => {
        const { x, y } = polarToCartesian(cx, cy, r, angle);
        return `${x},${y}`;
      })
      .join(' ');

  /** データポリゴンのポイント文字列（animProgress で半径をスケール） */
  const dataPoints = angles
    .map((angle, i) => {
      const axis = axes[i] as GameRadarAxis;
      const maxVal = axis.maxValue ?? 100;
      const normalized = Math.min(Math.max(axis.value / maxVal, 0), 1);
      const { x, y } = polarToCartesian(
        cx,
        cy,
        normalized * maxRadius * animProgress,
        angle,
      );
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <View style={{ width: size, height: size }}>
      {/* 背景レイヤー：overflow:hidden で角丸を適用しつつ、ラベルは SVG 側でオーバーフロー可能にする */}
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: theme.background, borderRadius: 12, overflow: 'hidden' },
        ]}
      />
      <Svg width={size} height={size} style={{ overflow: 'visible' }}>
        {/* 内側グリッドリング（showGrid=true のみ・アニメーションなし） */}
        {showGrid && Array.from({ length: rings - 1 }, (_, i) => {
          const r = ((i + 1) / rings) * maxRadius;
          return (
            <Polygon
              key={`ring-${i}`}
              points={buildPoints(r)}
              fill="none"
              stroke={theme.gridColor}
              strokeWidth={strokeWidth}
            />
          );
        })}

        {/* 最外リング（常に表示・アニメーションなし） */}
        <Polygon
          points={buildPoints(maxRadius)}
          fill="none"
          stroke={theme.gridColor}
          strokeWidth={strokeWidth}
        />

        {/* 軸ライン（アニメーションなし） */}
        {angles.map((angle, i) => {
          const { x, y } = polarToCartesian(cx, cy, maxRadius, angle);
          return (
            <Line
              key={`axis-${i}`}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={theme.axisColor}
              strokeWidth={strokeWidth}
            />
          );
        })}

        {/* グロー効果（animProgress でスケール） */}
        <Polygon
          points={dataPoints}
          fill="none"
          stroke={theme.glowColor}
          strokeWidth={strokeWidth + 12}
          opacity={0.08}
        />
        <Polygon
          points={dataPoints}
          fill="none"
          stroke={theme.glowColor}
          strokeWidth={strokeWidth + 7}
          opacity={0.13}
        />
        <Polygon
          points={dataPoints}
          fill="none"
          stroke={theme.glowColor}
          strokeWidth={strokeWidth + 3}
          opacity={0.22}
        />

        {/* データエリア（animProgress でスケール） */}
        <Polygon
          points={dataPoints}
          fill={theme.areaFill}
          stroke={theme.areaStroke}
          strokeWidth={strokeWidth}
        />

        {/* 頂点ドット（animProgress でスケール） */}
        {angles.map((angle, i) => {
          const axis = axes[i] as GameRadarAxis;
          const maxVal = axis.maxValue ?? 100;
          const normalized = Math.min(Math.max(axis.value / maxVal, 0), 1);
          const { x, y } = polarToCartesian(
            cx,
            cy,
            normalized * maxRadius * animProgress,
            angle,
          );
          return (
            <G key={`point-${i}`}>
              <Circle cx={x} cy={y} r={7} fill={theme.glowColor} opacity={0.3} />
              <Circle cx={x} cy={y} r={3} fill={theme.areaStroke} />
            </G>
          );
        })}

        {/* ラベル（アニメーションなし） */}
        {showLabels &&
          angles.map((angle, i) => {
            const { x, y } = polarToCartesian(cx, cy, maxRadius + 18, angle);
            const textAnchor =
              Math.abs(x - cx) < 5 ? 'middle' : x < cx ? 'end' : 'start';
            return (
              <SvgText
                key={`label-${i}`}
                x={x}
                y={y + 5}
                textAnchor={textAnchor}
                fill={theme.labelColor}
                fontSize={11}
                fontWeight="bold"
              >
                {(axes[i] as GameRadarAxis).label}
              </SvgText>
            );
          })}

        {/* 値表示（アニメーションなし） */}
        {showValues &&
          angles.map((angle, i) => {
            const axis = axes[i] as GameRadarAxis;
            const maxVal = axis.maxValue ?? 100;
            const normalized = Math.min(Math.max(axis.value / maxVal, 0), 1);
            const r = normalized * maxRadius - 14;
            const { x, y } = polarToCartesian(cx, cy, Math.max(r, 8), angle);
            return (
              <SvgText
                key={`value-${i}`}
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill={theme.areaStroke}
                fontSize={9}
                fontWeight="bold"
              >
                {axis.value}
              </SvgText>
            );
          })}
      </Svg>
    </View>
  );
}
