import React from 'react'
import styled from 'styled-components'

const StocksText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Stocks: React.FunctionComponent = () => {
    return (
        <StocksText>Analytics</StocksText>
    )
}

export default Stocks
