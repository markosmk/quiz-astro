type Props = {
  strokeWidth?: number;
  sqSize?: number;
  percentage: number;
  caption?: string;
};

export function CircularProgressBar(props: Props) {
  const { strokeWidth = 8, sqSize = 160, percentage, caption } = props;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * (percentage || 0)) / 100;

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        className="fill-none stroke-slate-200"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className="fill-none stroke-black transition-all ease-in-out delay-100"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeLinecap="round"
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      <text x="50%" y="56%" className="fill-black font-bold" style={{ fontSize: '1.5em', textAnchor: 'middle' }}>
        {caption ? caption : percentage + '%'}
      </text>
    </svg>
  );
}
