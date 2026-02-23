export default function DropZone({ answer, zoneId, value, onDrop, setAvailable, isCheckingAnswers }) {
  return (
    <span
      draggable={!!value}
      onDragStart={e => {
        e.dataTransfer.setData("text/plain", value);
        e.dataTransfer.setData("sourceZone", zoneId);
      }}
      onDragOver={e => {
        e.preventDefault();
      }}
      onDrop={e => {
        e.preventDefault();

        const word = e.dataTransfer.getData("text/plain");
        const sourceZone = e.dataTransfer.getData("sourceZone");

        if (parseInt(sourceZone) === parseInt(zoneId)) {
          console.log('dropped onto the same zone');
        } else {
          console.log('dropped onto another zone');
          onDrop(zoneId, word);
          onDrop(sourceZone, null);
          if (value) setAvailable(prev => [...prev, value]);
        }

      }}
      onDragEnd={e => {
        if (e.dataTransfer.dropEffect === 'none') {
          onDrop(zoneId, null);
          if (value) setAvailable(prev => [...prev, value]);
        }
      }}
      style={{
        borderBottom: `1px solid ${isCheckingAnswers ? (answer === value ? '#6b1' : '#f30') : '#ccc'}`,
        minWidth: 80,
        height: '1.3em',
        display: 'inline-block',
        verticalAlign: 'baseline',
        padding: '0 .2rem',
        backgroundColor: '#fff1',
        cursor: 'grab',
      }}
    >
      {value || " "}
    </span>
  );
}
