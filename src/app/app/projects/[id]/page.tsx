import { EditorWorkspace } from "@/components/editor/EditorWorkspace";

export default async function ProjectEditorPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const {
    id
  } = params;

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      <EditorWorkspace projectId={id} />
    </div>
  );
}
