import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import Twitter from './+page.svelte'; /**Importamos dónde tiene que buscar Twitter en la linea 9*/

describe('twitter', () => {
  it('should start with empty string', () => {
    render(Twitter)

    const text = screen.getByTestId('texto') as HTMLInputElement
    expect(text.value).to.equal('')/**No todos los elementos tienen el value, por eso lo casteamos */

    const caracteres = screen.getByTestId('restantes')
    expect(+caracteres.innerHTML).to.equal(140)/**Podemos dejarle el + (string a num) a caracteres o poner '140' */
    expect(caracteres.classList.contains('ok')).toBeTruthy()/**Dentro de la lista de clases debería estar el 'ok' */
    /**Truthy apunta a cualquier valor que no sea 1 o aaaalgo así*/
  })

  it('should decrease remaining characters if a tweet is written - positive remaining characters', async () => {
    render(Twitter)

    const text = screen.getByTestId('texto') as HTMLInputElement
    await userEvent.type(text, 'A new tweet')/**await es para que espere el test a que se ingrese el texto */
    /**Ver que al inicio de este test ponemos async por el uso del await. */

    const caracteres = screen.getByTestId('restantes')
    expect(+caracteres.innerHTML).to.equal(129)

    expect(caracteres.classList.contains('ok')).toBeTruthy()
  })

  it('should decrease remaining characters if a tweet is written - negative remaining characters', async () => {
    render(Twitter)

    const text = screen.getByTestId('texto') as HTMLInputElement
    await userEvent.type(text, '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890')

    const caracteres = screen.getByTestId('restantes')
    expect(+caracteres.innerHTML).to.equal(-10)

    expect(caracteres.classList.contains('ok')).toBeFalsy()
  })

  it('should have a specific class for tweet reaching the limit', async () => {
    render(Twitter)

    const text = screen.getByTestId('texto') as HTMLInputElement
    await userEvent.type(text, '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789')

    const caracteres = screen.getByTestId('restantes')
    expect(caracteres.classList.contains('pasado')).toBeTruthy()
    /**Si bien testeamos con las clases, ok, pasado, no son realmente necesarias
     * 
     */
  })

  it('should have a specific class for tweet getting close to the limit', async () => {
    render(Twitter)

    const text = screen.getByTestId('texto') as HTMLInputElement
    await userEvent.type(text, '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012')

    const caracteres = screen.getByTestId('restantes')
    expect(caracteres.classList.contains('limite')).toBeTruthy()
  })

})
