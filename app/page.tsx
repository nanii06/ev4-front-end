"use client";

import { useState, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { Resource } from "@/types/Resource";
import Header from "@/components/Header";
import ResourceForm from "@/components/ResourceForm";
import ResourceList from "@/components/ResourceList";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import SearchBar from "@/components/SearchBar";
import FilterCategory from "@/components/FilterCategory";
import { useCookie } from "@/hooks/useCookie";

export default function Home() {
  const [resources, setResources] = useLocalStorage<Resource[]>("lab_resources", []);
  const [editingResource, setEditingResource] = useState<Resource | undefined>(undefined);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [theme, setTheme] = useCookie("lab_theme", "dark");

  // Filtros temporales -> Session Storage
  const [searchTerm, setSearchTerm] = useSessionStorage<string>("lab_resource_filter_search", "");
  const [selectedCategory, setSelectedCategory] = useSessionStorage<string>("lab_resource_filter_category", "");

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

  const categories = useMemo(
    () => Array.from(new Set(resources.map((r) => r.categoria))).filter(Boolean),
    [resources]
  );

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchesSearch = r.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? r.categoria === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [resources, searchTerm, selectedCategory]);

  return (
    <main
  className={theme === "light" ? "theme-light" : ""}
  style={{
    padding: 24,
    backgroundColor: theme === "dark" ? "#0d0d0d" : "#fafafa",
    color: theme === "dark" ? "#eaeaea" : "#111",
    minHeight: "100vh",
  }}
>
      <Header theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />

      <ResourceForm
        key={editingResource?.id ?? "new"}
        onSubmit={handleSaveResource}
        initialData={editingResource}
      />

      <hr />

      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <FilterCategory categories={categories} selected={selectedCategory} onChange={setSelectedCategory} />

      <ResourceList
        resources={filteredResources}
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