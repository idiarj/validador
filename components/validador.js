export class CustomTextEditor extends HTMLElement {
    constructor() {
      super();
  

      this.attachShadow({ mode: 'open' });
  

      this.inputString = this.createInput('text', 'Ingrese un string');
      this.inputInteger = this.createInput('number', 'Ingrese un número entero');
      this.inputDecimal = this.createInput('text', 'Ingrese un número real');
      this.inputEmail = this.createInput('email', 'Ingrese un correo electrónico');
  

      this.shadowRoot.appendChild(this.inputString);
      this.shadowRoot.appendChild(this.inputInteger);
      this.shadowRoot.appendChild(this.inputDecimal);
      this.shadowRoot.appendChild(this.inputEmail);
    }
  
    createInput(type, placeholder) {
      const input = document.createElement('input');
      input.setAttribute('type', type);
      input.setAttribute('placeholder', placeholder);
  
      input.addEventListener('input', this.handleInput.bind(this));
  
      return input;
    }
  
    handleInput(event) {
        const inputValue = event.target.value;
      
        if (event.target === this.inputString) {
          if (!(inputValue.trim() === '')) {
            this.setError('Este string no esta vacio');
          } else {
            this.validated('El string ingresado es un string vacio');
            this.clearError();
            
          }
        } else if (event.target === this.inputInteger) {
          if (!Number.isInteger(Number(inputValue))) {
            this.setError('Ingrese un número entero válido');
          } else {
            this.validated('El numero ingresado es un numero entero');
            this.clearError();
            
          }
        } else if (event.target === this.inputDecimal) {
       
          if (!/^\d+(\.\d+)?$/.test(inputValue)) {
            this.setError('Ingrese un número real válido');
          } else {
            this.validated('El numero ingresado es un numero real');
            this.clearError();
            
          }
        } else if (event.target === this.inputEmail) {

          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
            this.setError('Ingrese una dirección de correo electrónico válida');
          } else {
            this.validated('El string ingresado es un correo electronico');
            this.clearError();
            
          }
        }
      

      }
      
      setError(msj) {
        this.error = document.createElement('p');
        this.error.textContent = msj;
      
        this.shadowRoot.appendChild(this.error);
      }

      validated(msj) {
        this.message = document.createElement('p');
        this.message.textContent = msj;

        this.shadowRoot.appendChild(this.message)

      }
      
      clearError() {
        if (this.error) {
          this.shadowRoot.removeChild(this.error);
          this.error = null;
        }
      }
  
    connectedCallback() {
      // Set initial styles or attributes if needed
    //   this.shadowRoot.innerHTML = `
    //   <style> ${css} </style>
    //   `;
    }
  }