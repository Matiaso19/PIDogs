import Card from '../Card/Card'
import style from './CardsContainer.module.css'
const CardsContainer = () => {
    const arrayPeros = [
        {
            "id": 1,
            "image": 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
            "name": "Affenpinscher",
            "heigth": "23 - 29",
            "weight": "3 - 6",
            "life_span": "10 - 12 years",
            "created": false
        },
        {
            "id": 2,
            "image": "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
            "name": "Afghan Hound",
            "heigth": "64 - 69",
            "weight": "23 - 27",
            "life_span": "10 - 13 years",
            "created": false
        },
        {
            "id": 3,
            "image": "https://cdn2.thedogapi.com/images/rkiByec47.jpg",
            "name": "African Hunting Dog",
            "heigth": "76",
            "weight": "20 - 30",
            "life_span": "11 years",
            "created": false
        },
        {
            "id": 4,
            "image": "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg",
            "name": "Airedale Terrier",
            "heigth": "53 - 58",
            "weight": "18 - 29",
            "life_span": "10 - 13 years",
            "created": false
        },
        {
            "id": 5,
            "image": "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg",
            "name": "Akbash Dog",
            "heigth": "71 - 86",
            "weight": "41 - 54",
            "life_span": "10 - 12 years",
            "created": false
        },
        {
            "id": 6,
            "image": "https://cdn2.thedogapi.com/images/BFRYBufpm.jpg",
            "name": "Akita",
            "heigth": "61 - 71",
            "weight": "29 - 52",
            "life_span": "10 - 14 years",
            "created": false
        },
        {
            "id": 7,
            "image": "https://cdn2.thedogapi.com/images/33mJ-V3RX.jpg",
            "name": "Alapaha Blue Blood Bulldog",
            "heigth": "46 - 61",
            "weight": "25 - 41",
            "life_span": "12 - 13 years",
            "created": false
        },
        {
            "id": 8,
            "image": "https://cdn2.thedogapi.com/images/-HgpNnGXl.jpg",
            "name": "Alaskan Husky",
            "heigth": "58 - 66",
            "weight": "17 - 23",
            "life_span": "10 - 13 years",
            "created": false
        },
        {
            "id": 9,
            "image": "https://cdn2.thedogapi.com/images/dW5UucTIW.jpg",
            "name": "Alaskan Malamute",
            "heigth": "58 - 64",
            "weight": "29 - 45",
            "life_span": "12 - 15 years",
            "created": false
        },
        {
            "id": 10,
            "image": "https://cdn2.thedogapi.com/images/pk1AAdloG.jpg",
            "name": "American Bulldog",
            "heigth": "56 - 69",
            "weight": "27 - 54",
            "life_span": "10 - 12 years",
            "created": false
        },
        {
            "id": 11,
            "image": "https://cdn2.thedogapi.com/images/sqQJDtbpY.jpg",
            "name": "American Bully",
            "heigth": "36 - 43",
            "weight": "14 - 68",
            "life_span": "8 – 15 years",
            "created": false
        }];
    return(
        <div className={style.container}>
            {arrayPeros.map(dog => {
                return <Card
                key = {dog.id}
                image = {dog.image}
                id= {dog.id}
                name = {dog.name}
		        heigth = {dog.heigth}
		        weight = {dog.weight}
		        life_span = {dog.life_span}               

                />
            })}
        </div>
    )
}

export default CardsContainer;
