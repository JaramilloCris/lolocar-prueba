import { useEffect, useState } from "react";


export default function Welcome() {


    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [dateText, setDateText] = useState('');


    const getAgeApi = async (name) => {
        const url = `https://api.agify.io/?name=${name}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const age = data.age;
        return age;

    }


    const handlerName = async (nameValue) => {
        setName(nameValue);
        const ageApi = await getAgeApi(nameValue);
        if(ageApi !== null) setAge(ageApi);
    }

    const getTimeNow = () => {
        const date = new Date();
        return date;
    }

    useEffect(() => {
        setInterval(() => {
            const date = getTimeNow();
            setDateText(String(date));
        }
        , 1000);
    }, []);


    return (

        <div>
            <h1>Welcome to Lolocar</h1>
            <span>{dateText}</span>
            <div>
                <input type="text" placeholder="Enter your name" value={name} onChange={(e) => handlerName(e.target.value)} />
            </div>
            <span>
                {name.length > 3 && `Hola, ${name}. Tu nombre tiene ${age} años.`}
            </span>
        </div>


    )

}