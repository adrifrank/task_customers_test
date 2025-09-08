const CompanySection = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">CRM</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">
          CRM Dashboard
        </span>
      </div>
      <p className="text-gray-600 text-sm">
        Customer and order management system for efficient work with big data
        sets.
      </p>
    </div>
  );
};

export default CompanySection;
