import _ from 'lodash';
import './style.css';
import Logo from './logo.svg';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  var myLogo = new Image();
  myLogo.src = Logo;

  element.appendChild(myLogo);

  return element;
}

document.body.appendChild(component());
