import React,{useEffect,useState} from 'react'
import { View, Text,TouchableOpacity,StyleSheet} from 'react-native';
import {useDispatch,useSelector} from "react-redux";

import * as courseActions from "../../../../store/actions/Course";


const AllCourseInfoScreen = () =>{

    // const dispatch = useDispatch();
    // const allCourses = useSelector((state) => state.course.allCourses);

    // const [data,setData] = useState([]);
    // const token = useSelector((state) => state.authen.token);
    // const tmp=[];


    // useEffect(() => {
    //     const getAllCourses = async () =>{
    //         await dispatch(courseActions.getAllCourses());

    //         //console.log(allCourses);    
    //     }
    //     getAllCourses();
    // },[allCourses.length]);

    return (
        <View style={styles.container}>
            <Text>
                Tất cả môn học
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default AllCourseInfoScreen;