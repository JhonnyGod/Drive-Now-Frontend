import React from 'react';
import GooglePayButton from "@google-pay/button-react";

export default function GooglePayComponent({ valor }) {
    return (
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
                    merchantId: '12345678901234567890',
                    merchantName: 'Demo Merchant',
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: valor, // Aquí pasas el valor del precio de la transacción
                    currencyCode: 'USD',
                    countryCode: 'US',
                },
                shippingAddressRequired: true,
                callbackIntents: ['PAYMENT_AUTHORIZATION'],
            }}
            onLoadPaymentData={(paymentRequest) => {
                console.log('load payment data', paymentRequest);
            }}
            onPaymentAuthorized={(paymentData) => {
                console.log('Payment Authorized', paymentData);
                return { transactionState: 'SUCCESS' };
            }}
        />
    );
}
