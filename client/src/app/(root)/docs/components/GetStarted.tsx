import Tabs from "./Tabs";

export default function GetStarted({
  className = "",
  ...restProps
}: {
  className?: string;
}) {
  const dataTyps = ["Image API", "3D Model API", "Document API"];

  return (
    <section
      className={`mt-5 relative flex justify-between flex-col ${className}`}
    >
      <h1 className="font-bold mb-3 ">Get Started</h1>
      <p className="text-gray-600 mb-5 ml-3">
        Bytescale simplifies file uploading, file processing, content
        optimization, and content delivery.
      </p>
      <Tabs />
    </section>
  );
}
