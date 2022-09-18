import React, { useContext, useState } from 'react'
import StripeContainer from '../../componont/stripeContainer/StripeContainer'
import { cartContext } from '../../context/CartProvider'
import './Checkout.scss'

const Checkout = () => {
    const { carts, shippingValue } = useContext(cartContext)
    const [showPaymentCard, setShowPaymentCard] = useState(false)
    const [error, setError] = useState('')
    const [billingForm, setBillingForm] = useState({
        country: 'Ethiopia',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        email: '',
        phoneNumber: ''
    })

    const Subtotal = () => {
        const total = carts.reduce((acc, curr) => {
            return acc + curr.qunatity * curr.price
        }, 0)
        return total
    }

    const total = () => {
        return shippingValue + Subtotal()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { country, firstName, lastName, address, city, email, phoneNumber } = billingForm
        if (Subtotal()) {
            if (country && firstName && lastName && address && city && email && phoneNumber) {
                setShowPaymentCard(true)
            } else (
                setError('Please fill out all required fields')
            )
        } else {
            setError('there is 0 item on your cart')
        }


    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setBillingForm((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const { country, firstName, lastName, address, city, email, phoneNumber } = billingForm
    return (
        <>
            {
                !showPaymentCard ? <form onSubmit={handleSubmit}>
                    <div className='checkout-main'>
                        <div className='billing-details'>
                            <h3>Billing Details</h3>
                            <div className='form-group'>
                                <label>Country <span>*</span></label>
                                <select className='form-control' name="country" value={country} onChange={handleChange}>
                                    <option value="6">Ethiopia</option>
                                    <option value="5">United Arab Emirates</option>
                                    <option value="1">China</option>
                                    <option value="2">United Kingdom</option>
                                    <option value="0">Germany</option>
                                    <option value="3">France</option>
                                    <option value="4">Japan</option>
                                </select>
                            </div>
                            <div className='full-name'>
                                <div className='form-group first-name'>
                                    <label>First Name <span>*</span></label>
                                    <input type='text' name='firstName' value={firstName} onChange={handleChange} />
                                </div>
                                <div className='form-group last-name'>
                                    <label>Last Name <span>*</span></label>
                                    <input type='text' name='lastName' value={lastName} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label>Address <span>*</span></label>
                                <input type='text' name='address' value={address} onChange={handleChange} />
                            </div>
                            <div className='form-group'>
                                <label>Town/City <span>*</span></label>
                                <input type='text' name='city' value={city} onChange={handleChange} />
                            </div>

                            <div className='full-name'>
                                <div className='form-group first-name'>
                                    <label>Email <span >*</span></label>
                                    <input type='email' name='email' value={email} onChange={handleChange} />
                                </div>
                                <div className='form-group last-name'>
                                    <label>Phone Number <span>*</span></label>
                                    <input type='text' name='phoneNumber' value={phoneNumber} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className='order-details'>
                            <h3>Your Order</h3>
                            <table>
                                <tr>
                                    <th>PRODUCT NAME</th>
                                    <th>TOTAL</th>
                                </tr>
                                {
                                    carts?.map((cart) => (
                                        <tr key={cart.id}>
                                            <td>{cart.title}</td>
                                            <td>${cart.price * cart.qunatity}</td>
                                        </tr>
                                    ))
                                }

                                <tr>
                                    <td>Cart Subtotal</td>
                                    <td>${Subtotal()}</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td>${shippingValue}</td>
                                </tr>
                                <tr>
                                    <td>Order Total</td>
                                    <td>${total()}</td>
                                </tr>

                            </table>
                            <hr />
                            <input type='submit' value='PLACE ORDER' />
                            <span style={{ color: 'red', paddingTop: '3rem' }}>{error}</span>
                        </div>
                    </div>
                </form> : <StripeContainer amount={total()} />
            }

        </>

    )
}

export default Checkout