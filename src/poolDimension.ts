export const poolDimension = {
  width: 300,
  height: 600,
  ballDiameter: 300 / 22,
};

export function translateX(v: number): number {
  const one = poolDimension.width / 4;
  return one * v - poolDimension.ballDiameter / 2;
}

export function translateY(v: number): number {
  const one = poolDimension.width / 4;
  return poolDimension.height - one * v + poolDimension.ballDiameter / 2;
}
