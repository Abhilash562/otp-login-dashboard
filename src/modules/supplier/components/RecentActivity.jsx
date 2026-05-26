const activities = [
  "Added new product",
  "Updated stock quantity",
  "Vendor request approved",
  "Product deleted",
];

const RecentActivity = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Recent Activity
      </h2>

      <ul className="space-y-3">
        {activities.map((item, index) => (
          <li
            key={index}
            className="border-b pb-2 text-gray-600"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;