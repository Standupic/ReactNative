import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import BackButton from '../components/BackButton';
import {StackScreenProps} from '@react-navigation/stack';
import Header from '../components/Header';

type Props = StackScreenProps<{[key:string]: any}, 'OverviewVoucherScreen'>;

const OverviewVoucherScreen = ({navigation}: Props) => {
    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Logo />
            <Header>OverviewVoucherScreen</Header>
        </Background>
    )
}

export default OverviewVoucherScreen;