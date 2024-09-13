import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showEnterButton, setShowEnterButton] = useState(false);
    const navigation = useNavigation();

    const handleEnterPress = () => {
        // Replace 'specificEmail' and 'specificPassword' with your desired email and password
        if (email === 'belloumiaziz1@gmail.com' && password === 'aziz1') {
            navigation.navigate('COMPANION'); // Navigate to the target screen
        } else if (email === 'belloumiaziz2@gmail.com' && password === 'aziz2') {
            navigation.navigate('PATIENT'); 
        }
        else {
            Alert.alert("WRONG ACOUNT!","try another one");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>{action}</Text>
                <View style={styles.underline}></View>
            </View>
            <View style={styles.inputs}>
                {action === "Login" ? null : <View style={styles.input}><TextInput style={styles.inputText} placeholder='Name' /></View>}
                <View style={styles.input}>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Email'
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Password'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onFocus={() => setShowEnterButton(true)}
                    />
                </View>
            </View>
            {action === "Sign Up" ? null : <View style={styles.forgotPassword}><Text>Lost Password? <Text style={styles.clickHere}>Click Here!</Text></Text></View>}
            {showEnterButton && (
                <TouchableOpacity style={styles.submit} onPress={handleEnterPress}>
                    <Text style={styles.submitText}>Enter</Text>
                </TouchableOpacity>
            )}
            <View style={styles.submitContainer}>
                <TouchableOpacity style={action === "Login" ? styles.submitGray : styles.submit} onPress={() => setAction("Sign Up")}>
                    <Text style={styles.submitText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={action === "Sign Up" ? styles.submitGray : styles.submit} onPress={() => setAction("Login")}>
                    <Text style={styles.submitText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginSignup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        marginBottom: 10,
        alignItems:'center',
    },
    text: {
        color: '#3c009d',
        fontSize: 24,
        fontWeight: '700',
    },
    underline: {
        width: 61,
        height: 6,
        backgroundColor: '#3c009d',
        borderRadius: 9,
    },
    inputs: {
        marginTop: 55,
        width: '100%',
    },
    input: {
        alignItems: 'center',
        marginBottom: 25,
    },
    inputText: {
        height: 50,
        width: '80%',
        backgroundColor: '#eaeaea',
        borderWidth: 0,
        outline: 'none',
        color: '#797979',
        fontSize: 19,
    },
    forgotPassword: {
        position:'relative',
        top:-30,
        right:25,
        paddingLeft: 63,
        marginTop: 27,
        color: '#797979',
        fontSize: 18,
    },
    clickHere: {
        color: '#4c00b4',
    },
    submitContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 60,
        width: '100%',
    },
    submit: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
        height: 59,
        backgroundColor: '#4c00b4',
        borderRadius: 50,
    },
    submitGray: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
        height: 59,
        backgroundColor: 'gray',
        borderRadius: 50,
    },
    submitText: {
        color: 'white',
        fontSize: 19,
        fontWeight: '700',
    },
});
