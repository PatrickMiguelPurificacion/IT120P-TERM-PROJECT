import React from 'react'
import styled from 'styled-components'

const ProfileText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Profile: React.FunctionComponent = () => {
    return (
        <ProfileText>Analytics</ProfileText>
    )
}

export default Profile
