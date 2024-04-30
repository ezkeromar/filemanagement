import CopyCodeSource from "@/components/CopyCodeSource";

export default function Tabs({
  className = "",
  ...restProps
}: {
  className?: string;
}) {
  const source = [`curl "https://api.bytescale.com/v2/accounts/{accountId}/uploads/binary" \ \n -H "Authorization: Bearer YOUR_API_KEY" \  \n -H "Content-Type: text/plain" # change to match the file's MIME type \ \n -d "Example Data"# to upload a file: --data-binary @file.jpg`,
                `curl "https://api.bytescale.com/v2/accounts/{accountId}/uploads/form_data" \ \n -H "Authorization: Bearer YOUR_API_KEY" \ \n -F file=@image.jpg # File must exist locally. Always include the '@'.`,
                `curl "https://api.bytescale.com/v2/accounts/{accountId}/uploads/url" \ \n      -H "Authorization: Bearer YOUR_API_KEY" \ \n      -H "Content-Type: application/json" \ \n      -d @- << EOF \n { \n "url": "https://assets.bytescale.com/example.jpg" \n } \n EOF`,]


  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Upload Widget

            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              aria-current="page"
            >
              Upload with JS SDK
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
            >
              Upload with cURL
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Transform Uploaded Files
            </a>
          </li>
          <li>
            <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
            Transform External Files
            </a>
          </li>
        </ul>
      </div>
      <div className="py-6 px-6 grid">
        <span>To upload files with cURL:</span>
        <span className="pt-4 pb-6"><b>Option 1:</b> Use a <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">binary</span> request body:</span>
        <CopyCodeSource Script={source[0]}/>
        <span className="pt-4 pb-6"><b>Option 2:</b> Use a <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">multipart/form-data</span> request body:</span>
        <CopyCodeSource Script={source[1]}/>
        <span className="pt-4 pb-6"><b>Option 3:</b> Upload files from an existing URL</span>
        <CopyCodeSource Script={source[2]}/>

      </div>
    </>
  );
}
