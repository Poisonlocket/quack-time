import { Image, StyleSheet } from 'react-native';

export default function AppLogo() {
    return (
        <Image source={require('../../../assets/images/ic_launcher_round.png')} style={styles.logo} />
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
});
