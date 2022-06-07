import './App.css';
import {useState} from "react";
import axios from "axios";
import {Box} from "@mui/material";
import PrimarySearchAppBar from "./navBar";

const App = () => {

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const getData = () => {
        axios.get(`http://localhost:8083/directory/search-disease?search=${value}`, {
            headers: {
                "Access-Control-Allow-Origin": `*`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify,
            responseType: "json",
        }).then((response) => {
            setData(response.data)
        })
    }

    const [value, setValue] = useState('')
    const [data, setData] = useState(null)


    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const chekc = (el) => {
        console.log(el)
    }


    function Item(el) {
        return <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: 4,
            borderRadius: 4,
            p: 2,
            margin: '5px',
            minWidth: '400px'

        }}>
            <h3>Наименование болезни</h3>
            <div>{el?.el.diseaseName}</div>
            <h3>Описание болезни</h3>
            <div>{el?.el.description}</div>
            <h3>Симптомы</h3>
            <div>
                <Symptoms symptomsNames={el?.el.symptomsNames}/>
            </div>
            <h3>Доктора</h3>
            <div>
                {el?.el.doctorDtos.map((el) => <Doctors el={el}/>)}
            </div>
        </Box>;
    }

    function Symptoms(el) {
        return <div className={'symptoms'}>
            {chekc(el)}
            {el?.symptomsNames.map((el)=>{
                return el + ', '
            })}
        </div>
    }

    function Doctors(el) {
        return <div>
            {el?.el.firstName + ' '}
            {el?.el.middleName + ' '}
            {el?.el.lastName + ' '}
            {el?.el.specializationName + ' '}
        </div>
    }



    return (
        <div className={'App'}>
            <div className={'FindWrapper'}>
                <PrimarySearchAppBar handleChange={handleChange} getData={getData}/>
            </div>

            <div className='wrapper_disease'>
                {
                    data?.length === 0
                        ? <h2>Данных нет</h2>
                        : data?.map((el) => <Item key={el} el={el}/>)
                }
            </div>
        </div>
    )

}

export default App;
