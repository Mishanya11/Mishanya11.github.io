// You may wish to find an effective randomizer function on MDN.

function randomInt(min, max) {
  return Math.floor(Math.random() * Math.floor(max) - Math.floor(min));
}

function range(int) {
  const array = [];
  for (let i = 0; i < int; i += 1) {
    array.push(i);
  }
  return array;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const array1 = range(10);
      const array2 = array1.map(() => {
        const num = randomInt(0, 243);
        return fromServer[num];
      });

      const reverseList = array2.sort((a, b) => sortFunction(b, a, 'name'));
      const ul = document.createElement('ul');
      ul.className = 'flex-inner';
      $('form').prepend(ul);

      reverseList.forEach((element, idx) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${element.code} id=${element.code} />`);
        $(li).append(`<label for=${element.code}>${element.name}</label>`);
        $(ul).append(li);
      });
    })
    .catch((err) => console.log(err));
});