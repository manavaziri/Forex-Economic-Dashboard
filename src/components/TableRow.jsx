function TableRow({
  data,
  fields,
  onSelect,
  selected,
}) {
  return (
    <tr
      onClick={onSelect ? () => onSelect(data) : undefined}
      className={selected ? "selected" : ""}
    >
      {fields.map((field) => (
        <td key={field}>
          {data[field]}
          
        </td>
      ))}
    </tr>
  );
}

export default TableRow;
{/*nClick={onSelect ? () => onSelect(data) : undefined}learn*/}