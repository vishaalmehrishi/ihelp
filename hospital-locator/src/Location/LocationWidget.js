import React from 'react'
import { usePermission, useLocation, useLocationName } from './Location'
import { RiUserLocationLine } from 'react-icons/ri'
import './LocationWidget.css'

const useInterval = (callback, intervalMS, deps) => {
    React.useEffect(() => {
        let timer = setTimeout(() => callback(), intervalMS);
        return () => {
            clearTimeout(timer);
        };
    },[callback, intervalMS, deps]);
}

const useLoadingText = () => {
    const [counter, setCounter] = React.useState(0)
    const text = 'Determining Location.'

    useInterval(() => {
        setCounter(counter + 1)
    }, 400, counter)

    return text + '.'.repeat(counter % 3) 
}

const LocationWidget = () => {
    const [locationAccess] = usePermission('geolocation')
    const [location, locationError] = useLocation()
    const name = useLocationName(location)
    const loadingText = useLoadingText()

    const locationFailed = () => locationAccess === 'denined' || locationError

    const getText = () => {
        return locationFailed() ? 'Unable to determine location. Tap here to retry...'
            : !location ? loadingText
            : name
    }

    const requestLocation = () => {
        // TODO: We may want to reload location in-place, rather than reloading the entire page.
        // Due to permissions behavior being different on select browsers, this was not straightforward. 
        // For now, we will just reload the page which will request the user permission again.
        window.location.reload()
    }

    return (
        <div className="location-widget-root" onClick={requestLocation}>
            <RiUserLocationLine className="location-widget-icon" aria-labelledby="Distance to hospital" />
            <p className="location-widget-text">
                {getText()}
            </p>
        </div>
    )
}

export { LocationWidget }