import toast from "react-hot-toast";

export function confirmToast(message) {
  return new Promise((resolve) => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded shadow-lg border w-64">
        <p className="text-sm">{message}</p>

        <div className="flex justify-end gap-2 mt-3">
          <button
            className="px-3 py-1 text-sm bg-gray-200 rounded"
            onClick={() => {
              toast.dismiss(t.id);
              resolve(false);
            }}
          >
            Cancel
          </button>

          <button
            className="px-3 py-1 text-sm bg-red-500 text-white rounded"
            onClick={() => {
              toast.dismiss(t.id);
              resolve(true);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    ));
  });
}
