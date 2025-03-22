const StatCard = ({ title, value, increase, description, icon }) => {
  return (
    <div className="bg-[#475569] text-white w-64 p-5 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">{title}</span>
        <span className="text-yellow-400 text-xl">{icon}</span>
      </div>
      <div className="mt-2 text-4xl font-bold">{value}</div>
      <div className="mt-2 flex justify-between items-center text-sm text-gray-400">
        <span className="text-green-400">{increase}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default StatCard;
