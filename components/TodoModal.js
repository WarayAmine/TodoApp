import React, {Component, useState} from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard,
    Animated,
    Platform, TouchableWithoutFeedback
} from 'react-native';
import {colors} from "../Colors";
import {MaterialIcons} from '@expo/vector-icons';

export default class TodoModal extends Component {
    state = {
        newTodo: "",
        newListName: this.props.list.name,
        editMode: false
    }

    ComponentDidMount() {

    }

    toggleTodo = index => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    }

    toggleEditMode = (editMode) => {
        this.setState({editMode: !this.state.editMode});
        // editMode is false when we want to save the list's new name
        if (!editMode) {
            // only edit the name if it's not the same as the old one
            if (this.state.newListName !== this.props.list.name) {
                this.editListName();
            }
        }
    }

    addTodo = () => {
        let list = this.props.list;

        if (!list.todos.some(todo => todo.title === this.state.newTodo.trim()) && this.state.newTodo.trim() !== '') {
            list.todos.push({title: this.state.newTodo.trim(), completed: false});
            this.props.updateList(list);
        }

        this.setState({newTodo: ""});
    }

    deleteTodo = index => {
        let list = this.props.list;
        list.todos.splice(index, 1);

        this.props.updateList(list);
    }

    editListName = () => {
        let list = this.props.list;
        list.name = this.state.newListName;

        this.props.updateList(list);
    }

    render() {
        const list = this.props.list;
        let newListName = this.state.newListName;

        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed).length;

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={{position: "absolute", top: 32, right: 32, zIndex: 10}}
                                  onPress={this.props.closeModal}>
                    <MaterialIcons name="close" size={24} color={colors.black}/>
                </TouchableOpacity>

                <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
                    <View>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingRight: 32
                        }}>
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.toggleEditMode(true)}>
                            <TextInput style={styles.title}
                                       value={newListName}
                                       onChangeText={text => this.setState({newListName: text})}
                                       autoFocus={this.state.editMode}
                                       onSubmitEditing={() => this.toggleEditMode(false)}/>
                        </TouchableWithoutFeedback>
                        <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} tasks
                        </Text>
                    </View>
                </View>

                <View style={[styles.section, {flex: 3, marginVertical: 16}]}>
                    <FlatList data={list.todos}
                              renderItem={({item, index}) =>
                                  <TodoItem todo={item}
                                            index={index}
                                            toggleTodo={this.toggleTodo}
                                            deleteTodo={this.deleteTodo}
                                  />
                              }
                              keyExtractor={item => item.title}
                              showsVerticalScrollIndicator={false}
                    />
                </View>

                <KeyboardAvoidingView style={[styles.section, styles.footer]}
                                      behavior={Platform.OS === "ios" ? "padding" : null}
                >
                    <TextInput style={[styles.input, {borderColor: list.color}]}
                               onChangeText={text => this.setState({newTodo: text})}
                               value={this.state.newTodo}/>
                    <TouchableOpacity style={[styles.addTodo, {backgroundColor: list.color}]}
                                      onPress={() => this.addTodo()}>
                        <MaterialIcons name="add" size={16} color={colors.white}/>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

function TodoItem(props) {
    const todo = props.todo;
    const index = props.index;
    const [deleteIconIsVisible, toggleDeleteIcon] = useState(false);

    return (
        <View style={[styles.todoContainer, {paddingHorizontal: 32}]}>
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => props.toggleTodo(index)}>
                    <MaterialIcons name={todo.completed ? "check-box" : "check-box-outline-blank"}
                                   size={22} color={todo.completed ? colors.gray : colors.black}
                                   style={{width: 32}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleDeleteIcon(!deleteIconIsVisible)}
                                  style={{minWidth: 24, minHeight: 24}}>
                    <Text style={[styles.todo, {
                        textDecorationLine: todo.completed ? "line-through" : "none",
                        color: todo.completed ? colors.gray : colors.black
                    }]}>
                        {todo.title}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.todoContainer}>
                {
                    deleteIconIsVisible &&
                    <TouchableOpacity style={{alignSelf: "flex-end"}} onPress={() => {
                        props.deleteTodo(index);
                        toggleDeleteIcon(!deleteIconIsVisible);
                    }}>
                        <MaterialIcons name="close" size={24} color={colors.black}/>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 5
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "bold"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    todoContainer: {
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    todo: {
        color: colors.black,
        fontWeight: "bold",
        fontSize: 16,
    }
})
