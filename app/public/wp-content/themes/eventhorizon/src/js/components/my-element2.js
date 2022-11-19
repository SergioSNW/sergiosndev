import { LitElement, html } from 'lit-element';

export class MyElement2 extends LitElement {
  render() {
    return html`
      <p>Soy  My Element numero 2</p>
    `;
  }
}

customElements.define('my-element2', MyElement2);