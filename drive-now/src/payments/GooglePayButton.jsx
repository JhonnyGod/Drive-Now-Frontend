import React, { useEffect } from 'react';
import GooglePayButton from '@google-pay/button-react';
import usePaymentStatus from '../store/PaymentStatus';

export default function GooglePayComponent({ valor }) {

    const { setPaymentStatus, paymentData, paymentStatus } = usePaymentStatus(); 

    const handlePaymentSuccess = () => {
        setPaymentStatus('SUCCESS');
        console.log('Datos de pago exitoso:', paymentData); 
        alert('Pago exitoso!');
    };

    useEffect(() => {
        if (paymentStatus === 'SUCCESS') {
            console.log('El pago fue exitoso');
            console.log('El estado interno de la transacción fue:', paymentStatus)
         
        } else if (paymentStatus === 'FAILED') {
            console.log('El pago falló');
        }
    }, [paymentStatus]);

    const handlePaymentFailure = () => {
        setPaymentStatus('FAILED');
        alert('Pago fallido. Intenta nuevamente.');
    };

    console.log('Merchant ID:', process.env.REACT_APP_GOOGLE_PAY_MERCHANT_ID);
    console.log('Merchant Name:', process.env.REACT_APP_GOOGLE_PAY_MERCHANT_NAME);

    return (
        <div>
            <GooglePayButton
                environment="TEST"
                paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                        {
                            type: 'CARD',
                            parameters: {
                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                allowedCardNetworks: ['VISA', 'MASTERCARD'],
                            },
                            tokenizationSpecification: {
                                type: 'PAYMENT_GATEWAY',
                                parameters: {
                                    gateway: "example",
                                    gatewayMerchantId: "exampleGatewayMerchantId",
                                },
                            },
                        },
                    ],
                    merchantInfo: {
                        merchantId: process.env.REACT_APP_GOOGLE_PAY_MERCHANT_ID,
                        merchantName: process.env.REACT_APP_GOOGLE_PAY_MERCHANT_NAME,
                    },
                    transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: valor,
                        currencyCode: 'COP',
                        countryCode: 'CO',
                    },
                    shippingAddressRequired: true,
                    callbackIntents: ['PAYMENT_AUTHORIZATION'],
                }}
                onLoadPaymentData={(paymentRequest) => {
                    console.log('Load Payment Data:', paymentRequest);
                }}
                onPaymentAuthorized={(paymentData) => {
                    handlePaymentSuccess(); 
                    return { transactionState: 'SUCCESS' }; 
                }}
                onPaymentFailed={(error) => {
                    console.error('Payment Failed:', error);
                    handlePaymentFailure(); 
                }}
            />
        </div>
    );
}
