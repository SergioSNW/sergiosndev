import { LitElement, html } from 'lit-element';

export class MyElement extends LitElement {
  render() {
    return html`
      <p>Soy envivo, My Element</p>
    `;
  }
}

customElements.define('my-element', MyElement);