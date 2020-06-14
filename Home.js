import React from 'react';
import {ActivityIndicator, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from './Colors';
import {AntDesign} from '@expo/vector-icons';
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import Fire from "./Fire";

export default class Home extends React.Component {
    state = {
        addTodoVisible: false,
        lists: [],
        user: {},
        loading: true,
        firebase: null
    }

    componentDidMount() {
        this.state.firebase = new Fire((error, user) => {
            if (error) {
                return alert("Uh oh, something went wrong with firebase");
            }

            this.state.firebase.getLists(lists => {
                this.setState({lists, user}, () => {
                    this.setState({loading: false});
                })
            })

            this.setState({user});
        });
    }

    componentWillUnmount() {
        this.state.firebase.detach();
    }

    toggleAddTodoModal() {
        this.setState({addTodoVisible: !this.state.addTodoVisible});
    }

    renderList = list => {
        return <TodoList list={list} updateList={this.updateList} deleteList={this.deleteList}/>
    }

    addList = list => {
        this.state.firebase.addList({
            name: list.name,
            color: list.color,
            todos: []
        })
    }

    updateList = list => {
        this.state.firebase.updateList(list);
    }

    deleteList = listId => {
        this.state.firebase.deleteList(listId);
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={colors.blue}/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Modal animationType="slide" visible={this.state.addTodoVisible}
                       onRequestClose={() => this.toggleAddTodoModal()}>
                    <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList}/>
                </Modal>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.divider}/>
                    <Text style={styles.title}>
                        Todo <Text style={{fontWeight: "300", color: colors.blue}}>next</Text>
                    </Text>
                    <View style={styles.divider}/>
                </View>

                <View style={{marginVertical: 48}}>
                    <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
                        <AntDesign name="plus" size={16} color={colors.blue}/>
                    </TouchableOpacity>

                    <Text style={styles.add}>Add list</Text>
                </View>

                <View style={{height: 275, paddingHorizontal: 16}}>
                    <FlatList data={this.state.lists}
                              keyExtractor={item => item.id.toString()}
                              horizontal={true}
                              showHorizontalScrollIndicator={false}
                              renderItem={({item}) => this.renderList(item)}
                              keyboardShouldPersistTaps={"always"}
                    />
                </View>

                <View style={{marginVertical: 8}}>
                    <Text style={{color: colors.lightGray}}>Hold an item to delete</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf: "center",
    },
    title: {
        fontSize: 38,
        fontWeight: "bold",
        color: colors.black,
        paddingHorizontal: 64
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    add: {
        color: colors.blue,
        fontWeight: "bold",
        fontSize: 14,
        marginTop: 8
    }
});
