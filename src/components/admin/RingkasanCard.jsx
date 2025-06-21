const RingkasanCard = ({ title, value, color }) => {
  return (
    <div className={`p-5 rounded-xl shadow-md text-white ${color}`}>
      <h4 className="text-sm mb-2 font-medium">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default RingkasanCard;
