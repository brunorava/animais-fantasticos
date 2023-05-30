import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  // Cria a dic contendo informções co o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  // Preenche cada animal do DOM
  const numerosGrid = document.querySelector(target);

  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }
  // Anima os numeros de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }

  // Puxa as animais atraves de um aqrquivo json e cria cada animal utilizando createAnimal
  async function criarAnimais() {
    try {
      // Fetch e espera a resposta e transforma em json
      const animaisResponse = await fetch(url);
      // Transforma a resposta em Json
      const animaisJSON = await animaisResponse.json();
      // Apos a transformação de json, ativa as funções para preencher e animar os numeros
      animaisJSON.forEach(animal => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }
  return criarAnimais();
}
