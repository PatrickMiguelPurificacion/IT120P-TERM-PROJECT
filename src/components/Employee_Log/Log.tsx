import React from 'react'
import styled from 'styled-components'

const LogText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Log: React.FunctionComponent = () => {
    return (
        <LogText>Team</LogText>
    )
}

export default Log
