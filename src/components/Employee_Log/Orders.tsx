import React from 'react'
import styled from 'styled-components'

const OrdersText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Orders: React.FunctionComponent = () => {
    return (
        <OrdersText>Tasks</OrdersText>
    )
}

export default Orders
