import {useRouter} from 'next/router'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useMetamask} from 'src/context/metamask'
import {Result, useResult} from 'src/hook/useResult'
import {Info} from 'src/type/info'

import {useShops} from './useShops'

export const useMap = () => {
  const [info, setInfo] = useState<Info>()
  const [opened, setOpened] = useState<boolean>(false)
  const {shops} = useShops()
  const {results} = useResult()
  const router = useRouter()
  const {hasMetamask, isStarting} = useMetamask()
  const searchId = useCallback((results: Result[], id: number) => {
    let latest = 0
    for (const x of results) {
      if (x.id == id) {
        latest = x.star / 10
      }
    }
    return latest
  }, [])

  const geojson = useMemo(() => {
    return {
      features: shops.map((shop) => ({
        geometry: {
          coordinates: {
            lat: shop.latitude,
            lng: shop.longitude,
          },
          type: 'Point',
        },
        properties: {
          id: shop.id,
          name: shop.name,
          address: shop.address,
          category: shop.category,
          postcode: shop.postcode,
          star: searchId(results, shop.id),
        },
      })),
      type: 'Feature',
    }
  }, [results, shops, searchId])

  const handleInfo = useCallback((e: any) => {
    setInfo((prevstate) => {
      return {
        ...prevstate,
        id: e.properties.id,
        name: e.properties.name,
        address: e.properties.address,
        category: e.properties.category,
        latitude: e.geometry.coordinates.lat,
        longitude: e.geometry.coordinates.lng,
        star: e.properties.star,
      }
    })
  }, [])

  const handleMarker = useCallback(
    (item: any) => {
      handleInfo(item)
      setOpened(true)
    },
    [setOpened, handleInfo]
  )

  useEffect(() => {
    if (!isStarting && !hasMetamask) {
      router.push('/')
    }
  }, [hasMetamask, isStarting, router])

  return {
    geojson,
    handleMarker,
    hasMetamask,
    info,
    opened,
    setOpened,
  }
}
