import GenerateCards from "@components/generateCards";

export default async function GeneratePage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <GenerateCards/>
    </div>
  );
}