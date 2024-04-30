
export default function ApiTypes({
  className = "",
  ...restProps
}: {
  className?: string;
}) {

  const dataTyps = [ "Image API" , "3D Model API" , "Document API" ];

  return (
    <div
      className={` flex-end flex-wrap gap-4 sm:p-3  ${className}`}
      {...restProps}
    >

      {dataTyps.map((item, index) => (
        <span key={index} className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">{item}</span>
      ))}
    </div>
  );
}
