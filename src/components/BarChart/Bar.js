export default function Bar ({ percent, style }) {
  return (
    <div
      className='bar'
      style={{
        ...style,
        height: `${percent}%`
      }}
    />
  );
}
