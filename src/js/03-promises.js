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

  const delay = Number(evt.currentTarget.delay.value);
  const step = Number(evt.currentTarget.step.value);
  const amount = Number(evt.currentTarget.amount.value);

  const dataParams = {delay, step, amount};

  for (let index = 1; index <= amount; index += 1) {
    
    createPromise(index, dataParams.delay).then(onSuccess).catch(onError);
    form.reset();
    dataParams.delay += dataParams.step;
  };
};

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};