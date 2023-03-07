import json
answer = {"answer_box": {
        "type": "weather_result",
        "temperature": "23",
        "unit": "Fahrenheit",
        "precipitation": "2%",
        "humidity": "70%",
        "wind": "3 mph",
        "location": "Weather",
        "date": "Tuesday 4:00 PM",
        "weather": "Partly cloudy",
        "thumbnail": "https://serpapi.com/searches/64073b63b7b1cc404678634c/images/f8ac74e74f8f3b1ede406a051b03a35a07ed4a78449a4076.png",
        "forecast": [
            {
                "day": "Tuesday",
                "weather": "Scattered snow showers",
                "temperature": {
                    "high": "24",
                    "low": "15"
                },
                "thumbnail": "https://serpapi.com/searches/64073b63b7b1cc404678634c/images/f8ac74e74f8f3b1e4a7f3e7ac6fb8b5540580238f213280d743cf33ca201464b.png"
            },
            {
                "day": "Wednesday",
                "weather": "Snow",
                "temperature": {
                    "high": "34",
                    "low": "22"
                },
                "thumbnail": "https://serpapi.com/searches/64073b63b7b1cc404678634c/images/f8ac74e74f8f3b1e4a7f3e7ac6fb8b55faba04901495dc4a3e92325f446f277d.png"
            },
            {
                "day": "Thursday",
                "weather": "Snow showers",
                "temperature": {
                    "high": "25",
                    "low": "6"
                },
                "thumbnail": "https://serpapi.com/searches/64073b63b7b1cc404678634c/images/f8ac74e74f8f3b1e4a7f3e7ac6fb8b555dbc505769ac7881761e6ec624019d46.png"
            },
            {
                "day": "Friday",
                "weather": "Partly cloudy",
                "temperature": {
                    "high": "28",
                    "low": "14"
                },
                "thumbnail": "https://serpapi.com/searches/64073b63b7b1cc404678634c/images/f8ac74e74f8f3b1e4a7f3e7ac6fb8b55109042a7e1f04fb2123fddb550250821.png"
            },
            {
                "day": "Saturday",
                "weather": "Snow showers",
                "temperature": {
                    "high": "31",
                    "low": "28"
                },
                "thumbnail": "https://serpapi.com/searches/64073b63b7b1cc404678634c/images/f8ac74e74f8f3b1e4a7f3e7ac6fb8b55d30afc48e0f52f06f00996311b95c6c2.png"
            },
            {
                "day": "Sunday",
                "weather": "Snow showers",
                "temperature": {
                    "high": "31",
                    "low": "22"
                },
                "thumbnail": "https://serpapi.com/searches/64073b63b7b1cc404678634c/images/f8ac74e74f8f3b1e4a7f3e7ac6fb8b55a41bb8ba75c8597bc14ff70d7554418a.png"
            },
            {
                "day": "Monday",
                "weather": "Snow showers",
                "temperature": {
                    "high": "30",
                    "low": "21"
                },
                "thumbnail": "https://serpapi.com/searches/64073b63b7b1cc404678634c/images/f8ac74e74f8f3b1e4a7f3e7ac6fb8b55342eaeb720b62e0e3b463b2efaf27616.png"
            },
            {
                "day": "Tuesday",
                "weather": "Snow showers",
                "temperature": {
                    "high": "31",
                    "low": "22"
                },
                "thumbnail": "https://serpapi.com/searches/64073b63b7b1cc404678634c/images/f8ac74e74f8f3b1e4a7f3e7ac6fb8b5550f8ab5a04abe1e340beed29830c05e1.png"
            }
        ]
    }
}
print(json.dumps(answer))