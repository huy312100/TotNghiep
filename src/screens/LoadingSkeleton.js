import React from 'react';
import { View,StyleSheet} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const LoadingWithSkeletonScreen = () => {
    return(
      <SkeletonPlaceholder>
        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

        <View style={skeletonLoading.infoLoading}>
          <View style={skeletonLoading.imageLoading} />
          <View style={{ marginLeft: 20 }}>
            <View style={skeletonLoading.contentLoading}>
              <View style={skeletonLoading.titleLoading} />
              <View style={skeletonLoading.timeLoading} />
            </View>
            <View style={skeletonLoading.detailLoading}/>
            <View style={skeletonLoading.divideLoading}/>
          </View>
        </View>

      </SkeletonPlaceholder>
    )
}

const skeletonLoading = StyleSheet.create({
  infoLoading: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft:10,
    marginBottom:20
  },

  imageLoading:{
    width: 50, 
    height: 50, 
    borderRadius: 25
  },

  contentLoading:{
    flexDirection:'row',
    justifyContent: "space-between"
  },

  titleLoading: { 
    width: 120, 
    height: 15, 
    borderRadius: 4
  },

  timeLoading:{ 
    width: 50, 
    height: 15, 
    borderRadius: 4 
  },

  detailLoading:{ 
    marginTop: 6, 
    width: 320, 
    height: 20, 
    borderRadius: 4
  },

  divideLoading:{
    marginTop: 15, 
    width: 320, 
    height: 2, 
    borderRadius: 4
  }
})

export default LoadingWithSkeletonScreen;
