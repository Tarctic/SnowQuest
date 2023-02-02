const { useState, useEffect } = React;

function App() {

    const [weather, setWeather] = useState([]);
    const [borders, setBorders] = useState([]);
    const [found, setFound] = useState(false);
    // const [ip, setIp] = useState([]);
    // const [location, setLocation] = useState([]);


    const find = () => {
        fetch("http://api.weatherunlocked.com/api/forecast/39.23,40.71?app_id=")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setWeather(data);
            setFound(true)
        })
        .catch((err) => {
            console.log(err.message);
         });
    }

    const findBorders = async () => {
        let country_code
        await fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=")
        .then(response => response.json())
        .then(data => {
            console.log(data.city)
            country_code = data.country_code
        })
        .catch((err) => {
            console.log(err.message);
        });
        
        fetch("gdsCountryBorders.json")
        .then(response => response.json())
        .then(data => {
            const countryBorders = [...borders]
            data.forEach(border => {
                if (border.country_code==country_code) {
                    countryBorders.push(border.country_border_name)
                }
            });
            console.log(countryBorders)
            setBorders(countryBorders)
        })
        .catch((err) => {
            console.log(err.message);
         });
    }

    // const findIP = async () => {
    //     let country_code = ""
    //     await fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=")
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         country_code = data.country_code
    //         // setIp(data.ip_address)
    //     })
    //     .catch((err) => {
    //         console.log(err.message);
    //     });
    //     console.log(country_code)
    //     return country_code
    // }

    const findLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            // console.log(latitude, longitude)
            // setLocation([latitude, longitude])
        });
        return [latitude, longitude]
    }

    return (
        <div>
            <button id="find" className="btn btn-dark" onClick={() =>{find()}}>FIND</button>
            <p></p>
            <div>
                {found && <p>{weather.weather[0].main}</p>}
                {/* <p>{weather.weather[0].main}</p> */}
                <hr></hr>
            </div>
            {/* <button id="borders" className="btn btn-dark" onClick={() =>{findBorders()}}>BORDERS</button>
            <p></p>
            {borders.map((border,i) => (
                <div key={i}>
                    <p>{border}</p>
                    <hr></hr>
                </div>
            ))} */}
            {/* <button id="ip" className="btn btn-dark" onClick={() =>{findIP()}}>GET MY IP</button>
            <p>{ip}</p>
            <button id="location" className="btn btn-dark" onClick={() =>{findLocation()}}>GET MY LOCATION</button>
            <p>{location[0]} {location[1]}</p> */}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);