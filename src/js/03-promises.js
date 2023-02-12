import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onCreatePromises);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;

        if (shouldResolve) {
          resolve({position, delay})
        } else {
          reject({position, delay})
        }
    }, delay)
  })
}

function onCreatePromises(evt) {
  evt.preventDefault();

  let delay = Number(evt.currentTarget.delay.value);
  let step = Number(evt.currentTarget.step.value);
  let amount = Number(evt.currentTarget.amount.value);

  for (let index = 1; index <= amount; index += 1) {
    
    createPromise(index, delay).then(onSuccess).catch(onError);
    form.reset();
    delay += step;
  };
};

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};