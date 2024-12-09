import React, { useState } from 'react';
import { useCart } from '../../context/context'; // Assuming you have the Cart context
import { Button, Input, Select, Checkbox, Radio, Space, Modal } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const { Option } = Select;

const Checkout = () => {
  const { cartItems, totalAmount } = useCart();

  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState(null); // For tracking selected payment method

  const [isModalVisible, setIsModalVisible] = useState(false); // For controlling modal visibility
  const [formError, setFormError] = useState(''); // For displaying form validation errors

  const countries = ["Pakistan", "Coming Soon"];

  const validateForm = () => {
    // Basic validation: Check if all fields are filled
    if (!email || !firstName || !lastName || !address || !city || !postalCode || !phone || !paymentMethod) {
      setFormError("Please fill all the required fields.");
      return false;
    }

    setFormError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Show the confirmation modal
      setIsModalVisible(true);
    }
  };

  const handleModalOk = () => {
    // Handle confirmation action here, e.g., submit the order
    setIsModalVisible(false);
    // You can also reset the form here if needed
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-10 bg-white text-black">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Left Side - Checkout Form */}
        <div className="flex-1 p-8 bg-white rounded-lg shadow-sm overflow-y-auto h-auto">
          <h2 className="text-3xl font-semibold mb-6">Checkout</h2>

          {/* Error Message */}
          {formError && <p className="text-red-500 mb-4">{formError}</p>}

          <form>
            {/* Email Address */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                id="email"
                type="email"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Delivery Information */}
            <h3 className="text-xl font-semibold mb-4">Delivery</h3>
            <div className="mb-6">
              <label htmlFor="country" className="block text-sm font-medium mb-2">Country/Region</label>
              <Select
                id="country"
                value={country}
                onChange={setCountry}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                {countries.map((country) => (
                  <Option key={country} value={country}>{country}</Option>
                ))}
              </Select>
            </div>

            {/* Name and Address Fields */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="apartment" className="block text-sm font-medium mb-2">Apartment/Suite</label>
              <Input
                id="apartment"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium mb-2">Postal Code</label>
                <Input
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Save Information Checkbox */}
            <div className="mb-6 flex items-center">
              <Checkbox 
                checked={saveInfo} 
                onChange={(e) => setSaveInfo(e.target.checked)} 
                className="text-black"
              >
                Save this information for next time
              </Checkbox>
            </div>

            {/* Payment Information Accordion */}
            <h3 className="text-xl font-semibold mb-4">Payment</h3>

            {/* Radio Buttons for Payment Methods */}
            <Radio.Group 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              className="mb-6"
            >
              <Space direction="vertical">
                <Radio value="cash">
                  <span className="flex items-center gap-2">
                    {paymentMethod === 'cash' && <CheckOutlined />}
                    Cash on Delivery
                  </span>
                </Radio>
                <Radio value="card">
                  <span className="flex items-center gap-2">
                    {paymentMethod === 'card' && <CheckOutlined />}
                    Card Payment
                  </span>
                </Radio>
              </Space>
            </Radio.Group>

            {/* Card Details (Only Show if Card Payment Selected) */}
            {paymentMethod === 'card' && (
              <>
                <div className="mb-6">
                  <label htmlFor="cardDetails" className="block text-sm font-medium mb-2">Card Details</label>
                  <Input
                    id="cardDetails"
                    type="text"
                    placeholder="1234 5678 9876 5432"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">Expiry Date</label>
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="cvv" className="block text-sm font-medium mb-2">CVV</label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </>
            )}

            {/* Complete Purchase Button */}
            <Button
              type="primary"
              className="w-full py-3 bg-blue-600 text-white font-semibold"
              onClick={handleSubmit}
            >
              Complete Purchase
            </Button>
          </form>
        </div>

        {/* Right Side - Order Summary */}
        <div className="flex-1 p-8 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>PKR {item.price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <span>Total</span>
            <span>PKR {totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title="Confirm Purchase"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Your purchase is complete. Thank you!</p>
      </Modal>
    </div>
  );
};

export default Checkout;
