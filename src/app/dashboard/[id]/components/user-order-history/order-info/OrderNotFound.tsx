import Alert from '@/components/ui/Alert';
import Icon from '@/components/ui/Icon';

const OrderNotFound = ({ customerName }: { customerName: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Order History
      </h2>
      <Alert
        icon={<Icon name="shoppingBag" />}
        iconSize="lg"
        centered
        title="No orders found"
        message={`${customerName} hasn't placed any orders yet.`}
        className="py-8"
      />
    </div>
  );
};

export default OrderNotFound;
