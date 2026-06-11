import MenuForm from "./MenuForm";

export default function MenuEditorPanel({ selected, onSubmit }) {
  return (
    <div className="menu-panel">
  <MenuForm selected={selected} onSubmit={onSubmit} />
</div>
  );
}


