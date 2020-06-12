import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {colors} from '../Colors';

export default class AddListModal extends Component {
    backgroundColors = ["#74bd72", "#24a6d9", "#595bd9", "#8022d9", "#D159D8", "#D85963", "#D88559"];

    state = {
        name: "",
        color: this.backgroundColors[0]
    }

    createTodo = () => {
        const {name, color} = this.state;

        const list = {name, color};

        this.props.addList(list);

        this.setState({name: ""});
        this.props.closeModal();
    };

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, {backgroundColor: color}]}
                    onPress={() => this.setState({color})}
                />
            )
        })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
                <TouchableOpacity style={{position: "absolute", top: 32, right: 32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black}/>
                </TouchableOpacity>

                <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
                    <Text style={styles.title}>Create Todo List</Text>

                    <TextInput style={styles.input} placeholder="List name"
                               onChangeText={text => this.setState({name: text})}/>

                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 18}}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity style={[styles.create, {backgroundColor: this.state.color}]}
                                      onPress={this.createTodo}>
                        <Text style={{color: colors.white, fontWeight: "bold"}}>Create</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 16,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 18,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
})
