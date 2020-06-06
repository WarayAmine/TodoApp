import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class AddListModal extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Modal</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
