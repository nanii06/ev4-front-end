"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Resource } from "@/types/Resource";
import ResourceForm from "@/components/ResourceForm";
import ResourceList from "@/components/ResourceList";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function Home() {
  const [resources, setResources] = useLocalStorage<Resource[]>("lab_resources", []);
  const [editingResource, setEditingResource] = useState<Resource | undefined>(undefined);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  function handleSaveResource(resource: Resource) {
    if (editingResource) {
      setResources(resources.map((r) => (r.id === resource.id ? resource : r)));
      setEditingResource(undefined);
    } else {
      setResources([...resources, resource]);
    }
  }

  function handleDeleteConfirmed() {
    if (deleteTargetId) {
      setResources(resources.filter((r) => r.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Gestión de Recursos Tecnológicos</h1>

      <ResourceForm onSubmit={handleSaveResource} initialData={editingResource} />

      <hr />

      <ResourceList
        resources={resources}
        onEdit={(r) => setEditingResource(r)}
        onDelete={(id) => setDeleteTargetId(id)}
      />

      <ConfirmDeleteModal
        isOpen={deleteTargetId !== null}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setDeleteTargetId(null)}
      />
    </main>
  );
}