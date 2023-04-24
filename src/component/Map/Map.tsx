import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '../lib/firebase/init'

import {FC} from 'react'
import ReactMap, {GeolocateControl, Marker, NavigationControl} from 'react-map-gl'
import GeocoderControl from 'src/lib/mapbox/geocoder'

import {ResponsiveTxt} from '../common/ResponsiveTxt'
import {ShopInfo} from './element/ShopInfo'
import {useMap} from './hook/useMap'

/**
 * @package
 */
export const Map: FC = () => {
  const {geojson, handleMarker, hasMetamask, info, opened, setOpened} = useMap()

  if (!hasMetamask) {
    return <div className='loading'></div>
  }

  return (
    <>
      <ResponsiveTxt />
      <div className='hidden md:block h-[calc(100vh-70px)]'>
        <ReactMap
          initialViewState={{
            latitude: 35.6762,
            longitude: 139.6503,
            zoom: 10,
          }}
          mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}
          attributionControl={false}
        >
          <GeocoderControl
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? ''}
            position='top-left'
            placeholder='search a store'
          />
          {geojson.features.map((marker) => (
            <Marker
              latitude={marker.geometry.coordinates.lat}
              longitude={marker.geometry.coordinates.lng}
              onClick={() => handleMarker(marker)}
              key={marker.properties.id}
            >
              <span
                style={{
                  height: `${marker.properties.star * 6 + 30}px`,
                  width: `${marker.properties.star * 6 + 30}px`,
                }}
              >
                <b>{marker.properties.star}</b>
              </span>
            </Marker>
          ))}
          <GeolocateControl />
          <NavigationControl />
        </ReactMap>
        <ShopInfo info={info} opened={opened} setOpened={setOpened} />
      </div>
    </>
  )
}
