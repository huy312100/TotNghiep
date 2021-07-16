import React from 'react';
import { View,StyleSheet} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const LoadingWithSkeletonScreen = () => {
    return(
      <SkeletonPlaceholder style={{flex: 1}}>
        <View >
          <View style={skeletonLoading.courseInfoLoading}>
            <View style={skeletonLoading.courseNameLoading} />
            <View style={skeletonLoading.courseNameSecondLineLoading} />
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>

          </View>
        </View>

        <View >
          <View style={skeletonLoading.courseInfoLoading}>
            <View style={skeletonLoading.courseNameLoading} />
            <View style={skeletonLoading.courseNameSecondLineLoading} />
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>

          </View>
        </View>

        <View >
          <View style={skeletonLoading.courseInfoLoading}>
            <View style={skeletonLoading.courseNameLoading} />
            <View style={skeletonLoading.courseNameSecondLineLoading} />
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>

          </View>
        </View>

        <View >
          <View style={skeletonLoading.courseInfoLoading}>
            <View style={skeletonLoading.courseNameLoading} />
            <View style={skeletonLoading.courseNameSecondLineLoading} />
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>

          </View>
        </View>

        <View >
          <View style={skeletonLoading.courseInfoLoading}>
            <View style={skeletonLoading.courseNameLoading} />
            <View style={skeletonLoading.courseNameSecondLineLoading} />
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>

          </View>
        </View>

        <View >
          <View style={skeletonLoading.courseInfoLoading}>
            <View style={skeletonLoading.courseNameLoading} />
            <View style={skeletonLoading.courseNameSecondLineLoading} />
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>
            <View style={skeletonLoading.teacherNameLoading}/>

          </View>
        </View>
        
      </SkeletonPlaceholder>
    )
}

const skeletonLoading = StyleSheet.create({
    courseInfoLoading: {
      marginHorizontal:10,
      marginVertical:20,
    },
  
    courseNameLoading:{
      width: '100%', 
      height: 20, 
      borderRadius: 4,
      marginVertical:5
    },
  
    courseNameSecondLineLoading:{
      width: '80%', 
      height: 20, 
      borderRadius: 4,
      marginVertical:5
    },
  
    teacherNameLoading: {
      marginHorizontal: 20,
      marginVertical:3,
      width: '60%',
      height: 15,
      borderRadius: 4 
    }
})

export default LoadingWithSkeletonScreen;
