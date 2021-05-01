import React from 'react'

const usePermission = (permission) => {
    const [state, setState] = React.useState()
    const requestPermission = () => setState(undefined)
    const permissionsAvailable = !navigator || !navigator.permissions || !navigator.permissions.query

    React.useEffect(() => {
        if (state) {
            return
        }

        if (permissionsAvailable) {
            console.log('Permissions API not found')
            return
        }

        navigator.permissions.query({name: permission}).then(result => {
            console.log('Updated permission: ', result)
            result.onchange = () => setState(result)
            setState(result)
        })
    }, [state, permission, permissionsAvailable])

    return [state, requestPermission, permissionsAvailable]
}

const useLocation = (enableHighAccuracy = true, timeout = 5000, maximumAge = 0) => {
    const [coordinates, setCoordinates] = React.useState()
    const [error, setError] = React.useState()

    React.useEffect(() => {
        const id = navigator.geolocation.watchPosition((pos) => {
            setError(undefined)
            setCoordinates(pos.coords)
        }, (err) => {
            console.warn('Unable to watch current position', err)
            setError(err)
        }, {
            enableHighAccuracy: enableHighAccuracy,
            timeout: timeout,
            maximumAge: maximumAge
        })

        return () => navigator.geolocation.clearWatch(id)
    }, [enableHighAccuracy, timeout, maximumAge])

    return [coordinates, error]
}

const useLocationName = (coordinates) => {
    if (!coordinates) {
        return `N/A`
    }

    const trunc = (number, digits) => Number(number).toFixed(digits)

    // TODO: Use Google Maps API to get readible name for coordinates
    return `Searching near [${trunc(coordinates.latitude, 2)}:${trunc(coordinates.longitude, 2)}]`
}

export { usePermission, useLocation, useLocationName }