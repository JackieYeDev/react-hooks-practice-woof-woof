import React, { useEffect, useState } from 'react';

function App() {
  const [dogs, setDogs] = useState([]);
  const [goodDogFilter, setGoodDogFilter] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/pups')
      .then((res) => res.json())
      .then((data) => setDogs(data));
  }, []);

  function handleClick(dog) {
    setSelectedDog(dog);
  }
  function handleGoodDogChange(dog) {
    fetch(`http://localhost:3001/pups/${dog.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isGoodDog: !dog.isGoodDog }),
    })
      .then((res) => res.json())
      .then((data) => updateDogList(data));
  }
  function updateDogList(updatedDog) {
    const updatedList = dogs.map((dog) => {
      if (dog.id === updatedDog.id) {
        return updatedDog;
      } else {
        return dog;
      }
    });
    setDogs(updatedList);
  }
  const dogsToRender = dogs.filter((dog) =>
    goodDogFilter ? dog.isGoodDog : true
  );
  return (
    <div className='App'>
      <div id='filter-div'>
        <button
          id='good-dog-filter'
          onClick={() => setGoodDogFilter(!goodDogFilter)}
        >
          Filter good dogs: {goodDogFilter ? 'ON' : 'OFF'}
        </button>
      </div>
      <div id='dog-bar'>
        {dogsToRender.map((dog, index) => (
          <span key={index} onClick={() => handleClick(dog)}>
            {dog.name}
          </span>
        ))}
      </div>
      <div id='dog-summary-container'>
        <h1>DOGGO:</h1>
        <div id='dog-info'>
          {selectedDog ? (
            <div>
              <img src={selectedDog.image}></img>
              <h2>{selectedDog.name}</h2>
              <button onClick={() => handleGoodDogChange(selectedDog)}>
                {selectedDog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
