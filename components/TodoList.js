import React from "react";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from '../Colors';
import TodoModal from "./TodoModal";

export default class TodoList extends React.Component {
    state = {
        showListVisible: false
    }

    toggleListModal() {
        this.setState({showListVisible: !this.state.showListVisible});
    }

    render() {
        const list = this.props.list;

        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;

        return (
            <View>
                <Modal animationType="slide"
                       visible={this.state.showListVisible}
                       onRequestClose={() => this.toggleListModal()}
                >
                    <TodoModal list={list} closeModal={() => this.toggleListModal()}/>
                </Modal>
                <TouchableOpacity style={[styles.listContainer, {backgroundColor: list.color}]}
                                  onPress={() => this.toggleListModal()}>
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>

                    <View>
                        <View style={{alignItems: "center"}}>
                            <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.subtitle}>Remaining</Text>
                        </View>
                        <View style={{alignItems: "center"}}>
                            <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subtitle}>Completed</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "normal",
        color: colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.white
    }
})