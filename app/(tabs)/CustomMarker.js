import { Marker } from 'react-native-maps';
import { StyleSheet, View, Image } from 'react-native';
// import FastImage from 'react-native-fast-image';

export function CustomMarker({
  color,
  latitude,
  longitude,
  image,
}) {
  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
    >
      <View style={customMarkerStyles.markerWrapper}>
        <View
          style={[
            customMarkerStyles.marker,
            {
              backgroundColor: color,
            },
          ]}
        >
          <Image source={image} style={customMarkerStyles.image} />
        </View>
      </View>
    </Marker>
  );
}

export const customMarkerStyles = StyleSheet.create({
  markerWrapper: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    height: 28,
    width: 28,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});