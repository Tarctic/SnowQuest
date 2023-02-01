const { useState, useEffect } = React;

function App() {

    const [weather, setWeather] = useState([]);
    const [borders, setBorders] = useState([]);


    const find = () => {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=24.7&lon=46.6&appid=")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setWeather(data);
        })
        .catch((err) => {
            console.log(err.message);
         });
    }

    const findBorders = (country) => {
        fetch("gdsCountryBorders.json")
        .then(response => response.json())
        .then(data => {
            const countryBorders = [...borders]
            data.forEach(border => {
                if (border.country_code==country) {
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

    return (
        <div>
            <button id="find" className="btn btn-dark" onClick={() =>{find()}}>FIND</button>
            {weather.map(post => (
                <div key={post.date}>
                    <p>{post.temp_min_c}</p>
                    <p>{post.snow_total_mm}</p>
                    <p>{post.Timeframes[0].temp_c}</p>
                    <hr></hr>
                </div>
            ))}
            <button id="borders" className="btn btn-dark" onClick={() =>{findBorders("SA")}}>BORDERS</button>
            {borders.map((border,i) => (
                <div key={i}>
                {console.log(border)}
                    <p>{border}</p>
                    <hr></hr>
                </div>
            ))}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);