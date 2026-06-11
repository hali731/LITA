import MenuForm from "./MenuForm";

export default function MenuEditorPanel({ selected, onSubmit, categories }) {
  return (
    <div className="menu-panel">
      <MenuForm selected={selected} onSubmit={onSubmit} categories={categories} />
    </div>
  );
}
