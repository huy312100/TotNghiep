import React,{useState} from 'react';
import { View,StyleSheet,Text,TouchableOpacity,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Entypo,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons'
import { Header } from 'react-native-elements';

const CreatePostScreen = ({navigation}) => {

    const [title,setTitle] = useState('');

    return (

        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
          }}>
            <View style={styles.container}>
                <Header
                    containerStyle={{
                        backgroundColor: 'white',
                        justifyContent: 'space-around',
                        borderBottomColor:'#DDDDDD'
                    }}

                    centerComponent={
                        <Text style={{fontSize:20,fontWeight:'500',marginTop:3}}>Tạo mới </Text>
                    }

                    leftComponent={
                    <TouchableOpacity onPress={() =>{ 
                        //socket.emit('Return-Chat',[roomID,route.params.email]);
                        navigation.goBack();
                        }}>
                            <Entypo name="chevron-left" size={30} color="blue" />
                        </TouchableOpacity>
                    }

                    rightComponent={
                    <View style={{flexDirection:'row',marginTop:3}}>
                        <FontAwesome name="send" size={24} color="#444444" />

                    </View>
                    }
                    />

                    <View style={styles.card}>
                        <TextInput multiline style={styles.titleName} placeholder='Thêm nội dung cho bài viết'
                        onChangeText={(title)=>{
                            //console.log(checkTitle(title));
                            setTitle(title);
                            }}>{title}</TextInput>
                    </View> 

                    <TouchableOpacity style={[styles.card,{marginTop:0}]}>
                        <View style={styles.rowView}>
                            <Text style={styles.label}>Chủ đề liên quan</Text>
                            <Entypo style={styles.onTheRight} name="chevron-thin-right" size={18} color="blue" />
                        </View>
                    </TouchableOpacity> 

                    <View style={styles.card}>
                        <View style={styles.rowView}>
                            <Text style={styles.label}>Thêm ảnh</Text>    

                            <TouchableOpacity style={{marginLeft:'auto'}}>
                            <View style={{width:200,height:200,borderStyle:'dashed',borderColor:'silver',borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                                <MaterialCommunityIcons name="image-plus" size={40} color="#0099CC" />
                            </View>

                        </TouchableOpacity>                 
                        </View>

                        
                    </View> 
            </View>
          </TouchableWithoutFeedback>
        
        
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        width: '100%',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor: "#EEEEEE",
        marginTop:20
    },

    titleName:{
        marginHorizontal: 25,
        marginVertical:10,
        fontSize:20,
        fontWeight:'500',
        height:200
    },

    rowView: {
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:10,
    },

    label: {
        fontSize:18,
        marginLeft:5
    },

    onTheRight: {
        position: 'absolute',
        right: 0
    },
});

export default CreatePostScreen;