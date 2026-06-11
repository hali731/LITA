import TableCard from "./TableCard";

export default function TableGrid({ tables, onEdit, onDelete }) {
  return (
    <div className="table-grid">
      {tables.map((t) => (
        <TableCard
          key={t._id}
          table={t}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}